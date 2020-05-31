import React, { FunctionComponent, MouseEventHandler, useCallback } from "react"
import styles from "./Button.module.css"

export type ButtonClickHandler = () => void

interface ButtonProps {
  title: string
  onClick?: ButtonClickHandler
  disabled?: boolean
}

const Button: FunctionComponent<ButtonProps> = ({ title, onClick, disabled }) => {
  const onButtonClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.preventDefault()
      !disabled && onClick!()
    },
    [onClick]
  )

  return (
    <button className={styles.Button} onClick={onClick ? onButtonClick : () => {}} disabled={disabled ? disabled : false}>
      {title}
    </button>
  )
}

export default Button
