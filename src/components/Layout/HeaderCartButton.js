import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/CartContext";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  // Estado para controlar si el botón está destacado (animación)
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  // Acceder al contexto del carrito
  const cartCtx = useContext(CartContext);

  // Extraer la lista de ítems del carrito desde el contexto
  const { items } = cartCtx;

  // Calcular el número total de ítems en el carrito
  const numberOfItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  // Clases CSS condicionales para el botón (animación de resaltado)
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  // Efecto para gestionar el resaltado del botón cuando se agregan ítems al carrito
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    // Limpiar el temporizador cuando el componente se desmonta o cuando items cambia
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  // Renderizado del botón del carrito
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Carrito</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
