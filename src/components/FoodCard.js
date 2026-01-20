import styles from './FoodCard.module.css';
import OrderButton from './OrderButton';
const FoodCard = ({ food }) => {
    return (
        <article className={styles.card}>
            <img className={styles.foodImage} src={food.image} alt={food.name} />
            <div className={styles.cardContent}>
                <h3 className={styles.foodHeader}>
                    <span className={styles.foodName}>
                        {food.name}
                    </span>
                    <span className={styles.foodPrice}>
                        {food.price} $
                    </span>
                </h3>
                <p className={styles.foodDescription}>{food.description}</p>
                <OrderButton>Order a delivery</OrderButton>
            </div>
        </article>
    )
}

export default FoodCard;