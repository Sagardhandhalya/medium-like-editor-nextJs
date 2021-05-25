import {BaseEditor,createEditor,Descendant,Element as SlateElement,} from "slate";
import React, { Children, useCallback, useMemo, useRef, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, ReactEditor, Slate } from "slate-react";
import { withHistory } from "slate-history";
import ToolBar from "./components/ToolBar";
import styles from "./style.module.css";
import { toggleMark } from "./utils/toolbar";
import { Leaf, Element } from "./utils/mainEditable";
import withImages from "./plugins/withImage";
import withEmbeds from './plugins/withEmbed';
import withLinks from "./plugins/withLinks";
import { showImage, UploadFileClick } from "./utils/image";
import { Image } from "react-bootstrap-icons";

type CustomElement = { type: "paragraph"; children: CustomText[] };
export type EmptyText = {
  text: string;
};
export type ImageElement = {
  type: "image";
  url: string;
  children: EmptyText[];
};
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      { text: "" },
    ],
  },
];

const RichTextExample = () => {

  const [value, setValue] = useState<Descendant[]>(JSON.parse('[{"type":"paragraph","children":[{"text":""}]},{"type":"image","url":"https://www.chicagotribune.com/resizer/nnQ3bY7X6794G-zAJXp13d4r4nI=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/7UZXJVP42VG5VISQNDAUKHJDJQ.jpg","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"image","url":null,"children":[{"text":""}]},{"type":"video","url":"UTHgr6NLeEw","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]}]'));
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string>('')
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")

  const coverPhoto = useRef(null)
  
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withLinks(withEmbeds(withImages(withHistory(withReact(createEditor()))))), []);
    console.log(JSON.stringify(value));
 
    const handleImageUpload = async (e)=>{
      let url = await showImage(e) as string;
      setCoverPhotoUrl(url)
    }
  

  return (
    <>
      <button className={styles.addCoverPhotoButton} type="submit" onClick={()=>UploadFileClick(coverPhoto)}><Image height="1.1rem"/> Add Cover Photo</button>
     { coverPhotoUrl && <img src={coverPhotoUrl} alt="cover" /> } 
      <textarea
        maxLength={150}
        className={styles.titleInput}
        placeholder="Title..."
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <textarea
        maxLength={150}
        className={styles.subTitleInput}
        placeholder="Enter SubTitle(optinal)"
        value={subtitle}
        onChange={(e)=>setSubtitle(e.target.value)}
      />
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <ToolBar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Tell Your Story..."
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
      <input type="file" name="cover photo" onChange={handleImageUpload} ref={coverPhoto} />
    </>
  );
};

export default RichTextExample;
