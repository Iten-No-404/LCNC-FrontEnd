import React from "react";

const DisplayImage = ({selectedImage=null, classN, isDragging=false} ) => {
  //const [selectedImage, setSelectedImage] = useState(imgurl);
  return (
    <div 
    id="wrapper"
    className={classN}
    style={{ border: isDragging ? "5px solid pink" : "0px"}}
    >
      {selectedImage ? (
        <div>  
        <img alt="not fount" width="300" src={selectedImage} />
        </div>
      ) :  
      (<div>
      <img id="uploadimg" alt="avater" src="data:image/png;base64,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" />
      </div>)
     }
    </div>
  );
};

export default DisplayImage;