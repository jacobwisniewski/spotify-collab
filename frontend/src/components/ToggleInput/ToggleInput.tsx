import React, { FunctionComponent, MouseEventHandler, useCallback } from "react"
import styles from "./ToggleInput.module.css"

interface ToggleSelectEvent {
  selected: string
}

export interface ToggleSelectHandler {
  (event: ToggleSelectEvent): void
}

interface ToggleInputProps {
  selected: string
  left: string
  right: string
  onSelect: ToggleSelectHandler
}

const ToggleInput: FunctionComponent<ToggleInputProps> = ({ selected, left, right, onSelect }) => {
  const leftSelected = left === selected

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const selected = (event.target as HTMLButtonElement).value
      onSelect({ selected: selected })
    },
    [left, right, onSelect]
  )

  return (
    <div className={styles.ToggleInputContainer}>
      <button className={[styles.Button].concat(leftSelected ? [styles.Selected] : []).join(" ")} onClick={handleClick} value={left}>
        {left}
      </button>
      <button className={[styles.Button].concat(!leftSelected ? [styles.Selected] : []).join(" ")} onClick={handleClick} value={right}>
        {right}
      </button>
    </div>
  )
}

export default ToggleInput
