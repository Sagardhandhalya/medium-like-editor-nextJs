import React from "react"
import { useSlate } from "slate-react"
import { isMarkActive, toggleMark } from "../../utils/toolbar"
import IconButton from "../IconButton"

const MarkButton = ({children, format }) => {
    const editor = useSlate()
    return (
      <IconButton
        active={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault()
          toggleMark(editor, format)
        }}
      >
        {children}
      </IconButton>
    )
  }

  export default MarkButton;