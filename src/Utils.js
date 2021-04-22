import {React, useState, useRef} from 'react';
import {Navbar, Nav, NavDropdown, Button, Toast, Modal, Popover, Overlay} from 'react-bootstrap';

const CardBody = (props) => {
    const renderButtons = props.renderButtons;
    
    return (
        <div className={'card-main'} >
            <div className={'card-subject'}>
                {props.title}
            </div>
            <div className={'card-content'} data-index={props.id} onClick={props.onCardClick}>
                {props.text}
            </div>
            { renderButtons &&
            <div className={'card-extras'}>
                <Button variant="primary" data-index={props.id} onClick={props.onOpenClick}>Glance</Button>
                <Button data-index={props.id} onClick={(e) => props.onDeleteClick(e)} variant="danger">Delete</Button>
            </div>
            }
        </div>
    );
}

const NavbarMain = (props) => {

    const [showLogout, setShowLogout] = useState(false);
    const isAuthenticated = props.isAuthenticated;
    const Navfill = isAuthenticated? NavAuthenticated : NavUnauthenticated;
    const logoutRef = useRef(null);

    const navProps = {
        onNavLinkClick: props.onNavLinkClick,
        handleAuthentication: props.handleAuthentication,
        logoutRef,
        showLogout,
        setShowLogout,
    }

    const logoutProps = {
        showLogout,
        logoutRef
    }

    return (
        <Navbar expand="md" variant="light" className="mb-4 topbar-nav">
            <Navbar.Brand>
                <img
                src='/assets/images/lOGOBIG.png'
                height="25"
                className="d-inline-block align-top mt-1"
                alt=""
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navfill {...navProps}/>
            <LogoutPop {...logoutProps}/>
        </Navbar>
    )
}

const SidebarMain = (props) => {

    return (
        <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/home" onClick={(e) => props.onNavLinkClick(e, 0)}>Cards</Nav.Link>
            <Nav.Link href="/Note" onClick={(e) => props.onNavLinkClick(e, 1)}>New Card</Nav.Link>
        </Nav>
    )
}

const NavUnauthenticated = (props) => {
    return (
        <>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/Login" onClick={(e) => props.onNavLinkClick(e, 2)}>Login</Nav.Link>
                <Nav.Link href="/Signup" onClick={(e) => props.onNavLinkClick(e, 3)}>Signup</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </>
    )
}

const NavAuthenticated = (props) => {
    return (
        <>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/home" onClick={(e) => props.onNavLinkClick(e, 0)}>Cards</Nav.Link>
            <Nav.Link href="/Note" onClick={(e) => props.onNavLinkClick(e, 1)}>Create Card</Nav.Link>
            <Nav.Link href="" ref={props.logoutRef} onClick={props.handleAuthentication}>Logout</Nav.Link>
            <Nav.Link href="/Signup" onClick={(e) => props.onNavLinkClick(e, 3)}>Signup</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            </Nav>
        </Navbar.Collapse>
        </>
    )
}

const NoteToast = (props) => {

    return (
        <>
        <div style={{ position: 'relative'}} aria-live="polite" aria-atomic="true">
            <Toast className={'toast-note'} show={props.showCreated} onClose={props.toggleShowCreated} delay={3000} autohide>
                <Toast.Body>Card Created, Check Cards</Toast.Body>
            </Toast>

            <Toast onClose={props.toggleShowEdited} show={props.showEdited} animation={false} delay={3000} autohide>
                <Toast.Body>Card Updated, Check Cards</Toast.Body>
            </Toast>
        </div>
        </>
    );
}

const AuthenticationToast = (props) => {
    console.log(props.userUsername)
    let user;
    if (props.userUsername === '') {
        user = 'Stranger'
    } else {
        user = props.userUsername
    }

    return (
        <>
        <div className={'toast-auth'}>
            <Toast onClose={props.toggleLoginToast} show={props.showLoginToast} animation={true} delay={5000} autohide>
                <Toast.Body>Welcome {user}</Toast.Body>
            </Toast>
        </div>
        </>
    );
}

const ModalUtil = (props) => {

    let data = props.data;
    if (data === null ) {
        data = {
            title: '',
            text: '',
        }
    }

    return (
        <Modal
        show={props.show}
        onHide={() => props.onModalHide()}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        keyboard='true'
        size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                {data.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {data.text}
            </Modal.Body>
        </Modal>
    );
}

const LogoutPop = (props) => {

    return (
        <>
            <Overlay target={props.logoutRef.current} placement={'bottom'} show={props.showLogout}>
                {(props) => (
                    <Popover  id={`tooltip-overlay`}>
                    Confirm logout?
                    </Popover>
                )}
            </Overlay>
        </>
    )
}

export {CardBody, NavbarMain, SidebarMain, NoteToast, ModalUtil, LogoutPop, AuthenticationToast};