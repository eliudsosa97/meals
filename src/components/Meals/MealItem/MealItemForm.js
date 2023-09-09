import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  // Estado para gestionar la validez de la cantidad ingresada
  const [amountIsValid, setAmountIsValid] = useState(true);

  // Referencia al input de cantidad
  const amountInputRef = useRef();

  // Función para manejar el envío del formulario
  const submitHandler = (event) => {
    event.preventDefault();

    // Obtener la cantidad ingresada por el usuario
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    // Validar la cantidad ingresada
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      // Establecer la cantidad como no válida y salir de la función
      setAmountIsValid(false);
      return;
    }

    // Llamar a la función prop onAddToCart con la cantidad válida
    props.onAddToCart(enteredAmountNumber);
  };

  // Renderizar el formulario de cantidad y botón de añadir al carrito
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Cantidad"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1"
        }}
      />
      <button>Añadir</button>
      {!amountIsValid && <p>Please Enter a valid amount</p>}
    </form>
  );
};

export default MealItemForm;
