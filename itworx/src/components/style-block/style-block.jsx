import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontPickerTool from '../font-picker/font-picker';
import ColorPickerTool from '../color-picker/color-picker';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { selectWidgetCSS, setTextContent, setFontsizeval, setWidthval, setHeightval, setPaddingval, setMarginval, setBoarderrediusval } from '../../states/widget-css-slice/widget-css-slice';
import StyleBlockHandler from './style-block-controller';
import { PropTypes } from "prop-types";

/**
 * render the style proberties depend on the selected widget and manage the user to change CSS for that widget
 */
const StyledBlock = ({ board, setBoard, projectId }) => {
  const CSS = useSelector(selectWidgetCSS);
  const [content, setContent] = useState("");
  const [fontsize, setFontsize] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState();
  const [margin, setMargin] = useState("");
  const [padding, setPadding] = useState("");
  const [boarderredius,setBoarderredius] = useState("");
  const [selectedblock, setSelectedblock] = useState(null);
  const [activeFontFamily, setActiveFontFamily] = useState("Open Sans");
  const dispatch = useDispatch();
  const {
    handleUploadImage,
    recursiveChangeCSS
  } = StyleBlockHandler(setBoard);

  useEffect(() => {
    board.forEach((block) => {
      if (block.selected === true) {
        setSelectedblock(block);
      }
      block.children?.forEach((chilblock) => {
        if (chilblock.selected === true) {
          setSelectedblock(chilblock);
        }
      })

    });
  }, [board]);
  useEffect(() => {
    // Update the selected widget's properties
    setBoard((prevBoard) => {
      return recursiveChangeCSS(prevBoard);
    })

  }, [CSS]);
  useEffect(() => {
    if (CSS.id != null) {
      setContent(CSS.text.content);
      setFontsize(CSS.font.size);
      setWidth(CSS.width);
      setHeight(CSS.height);
      setBoarderredius(CSS.border.radius);
      setPadding(CSS.padding);
      setMargin(CSS.margin);
      setActiveFontFamily(CSS.font.family)
    }
  }, [CSS.id]);


  // if (selectedblock?.type === "navbar")
  //   return(
  //     <>
  //       <div>Pick Background Color</div>
  //       <ColorPickerTool colorType='backgroundColor' />
  //     </>
  //   );

  return (
    <>
      {selectedblock?.type === 'image' ? (
        <>
          <input
          className="form-control"
          type="file"
          name="myImage"
          onChange={(e) => handleUploadImage(e, selectedblock.id, projectId)} />
          <div className="d-flex flex-row">
              <Form.Group className="mb-3" controlId="width">
                <Form.Label>Width %</Form.Label>
                <Form.Control value={width} onChange={(e) => { dispatch(setWidthval(e.target.value)); setWidth(e.target.value) }} type="number" placeholder="ex: 100"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="height">
                <Form.Label>Height %</Form.Label>
                <Form.Control value={height} onChange={(e) => { dispatch(setHeightval(e.target.value)); setHeight(e.target.value) }} type="number" placeholder="ex: 100" />
              </Form.Group>
          </div>
          <div className="d-flex flex-row">
              <Form.Group className="mb-3" controlId="padding">
                <Form.Label>Padding px</Form.Label>
                <Form.Control value={padding} onChange={(e) => { dispatch(setPaddingval(e.target.value)); setPadding(e.target.value) }} type="number" placeholder="ex: 5"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="margin">
                <Form.Label>Margin px</Form.Label>
                <Form.Control value={margin} onChange={(e) => { dispatch(setMarginval(e.target.value)); setMargin(e.target.value) }} type="number" placeholder="ex: 5" />
              </Form.Group>
          </div>
          <Form.Group>
          <Form.Label>Border Radius %</Form.Label>
              <Form.Control value={boarderredius} onChange={(e) => { dispatch(setBoarderrediusval(e.target.value)); setBoarderredius(e.target.value) }} type="number" placeholder="ex: 20" />
          </Form.Group>
          <div>Pick Background Color</div>
          <ColorPickerTool colorType='backgroundColor' />
         </>   
        ) :
        (selectedblock ?
          (<Form>
            <Form.Group className="mb-3" controlId="textEditor">
              <Form.Control value={content} onChange={(e) => { dispatch(setTextContent(e.target.value)); setContent(e.target.value) }} type="text" placeholder="Enter Your Text" />
            </Form.Group>
            <div className="d-flex flex-row">
            <Form.Group className="mb-3" controlId="fontsize">
            <Form.Label>Font Size px</Form.Label>
              <Form.Control value={fontsize} onChange={(e) => { dispatch(setFontsizeval(e.target.value)); setFontsize(e.target.value) }} type="number" placeholder="ex: 20" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="borderradius">
            <Form.Label>Border Radius %</Form.Label>
              <Form.Control value={boarderredius} onChange={(e) => { dispatch(setBoarderrediusval(e.target.value)); setBoarderredius(e.target.value) }} type="number" placeholder="ex: 20" />
            </Form.Group>
            </div>
            <div className="d-flex flex-row">
              <Form.Group className="mb-3" controlId="width">
                <Form.Label>Width %</Form.Label>
                <Form.Control value={width} onChange={(e) => { dispatch(setWidthval(e.target.value)); setWidth(e.target.value) }} type="number" placeholder="ex: 100"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="height">
                <Form.Label>Height px</Form.Label>
                <Form.Control value={height} onChange={(e) => { dispatch(setHeightval(e.target.value)); setHeight(e.target.value) }} type="number" placeholder="ex: 100" />
              </Form.Group>
            </div>
            <div className="d-flex flex-row">
              <Form.Group className="mb-3" controlId="padding">
                <Form.Label>Padding px</Form.Label>
                <Form.Control value={padding} onChange={(e) => { dispatch(setPaddingval(e.target.value)); setPadding(e.target.value) }} type="number" placeholder="ex: 5"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="margin">
                <Form.Label>Margin px</Form.Label>
                <Form.Control value={margin} onChange={(e) => { dispatch(setMarginval(e.target.value)); setMargin(e.target.value) }} type="number" placeholder="ex: 5" />
              </Form.Group>
            </div>
            <Form.Group controlId="typographyStyles">
              <FontPickerTool  activeFontFamily={activeFontFamily} setActiveFontFamily={setActiveFontFamily} />
              <Tabs
                defaultActiveKey="font"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="font" title="Font Color">
                  <ColorPickerTool colorType='textColor' />
                </Tab>
                <Tab eventKey="background" title="Background Color">
                  <ColorPickerTool colorType='backgroundColor' />
                </Tab>
              </Tabs>
            </Form.Group>
          </Form>):(<div>Please select block from the Layers Tab to be styled</div>))
      }
    </>
  );
}

export default StyledBlock;


StyledBlock.propTypes = {
  /** board is have the all widget that is in the project */
 board: PropTypes.arrayOf(
   PropTypes.shape({
     id: PropTypes.number,
     type:  PropTypes.string,
     text: PropTypes.string,
     selected: PropTypes.bool,
     widgetCodeSnippet: PropTypes.shape({
      code1: PropTypes.string,
      code2:  PropTypes.string,
     }),
     CSS: PropTypes.object,
     children: PropTypes.array
   })
 ),
 /** setBoard function use to update the board */
 setBoard: PropTypes.func
}