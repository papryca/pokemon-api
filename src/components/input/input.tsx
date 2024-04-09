import styles from "./input.module.scss";
import {IInput} from "../../interfaces/input";
import React from "react";

const Input:React.FC<IInput> = ({value, setValue}) => {
  const history: string[] = JSON.parse(localStorage.getItem('history') || '[]');
  return (
    <div className={styles.container}>
      <input
        type='text'
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        list='history'
      className={styles.input}/>
      <datalist id='history'>
        {history.map((value:string,index:number)=><option value={value} key={index}></option> )
        }
      </datalist>

    </div>
  )
}
export default Input;
