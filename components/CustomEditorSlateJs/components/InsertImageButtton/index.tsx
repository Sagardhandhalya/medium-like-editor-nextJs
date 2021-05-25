import React from "react"
import { Camera } from "react-bootstrap-icons"
import { useSlateStatic } from "slate-react"
import { insertImage, isImageUrl } from "../../utils/image"
import IconButton from "../IconButton"

const InsertImageButton = () => {
    const editor = useSlateStatic()
    return (
      <IconButton
      active="true"
        onMouseDown={event => {
          event.preventDefault()
          const url = window.prompt('Enter the URL of the image:')
          if (url && !isImageUrl(url)) {
            alert('URL is not an image')
            return
          }
          insertImage(editor, url)
        }}
      >
        <Camera/>
      </IconButton>
    )
  }

  export default InsertImageButton;