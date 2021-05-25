import clsx from "clsx";
import { useFocused, useSelected } from "slate-react";

const ImageElement = ({ attributes, element,children }) => {
  
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes} >
      <div contentEditable={false} >
        <img
          src={element.url}
          className={clsx("element-image", { highlight: selected && focused })}
        />
      </div>
      {children}
    </div>
  );
};

export default ImageElement;


// const isImageUrl = url => {
//   if (!url) return false
//   if (!isUrl(url)) return false
//   const ext = new URL(url).pathname.split('.').pop()
//   return imageExtensions.includes(ext)
// }

// const insertImage = (editor, url) => {
//   // const text = { text: '' }
//   // const image  = { type: 'image', url, children: [text] } 
//   Transforms.insertNodes(editor,{
//     type: 'paragraph',
//     children: [
//       { text: 'This is editable ' },
//       { text: ' better than a ' },
//       { text: '!' },
//     ],
//   }, )
// }
// const withImages = editor => {
//   const { insertData, isVoid } = editor

//   editor.isVoid = element => {
//     return element.type === 'image' ? true : isVoid(element)
//   }

//   editor.insertData = data => {
//     const text = data.getData('text/plain')
//     const { files } = data

//     if (files && files.length > 0) {
//       for (const file of files) {
//         const reader = new FileReader()
//         const [mime] = file.type.split('/')

//         if (mime === 'image') {
//           reader.addEventListener('load', () => {
//             const url = reader.result
//             insertImage(editor, url)
//           })

//           reader.readAsDataURL(file)
//         }
//       }
//     } else if (isImageUrl(text)) {
//       insertImage(editor, text)
//     } else {
//       insertData(data)
//     }
//   }

//   return editor
// }
// const InsertImageButton = () => {
//   const editor = useSlateStatic()
//   return (
//     <IconButton
//     active="true"
//       onMouseDown={event => {
//         event.preventDefault()
//         const url = window.prompt('Enter the URL of the image:')
//         if (url && !isImageUrl(url)) {
//           alert('URL is not an image')
//           return
//         }
//         insertImage(editor, url)
//       }}
//     >
//       <Camera2/>
//     </IconButton>
//   )
// }