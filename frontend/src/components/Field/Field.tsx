import React, { FunctionComponent, ReactElement } from "react"
import styles from "./Field.module.css"
import Message from "../Message/Message"

interface FieldProps {
  input: ReactElement
  message?: ReactElement
}

const Field: FunctionComponent<FieldProps> = ({ input, message }) => {
  return (
    <div className={styles.FieldContainer}>
      <div className={styles.InputContainer}>{input}</div>
      <div className={styles.MessageContainer}>{message || <Message />}</div>
    </div>
  )
}

export default Field
