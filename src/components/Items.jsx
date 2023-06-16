import styles from "../styles/Item.module.css";
import ItemCard from "./ItemCard";
import data from "../data/itemData";

function Items() {
  console.log(data);
  return (
    <div className={styles.wrapper}>
      {data.map((element, index)=>{
          return<ItemCard name={element.name} price={element.price} id={element.id} key={index}/>
      })}
    </div>
  );
}

export default Items;
