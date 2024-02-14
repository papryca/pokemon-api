import React from "react";
import styles from "./item-per-page.module.scss";
interface ItemPerPageProps {
  onChange: (value: string) => void;
}
const ItemPerPage:React.FC<ItemPerPageProps>  = ({onChange}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    onChange(value);
  }
  return (
      <div className={styles.item}>
        <label className={styles.quantity} htmlFor="quantity">Items:</label>
        <select onChange={handleOnChange} className={styles.select}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
  )
}
export default ItemPerPage;
