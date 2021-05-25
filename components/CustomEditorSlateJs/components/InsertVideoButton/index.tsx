import React from "react"
import { CameraVideo } from "react-bootstrap-icons"
import { useSlateStatic } from "slate-react"
import { insertVideo } from "../../utils/video"
import IconButton from "../IconButton"

const InsertVideoButton = () => {
    const editor = useSlateStatic()
    return (
      <IconButton
      active="true"
        onMouseDown={event => {
          event.preventDefault()
          const url = window.prompt('Enter Video Id From Youtube:')
          insertVideo(editor, url)
        }}
      >
        <CameraVideo/>
      </IconButton>
    )
  }

  export default InsertVideoButton;