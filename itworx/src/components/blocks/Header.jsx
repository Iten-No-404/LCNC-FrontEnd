import React from "react";
// import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { defaultFont } from "../../helper/InitialFont";
// import { selectWidgetsList, selectWidgetCSSFont, setWidget } from "../../states/WidgetCSSSlice/WidgetCSSSlice";


export default function Header({text, id, classN, font, logo=false}) {
    // const widgetList = useSelector(selectWidgetsList);
    // const fontList = useSelector(selectWidgetCSSFont);
    // const dispatch = useDispatch();
    // var font;
    // if(!logo && fontChange)
    // {
    //   // dispatch(setWidget({
    //   //   id: id,
    //   //   font: fontList
    //   // }));
    //   font = fontList;
    //   console.log("Id=",id," Inside the board fontList",fontList);
    //   console.log("Id=",id," Inside the board widgetList[id]",widgetList[id]);
    //   console.log("Id=",id," Inside the board font",font);
    // } else if(!logo)
    // {
    //   font = widgetList[id];
    //   console.log("Id=",id," Inside the board fontList",fontList);
    //   console.log("Id=",id," Inside the board widgetList[id]",widgetList[id]);
    //   console.log("Id=",id," Inside the board font",font);
    // }
    // else
    //   font = defaultFont;
    if(logo)
      font = defaultFont;
    // else {
    //   console.log("Id=",id," Inside the board fontList",fontList);
    //   console.log("Id=",id," Inside the board widgetList[id]",widgetList[id]);
    //   console.log("Id=",id," Inside the board font", font);
    // }
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "block",
        item: { id: id },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
    }));

  return (
    <header
    className={classN}
    ref={drag}
    style={{ border: isDragging ? "5px solid pink" : "0px",
             fontFamily: font.family,
   }}
    >
      <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'>{text}</h1>
      </div>
    </header>
  );
}
