import React, { ReactElement, useMemo, useRef, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createInlineToolbarPlugin, {
  Separator,
} from "@draft-js-plugins/inline-toolbar";

import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
import createImagePlugin from "@draft-js-plugins/image";
import createVideoPlugin from "@draft-js-plugins/video";
import createLinkPlugin from "@draft-js-plugins/anchor";

import editorStyles from "./editorStyles.module.css";

import buttonStyles from "./buttonStyles.module.css";
import toolbarStyles from "./toolbarStyles.module.css";

import blockTypeSelectStyles from "./sidebar/blockTypeSelectStyles.module.css";
import sidebarButtonStyles from "./sidebar/buttonStyles.module.css";
import sidebarToolbarStyles from "./sidebar/toolbarStyles.module.css";

import linkStyles from "./link/linkStyles.module.css";

import "./../../node_modules/@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "./../../node_modules/@draft-js-plugins/side-toolbar/lib/plugin.css";
import "./../../node_modules/@draft-js-plugins/image/lib/plugin.css";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";
import { Camera, Play } from "react-bootstrap-icons";

const inlineToolbarPlugin = createInlineToolbarPlugin({
  theme: {
    buttonStyles,
    toolbarStyles,
  },
});
const sideToolbarPlugin = createSideToolbarPlugin({
  theme: {
    buttonStyles: sidebarButtonStyles,
    toolbarStyles: sidebarToolbarStyles,
    blockTypeSelectStyles: blockTypeSelectStyles,
  },
  popperOptions: {
    placement: "left",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['left', 'right','top'],
        },
      },
    ],
  },
});
const linkPlugin = createLinkPlugin({
  theme: linkStyles,
  placeholder: "http://…",
} as any);
const imagePlugin = createImagePlugin();
const videoPlugin = createVideoPlugin();
console.log('component run...');

const CustomEditor = (): ReactElement => {
  const [plugins, InlineToolbar, SideToolbar, addImage, addVideo] =
    useMemo(() => {
      return [
        [
          inlineToolbarPlugin,
          linkPlugin,
          sideToolbarPlugin,
          imagePlugin,
          videoPlugin,
        ],
        inlineToolbarPlugin.InlineToolbar,
        sideToolbarPlugin.SideToolbar,
        imagePlugin.addImage,
        videoPlugin.addVideo,
      ];
    }, []);

  const hiddenInput = useRef(null);

  const emptyContentState = convertFromRaw({
    entityMap: {},
    blocks: [
      {
        text: "Tell Your Story...",
        key: "foo",
        type: "unstyled",
        entityRanges: [],
      },
    ],
  });

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(emptyContentState)
  );

  const editor = useRef<Editor | null>(null);

  const onChange = (value: EditorState): void => {
    const contentState = editorState.getCurrentContent();
    console.log("content state", convertToRaw(contentState));
    setEditorState(value);
  };

  const insertImage = (base64) => {
    console.log(editorState);
    const newState = onChange(addImage(editorState, base64, {}));
    console.log(newState);
  };

  const InsertVideo = () => {
    console.log(editorState);
    onChange(
      addVideo(editorState, {
        src: "https://youtu.be/1gukvtH_a3I",
      })
    );
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const showImage = (e) => {
    console.log("show image....");
    getBase64(e.target.files[0]).then((data) => insertImage(data));
  };

  const UploadFileClick = () => {
    hiddenInput.current.click();
  };

  return (
    <div className={editorStyles.editor}>
      <textarea className={editorStyles.titleInput} placeholder="Title" />
      <Editor
        editorKey="SimpleInlineToolbarEditor"
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        ref={(element) => {
          editor.current = element;
        }}
      />
      <InlineToolbar>
        {
          (externalProps) => (
            <>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
              <CodeBlockButton {...externalProps} />
              <linkPlugin.LinkButton {...externalProps} />
            </>
          )
        }
      </InlineToolbar>
      <SideToolbar>
        {(externalProps) => (
          <>
          
            <span className={editorStyles.buttonContainer}>
              <Play
                width="20"
                height="20"
                color="#000000ad"
                onClick={() => InsertVideo()}
              />
            </span>

            <span className={editorStyles.buttonContainer}>
              <Camera
                width="20"
                height="20"
                color="#000000ad"
                onClick={() => UploadFileClick()}
              />
            </span>
            {/* <Separator  {...externalProps}/> */}
          </>
        )}
      </SideToolbar>
      <input
        type="file"
        ref={hiddenInput}
        onChange={showImage}
        hidden
      />
    </div>
  );
};

export default CustomEditor;
