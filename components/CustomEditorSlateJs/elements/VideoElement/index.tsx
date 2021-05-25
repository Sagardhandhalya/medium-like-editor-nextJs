import React from "react";

const VideoElement = ({ attributes, element,children }) => {
  return (
    <div {...attributes}>
      <iframe
        width="560"
        height="315"
        src={"https://www.youtube.com/embed/"+element.url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default VideoElement;
