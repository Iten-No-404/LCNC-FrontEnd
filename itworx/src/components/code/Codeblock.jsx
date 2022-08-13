import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";


const Codeblock = (props) => {
  return (
    <div className="container mx-auto p-4">
      <div className="demo">
        <CopyBlock
          language={props.language}
          text={props.code}
          showLineNumbers={true}
          theme={dracula}
          wrapLines
          codeBlock
        />
      </div>
    </div>
  );
};

export default  Codeblock;


