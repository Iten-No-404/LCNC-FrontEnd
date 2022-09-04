import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/esm/Tab';
import Tabs from 'react-bootstrap/esm/Tabs';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/Modal';
import { logInThunk, signUpThunk, selectUserAuthToken, selectUserStatus, selectUserStatusMessage, selectUserUUID } from '../../../../states/user-slice/user-slice';


function UserPrompt({userPromptContoller}) {
    const dispatch = useDispatch();
    const userStatus = useSelector(selectUserStatus);
    const userStatusMessage = useSelector(selectUserStatusMessage);
    const authToken = useSelector(selectUserAuthToken);
    const uuid = useSelector(selectUserUUID);
    const { userPromptOpen, handlePromptClose, handlePromptOpen, promptType, setPromptTypeLogin, setPromptTypeSignUp  } = userPromptContoller;
    const [entered, setEntered] = useState(false);
    const [autoEnter, setAutoEntered] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setreEnterPassword] = useState('');

    useEffect(() => {
        if(autoEnter && !entered && authToken && userStatus === "fulfilled")
        {
            setEntered(true);
            // if(process.env.NODE_ENV === "development")
            if(process.env.REACT_APP_SPLIT === "true")
                window.location = process.env.REACT_APP_APP_URL + `/redirect/${uuid}`;
            else
                window.location = window.location.protocol + "//app." + window.location.host + `/redirect/${uuid}`;
        }
    }, [authToken]);


    const handleLogIn = () => {
        dispatch(logInThunk({
            email: email,
            password: password,
            isEmailconfirmed: true,
            isActive: true
        }));
        setAutoEntered(true);
    }
    
    const handleSignUp = () => {
        if(password !== reEnterPassword)
            return;
            dispatch(signUpThunk({
                fullName: fullName,
            email: email,
            phoneNo: phoneNo,
            password: password,
            isEmailconfirmed: true,
            isActive: true
        }));
        setAutoEntered(true);
    }

  return (
    <Modal
      show={userPromptOpen}
      onHide={handlePromptClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered

    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {promptType === 'Login'? 'Log In to your account!' : 'Create a new account!'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="login-signup">
            <Tabs
                defaultActiveKey={promptType}
                id="user-prompt"
                // className="mb-3"
                style={{ alignContent: 'center' }}
                onClick={ (e) => promptType==='Login'?setPromptTypeSignUp():setPromptTypeLogin()}
              >
                <Tab eventKey='Login' title="Log In" style={{ padding: '5%', margin: "5%"}}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={email} onChange={(e) => { /*dispatch(setWidthval(e.target.value));*/ setEmail(e.target.value) }} type="email" placeholder="example@example.com"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} onChange={(e) => { /*dispatch(setWidthval(e.target.value));*/ setPassword(e.target.value) }} type="password" placeholder="*********"/>
                    </Form.Group>
                    {userStatus === "failed" && <h4 style={{ color: 'red', paddingTop: "5px"}} >{userStatusMessage}</h4>}
                    <Button variant="primary" style={{marginTop: '10px'}} type="button" onClick={() => handleLogIn()}>Log In</Button>
                </Tab>
                <Tab eventKey="SignUp" title="Sign Up" style={{ padding: '5%', margin: "5%"}}>
                    <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={fullName} onChange={(e) => { /*dispatch(setWidthval(e.target.value));*/ setFullName(e.target.value) }} type="text" placeholder="Your name"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={email} onChange={(e) => { /*dispatch(setWidthval(e.target.value));*/ setEmail(e.target.value) }} type="email" placeholder="example@example.com"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control value={phoneNo} onChange={(e) => { /*dispatch(setWidthval(e.target.value));*/ setPhoneNo(e.target.value) }} type="number" placeholder="0**********"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} onChange={(e) => { /*dispatch(setWidthval(e.target.value));*/ setPassword(e.target.value) }} type="password" placeholder="*********"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control value={reEnterPassword} onChange={(e) => { /*dispatch(setWidthval(e.target.value));*/ setreEnterPassword(e.target.value) }} type="password" placeholder="*********"/>
                    </Form.Group>
                    {userStatus === "failed" && <h4 style={{ color: 'red', paddingTop: "5px"}} >{userStatusMessage}</h4>}
                    {password !== reEnterPassword && (password || reEnterPassword) && <h4 style={{ color: 'red', paddingTop: "5px"}} >Passwords don't match!!!</h4>}
                    <Button variant="primary" style={{marginTop: '5px'}} type="button" onClick={() => handleSignUp()}>Sign Up</Button>
                </Tab>
              </Tabs>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UserPrompt;