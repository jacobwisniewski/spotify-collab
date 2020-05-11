import React, { FunctionComponent, ReactElement, ReactNode } from "react"
import styles from "./Message.module.css"

export enum MessageType {
  NORMAL = "Type_Normal",
  ERROR = "Error",
  WHITE = "WHITE"
}

export enum MessageSize {
  NORMAL = "Size_Normal",
  LARGE = "Large"
}

interface MessageProps {
  size?: MessageSize
  type?: MessageType
  children?: ReactNode
}

const Message: FunctionComponent<MessageProps> = ({ size = MessageSize.NORMAL, type = MessageSize.NORMAL, children }) => {
  const classNames = [styles.Message, styles[type], styles[size], "Message"].join(" ")

  return (
    <div className={classNames}>
      <div className={styles.Content}>{children || <>&nbsp;</>}</div>
    </div>
  )
}

export default Message
