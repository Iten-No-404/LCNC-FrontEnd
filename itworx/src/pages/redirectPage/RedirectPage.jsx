import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom'
import  { useNavigate } from 'react-router-dom'
import { selectUser, getLoggedInUserThunk } from "../../states/user-slice/user-slice";

function RedirectPage({ isOnAppSub }) {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    useEffect(() => {
        async function fetchUserData() {
          if(isOnAppSub && token !== "" && token !== undefined)
          {
                dispatch(getLoggedInUserThunk(token));
                handleClose();
          }
        }
        fetchUserData();
      }, []);

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
