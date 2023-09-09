import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Deliciosa comida en tu casa</h2>
      <p>
        Escoge tu platillo preferido de nuestra amplia selección de comidas y disfruta de un delicioso almuerzo en tu casa.
      </p>
      <p>
        Todos nuestros platillos son preparados al momento con ingredientes de alta calidad y hecho por los mejores chefs
      </p>
    </section>
  );
};

export default MealsSummary;
