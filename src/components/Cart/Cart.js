import { useContext } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/CartContext";

const Cart = (props) => {
  // Acceder al contexto del carrito
  const cartCtx = useContext(CartContext);

  // Calcular el monto total del carrito formateado como una cadena
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  // Verificar si hay elementos en el carrito
  const hasItems = cartCtx.items.length > 0;

  // Función para manejar la eliminación de un elemento del carrito
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // Función para manejar la adición de un elemento al carrito
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  // Renderizado de la lista de elementos del carrito
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  // Renderizado del contenido del carrito en un modal
  return (
    <Modal onClick={props.onClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total:</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        {/* Botón para cerrar el carrito */}
        <button className={classes["button--alt"]} onClick={props.onClick}>
          Cerrar
        </button>
        {/* Botón para realizar una orden si hay elementos en el carrito */}
        {hasItems && (
          <button className={classes.button} onClick={props.onClick}>
            Ordenar
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
