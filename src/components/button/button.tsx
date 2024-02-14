import React from "react";
import styles from "./button.module.scss";
import classNames from 'classnames';
import {ButtonVariant} from "../../interfaces/button";
interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}
const Button: React.FC<IButton> = ({ variant = ButtonVariant.contained, children,className, ...props }) => {
  const buttonClass = classNames(styles.button, {
    [styles.contained]: variant === ButtonVariant.contained,
    [styles.outlined]: variant === ButtonVariant.outlined,
    [styles.round]: variant === ButtonVariant.round,
  },
    className);

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
