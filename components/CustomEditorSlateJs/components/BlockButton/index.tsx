import React from "react"
import { useSlate } from "slate-react"
import { isBlockActive, toggleBlock } from "../../utils/toolbar"
import IconButton from "../IconButton"

const BlockButton = ({ format,children }) => {
    const editor = useSlate()
    return (
      <IconButton
        active={isBlockActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault()
          toggleBlock(editor, format)
        }}
      >
        {children}
      </IconButton>
    )
  }

  export default BlockButton