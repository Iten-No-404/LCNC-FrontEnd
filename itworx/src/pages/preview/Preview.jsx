import React from "react";
import { useSelector } from "react-redux";
import parse from 'html-react-parser';
import {Link, useParams } from "react-router-dom";
import { selectGeneratedCode } from '../../states/generated-code-slice/generated-code-slice';
function Preview() {
  const generatedcode = useSelector(selectGeneratedCode);
  const { id } = useParams();
  return (<>
    <div className="small text-center text-muted bh-light mb-3">
    <span>You are currently viewing in Preview Mode. </span>
    <Link to={"/project/"+id}>
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
