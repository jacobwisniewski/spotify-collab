import React from "react"
import styles from "./DropdownInput.module.css"
import { FocusEventHandler, FunctionComponent, KeyboardEventHandler, MouseEventHandler, useCallback, useState } from "react"

export interface DropdownOption {
  id: number
  title: string
  value: any
}

interface OptionSelectEvent {
  selected: DropdownOption
}

export interface OptionSelectHandler {
  (event: OptionSelectEvent): void
}

export interface DropdownInputProps {
  className?: string
  optionSelected: any
  options: DropdownOption[]
  onOptionSelect: OptionSelectHandler
}

const DropdownInput: FunctionComponent<DropdownInputProps> = ({ className, optionSelected, options, onOptionSelect }) => {
  const optionSelectedId = options.map(({ value }) => value).indexOf(optionSelected)
  const [showOptions, setShowOptions] = useState(false)
  const [highlightedOptionId, setHighlightedOptionId] = useState(optionSelectedId)

  const handleContainerFocus = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    setShowOptions(true)
  }, [setShowOptions])

  const handleContainerBlur = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    if (highlightedOptionId !== optionSelectedId) {
      onOptionSelect({ selected: options[highlightedOptionId] })
    }
    setShowOptions(false)
  }, [setShowOptions, highlightedOptionId, onOptionSelect, options, optionSelectedId])

  const handleMouseEnterOnOption = useCallback<MouseEventHandler<HTMLLIElement>>(
    (event) => {
      const selectedOptionId = event.currentTarget.getAttribute("data-option-id")
      selectedOptionId && setHighlightedOptionId(parseInt(selectedOptionId))
    },
    [setHighlightedOptionId]
  )

  const handleKeyPress = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      event.preventDefault()
      if (["ArrowDown", "Down"].includes(event.key)) {
        if (highlightedOptionId === -1) {
          setHighlightedOptionId(0)
        } else if (highlightedOptionId >= 0 && highlightedOptionId < options.length - 1) {
          setHighlightedOptionId(highlightedOptionId + 1)
        }
      }

      if (["ArrowUp", "Up"].includes(event.key) && highlightedOptionId > 0) {
        setHighlightedOptionId(highlightedOptionId - 1)
      }

      if (["Enter", "Spacebar", " "].includes(event.key) && highlightedOptionId >= 0) {
        event.currentTarget.blur()
      }

      if (["Escape", "Esc"].includes(event.key)) {
        event.currentTarget.blur()
      }
    },
    [highlightedOptionId, setHighlightedOptionId, options]
  )

  return (
    <div className={[styles.DropdownInputContainer, className].join(" ")}>
      <div className={[styles.InputContainer].concat(showOptions ? [styles.Focus] : []).join(" ")}>
        <input
          className={styles.Input}
          onFocus={handleContainerFocus}
          onBlur={handleContainerBlur}
          onKeyDown={handleKeyPress}
          value={options[highlightedOptionId].title}
          readOnly
        />
      </div>
      {showOptions && (
        <ul className={styles.OptionsContainer}>
          {options.map((option) => (
            <li
              className={[styles.OptionContainer].concat(highlightedOptionId === option.id ? [styles.Highlighted] : []).join(" ")}
              key={option.id}
              data-option-id={option.id}
              onMouseEnter={handleMouseEnterOnOption}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropdownInput
