import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/CartContext";


const MealItem = (props) => {
  // Acceder al contexto del carrito
  const cartCtx = useContext(CartContext);

  // Formatear el precio de la comida
  const price = `$${props.price.toFixed(2)}`;

  // Función para manejar la adición de elementos al carrito
  const addToCartHandler = (enteredAmountNumber) => {
    // Agregar el ítem al carrito utilizando el contexto
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: enteredAmountNumber,
      price: props.price
    });
  };

  // Renderizar la información de la comida y el formulario
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        {/* Renderizar el formulario de cantidad y botón de agregar al carrito */}
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
