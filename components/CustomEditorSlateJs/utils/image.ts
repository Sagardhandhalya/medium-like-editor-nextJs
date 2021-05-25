import { Transforms } from 'slate'
import isUrl from 'is-url';
import imageExtensions from 'image-extensions'

const isImageUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}

const createImageNode = (url) => {
  const text = { text: '' }
  return [
    {
      type: 'image',
      url,
      children: [text]
    },
    {
      type: 'paragraph',
      children: [text],
    }
  ];
}

const insertImage = (editor, url) => {

  const image = createImageNode(url)
  // @ts-ignore
  Transforms.insertNodes(editor, image)
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const showImage = async (e) => {
  let data = await getBase64(e.target.files[0])
  return data;
};

const UploadFileClick = (hiddenInput) => {
  hiddenInput.current.click();
};


export { isImageUrl, createImageNode, insertImage, UploadFileClick, showImage }