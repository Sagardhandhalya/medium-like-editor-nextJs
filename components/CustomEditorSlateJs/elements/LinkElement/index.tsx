import { useSelected, useFocused, useSlateStatic } from "slate-react";
import { removeLink } from "../../utils/link";

import "./styles.css";
import { Link45deg, Union } from "react-bootstrap-icons";

const LinkElement = ({ attributes, element, children }) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div className="element-link">
      <a {...attributes} href={element.href}>
        {children}
      </a>
      {selected && focused && (
        <div className="popup" contentEditable={false}>
          <a href={element.href} rel="noreferrer" target="_blank">
            <Link45deg/>
            {element.href}
          </a>
          <button onClick={() => removeLink(editor)}>
            <Union/>
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkElement;
