import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { PropTypes } from "prop-types";

/**
 * use to show the generated code HTML or CSS depend on language and the code text that pass as props
 */
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

Codeblock.propTypes = {
  /** code language HTML OR CSS */
  language:PropTypes.string,
  /** code text */
  code:PropTypes.string,
}


