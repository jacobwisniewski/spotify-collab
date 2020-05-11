import React, { FunctionComponent, MouseEventHandler, useCallback } from "react"
import styles from "./Button.module.css"

export interface ButtonClickHandler {
  (): void
}

interface ButtonProps {
  title: string
  onClick: ButtonClickHandler
}

const Button: FunctionComponent<ButtonProps> = ({ title, onClick }) => {
  const onButtonClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.preventDefault()
      onClick()
    },
    [onClick]
  )

  return (
    <button className={styles.Button} onClick={onButtonClick}>
      {title}
    </button>
  )
}

export default Button
