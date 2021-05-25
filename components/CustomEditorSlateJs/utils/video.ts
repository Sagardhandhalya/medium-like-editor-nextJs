import { Transforms} from 'slate'
import isUrl from 'is-url';
import imageExtensions from 'image-extensions'


const createVideoNode = (url) =>{
    const text = { text: '' }
 return [
    { 
      type: 'video', 
      url, 
      children: [text] 
    }, 
    {
      type: 'paragraph',
      children: [text],
    }
  ];
}

const insertVideo = (editor, url) => {

    const video = createVideoNode(url)
    // @ts-ignore
    Transforms.insertNodes(editor, video)
}


export {  createVideoNode, insertVideo }