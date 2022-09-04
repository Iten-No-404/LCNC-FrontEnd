import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom'
import  { useNavigate } from 'react-router-dom'
import { selectUser, setAuthToken, getLoggedInUserThunk, getUserToken, selectUserAuthToken } from "../../states/user-slice/user-slice";

function RedirectPage() {
    const { uuid } = useParams();
    const authToken = useSelector(selectUserAuthToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    useEffect(() => {
        async function fetchUserData() {
          if( uuid !== "" && uuid !== undefined)
          {
                dispatch(getUserToken(uuid));
                handleClose();
          }
        }
        fetchUserData();
      }, []);

    useEffect(() => {
      if(authToken)
      {
        dispatch(getLoggedInUserThunk(authToken));
        dispatch(setAuthToken(authToken));
      }
      }, [authToken]);

    useEffect(() => {
        if(user.isActive)
            navigate('/');
      }, [user.isActive]);

    return (
        <>
        <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title>Please wait a moment!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Account Loading!
        </Modal.Body>
      </Modal>
        </>
    );
}


export default RedirectPage;
