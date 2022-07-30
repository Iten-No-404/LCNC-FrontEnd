import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Header from './blocks/Header';
import Section from './blocks/Section';
import Layers from './Layers';
import StyledBlock from './StyleBlock';


function Ctabs({board, setBoard }) {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="profile" title="Blocks" className='Blocks'>
        <Header classN="blockTab" text="Header" id={1} />
        <Section classN="blockTab" text="Section" id={2} />
      </Tab>
      <Tab eventKey="home" title="Layers">
      <Layers board={board} setBoard={setBoard} />
      </Tab>
      <Tab eventKey="longer-tab" title="Style">
        <StyledBlock board={board} setBoard={setBoard} />
      </Tab>
    </Tabs>
  );
}

export default Ctabs;