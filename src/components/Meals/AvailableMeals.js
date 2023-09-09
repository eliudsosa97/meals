import { useEffect, useState, useCallback } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  // Estado para almacenar la lista de comidas disponibles
  const [meals, setMeals] = useState([]);

  // Estado para indicar si la página se encuentra en estado de carga
  const [isLoading, setIsLoading] = useState(true);

  // Estado para almacenar mensajes de error HTTP
  const [httpError, setHttpError] = useState();

  // Función para cargar datos de comidas desde una URL
  const fetchMeals = useCallback(async (err = false) => {
    setIsLoading(true);
    const url = err
      ? "https://react-meals-eabab-default-rtdb.firebaseio.com"
      : "https://react-meals-eabab-default-rtdb.firebaseio.com/.json";
    const fetchObj = err ? { mode: "no-cors" } : {};

    // Realizar una solicitud HTTP utilizando fetch
    const response = await fetch(url, fetchObj);

    // Manejar errores de solicitud
    if (!response.ok) {
      throw new Error(`Algo salió mal, vuelve a intentar`);
    }

    // Procesar los datos JSON de la respuesta
    const responseData = await response.json();

    // Crear una lista de comidas cargadas
    const loadedMeals = [];

    for (const key in responseData) {
      loadedMeals.push({ id: key, ...responseData[key] });
    }

    // Actualizar el estado con las comidas cargadas y finalizar la carga
    setMeals(loadedMeals);
    setIsLoading(false);
    setHttpError(false);
  }, []);

  // Efecto para cargar datos de comidas cuando el componente se ejecuta o cuando fetchMeals cambia
  useEffect(() => {
    fetchMeals().catch((error) => {
      setIsLoading(false);
      console.error(error, error.message);
      setHttpError(error.message);
    });
  }, [fetchMeals]);

  // Función para manejar el clic en el botón "Try again"
  const clickHandler = useCallback(() => {
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [fetchMeals]);

  // Renderizado condicional según el estado
  if (isLoading) {
    return (
      <section className={classes.mealsIsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
        <button onClick={clickHandler}>Try again</button>
      </section>
    );
  }

  // Crear una lista de comidas utilizando el estado meals y el componente MealItem
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  // Renderizar la lista de comidas dentro de un componente Card
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
