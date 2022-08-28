import React from "react";
import { useSelector } from "react-redux";
import parse from 'html-react-parser';
import {Link } from "react-router-dom";
import { selectGeneratedCode } from '../../states/generated-code-slice/generated-code-slice';
function Preview() {
  const generatedcode = useSelector(selectGeneratedCode);
  console.log(generatedcode);
  return (<>
    <div className="small text-center text-muted bh-light mb-3">
    <span>You are currently viewing in Preview Mode. </span>
    <Link to="/">
        Back to Edit
    </Link>
    </div>
        {
        parse(generatedcode)
        }
    </>
    )
}


export default Preview;
