import React from "react";
import { Upload } from "react-bootstrap-icons";
import { useSlateStatic } from "slate-react";
import { insertImage, showImage, UploadFileClick } from "../../utils/image";
import IconButton from "../IconButton";

const UploadImageButton = ({ hiddenInput }) => {
  const editor = useSlateStatic();
  return (
    <IconButton active="true" onMouseDown={() => UploadFileClick(hiddenInput)}>
      <Upload />
    </IconButton>
  );
};

export default UploadImageButton;
