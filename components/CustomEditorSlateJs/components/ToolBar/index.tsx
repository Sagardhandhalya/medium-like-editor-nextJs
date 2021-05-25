import React, { useRef } from "react";
import {
  BlockquoteLeft,
  CameraVideo,
  Code,
  Linkedin,
  ListOl,
  ListUl,
  TypeBold,
  TypeH1,
  TypeH2,
  TypeItalic,
  TypeUnderline,
  Upload,
} from "react-bootstrap-icons";
import { useSlateStatic } from "slate-react";
import { insertImage, showImage } from "../../utils/image";
import BlockButton from "../BlockButton";
import InsertImageButton from "../InsertImageButtton";
import InsertVideoButton from "../InsertVideoButton";
import MarkButton from "../MarkButton";
import UploadImageButton from "../UploadImageButton";
import styles from "./style.module.css";
const ToolBar = () => {
  const handleImageUpload = async (e)=>{
    let url = await showImage(e);
    insertImage(editor , url )
  }
  const editor = useSlateStatic();
  const hiddenInput = useRef(null);
  return (
    <div className={styles.ToolBarContainer}>
      <div className={styles.leftGroup}>Write</div>
      <div className={styles.rightGroup}>
        <MarkButton format="bold">
          <TypeBold />{" "}
        </MarkButton>
        <MarkButton format="italic">
          <TypeItalic />
        </MarkButton>
        <MarkButton format="underline">
          <TypeUnderline />
        </MarkButton>
        <MarkButton format="code">
          <Code />
        </MarkButton>
        <BlockButton format="heading-one">
          <TypeH1 />
        </BlockButton>
        <BlockButton format="heading-two">
          <TypeH2 />
        </BlockButton>
        <BlockButton format="block-quote">
          <BlockquoteLeft />
        </BlockButton>
        <BlockButton format="numbered-list">
          <ListOl />
        </BlockButton>
        <BlockButton format="bulleted-list">
          <ListUl />
        </BlockButton>
        <InsertImageButton />
        <InsertVideoButton />
        <UploadImageButton hiddenInput={hiddenInput} />
      </div>
      <input type="file" ref={hiddenInput} onChange={handleImageUpload} hidden />
    </div>
  );
};

export default ToolBar;
