// @ts-ignore
import { Editor, Transforms, Path, Range, Element } from "slate";
import { ReactEditor } from "slate-react";

export const createParagraphNode = (children = [{ text: "" }]) => ({
    type: "paragraph",
    children
  });
  

export const createLinkNode = (href, text) => ({
  type: "link",
  href,
  children: [{ text }]
});

 const insertLink = (editor, url) => {
  if (!url) return;

  const { selection } = editor;
  const link = createLinkNode(url, "New Link");

  ReactEditor.focus(editor);

  if (!!selection) {
    const [parentNode, parentPath] = Editor.parent(
      editor,
      selection.focus?.path
    );

// @ts-ignore

    if (parentNode.type === "link") {
      removeLink(editor);
    }

    if (editor.isVoid(parentNode)) {
// @ts-ignore

      Transforms.insertNodes(editor, createParagraphNode([link]), {
        at: Path.next(parentPath),
        select: true
      });
    } else if (Range.isCollapsed(selection)) {
// @ts-ignore

      Transforms.insertNodes(editor, link, { select: true });
    } else {
// @ts-ignore

      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: "end" });
    }
  } else {
// @ts-ignore

    Transforms.insertNodes(editor, createParagraphNode([link]));
  }
};

 const removeLink = (editor, opts = {}) => {
  Transforms.unwrapNodes(editor, {
    ...opts,
// @ts-ignore
    match: (n) =>!Editor.isEditor(n) && Element.isElement(n) && n.type === "link"
  });
};

export {removeLink , insertLink}
