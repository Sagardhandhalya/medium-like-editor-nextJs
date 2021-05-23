import React from 'react'

const CustomVideo = ({blockProps}) => {
    console.log(blockProps);
    
    return (
        <div>
            {/* <video width="600px" height="400px" src={blockProps.src} ></video> */}
            <iframe 
             src={blockProps.src}
              width="600" height="400"></iframe>
        </div>
    )
}

export default CustomVideo
