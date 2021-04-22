import React, { useState, useRef } from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import LoginForm from './Login'
import SignupForm from './Signup'
import NoteForm from './Inputs'
import {itemToDelete, createNoteData, generateRandomNumber} from './tools.js'
import {CardBody, NavbarMain, SidebarMain, NoteToast, ModalUtil, AuthenticationToast} from './Utils'
import {useFormik,} from 'formik';

const sampleData = {
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
}

const emptyData = {
    id: generateRandomNumber(),
    title: 'SO EMPTY',
    text: `CREATE SOME CARDS PLEASE`,
    textA: 'CREATE SOME CARDS PLEASE',
    renderButtons: false
}

let listData = []

for (let index = 0; index < 9; index++) {
    listData.push(sampleData);
}


const CardSection = (props) => {

    const renderCards = (arrayObj) => {
        let cardInstances;

        if (arrayObj.length === 0) {
            cardInstances =  (
                <div className="inner-empty">
                    <CardBody {...emptyData}/>
                </div>
            )
        }
        else {
            let cards = arrayObj.map(item => {
                return <CardBody {...item}/>
            })
            cardInstances = (
                <div className="inner-main">
                    {cards}
                </div>
            )
        }
        return cardInstances
    }

    return (
        renderCards(props.content)
    );
}

const MainContainer = (props) => {
    
    return (
        <main className="container-fluid">
            {props.children}
        </main>
    );
}

const NoteSection = (props) => {

    return (
        <div className="inner-main">
            <NoteForm newNote={true} onNewNoteSubmit={props.onNewNoteSubmit}/>
        </div>
    )
}

const LoginSection = (props) => {

    const formikData = props.loginForm;

    return (
        <div className="inner-main">
            <LoginForm formik={formikData}></LoginForm>
        </div>
    )
}

const SignupSection = (props) => {

    const formikData = props.signupForm;

    return (
        <div className="inner-main">
            <SignupForm formik={formikData}></SignupForm>
        </div>
    )
}

const Main = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [cardData, setCardData] = useState(listData.map(dataToComponent));
    const [noteData, setNoteData] = useState({id:'', noteTitle: '', noteText: ''});
    const [showCreated, setShowCreated] = useState(false);
    const [showEdited, setShowEdited] = useState(false);
    const cardDataRef = useRef();
    const noteDataRef = useRef();
    cardDataRef.current = cardData;
    noteDataRef.current = noteData;
    const toggleShowCreated = () => setShowCreated(!showCreated);
    const toggleShowEdited= () => setShowEdited(!showEdited);
    let ActiveBody = props.ActiveSection;

    
    function onNewNoteSubmit(values) {
        let cardObj = JSON.parse(JSON.stringify(values))
        let newCard = dataToComponent(cardObj)
        setCardData( (prevState) => {
            let arr = prevState.slice()
            arr.push(newCard)
            return arr
            }
        )
        toggleShowCreated()
    }

    function onUpdateNoteSubmit(values) {
        // Do stuff here...
        let cardObj = JSON.parse(JSON.stringify(values))
        let cardId = noteDataRef.current.id

        function newCardArray(value) {
            if (value.id !== cardId) return value;
            value['title'] = cardObj['title']
            value['text'] = cardObj['text']
            return value;
        }

        setCardData( (prevState, ) => {
            let arr = prevState.slice()
            arr.map(newCardArray)
            return arr
            }
        )
        toggleShowEdited()
    }

    function dataToComponent(value) {
        const cardConstruct = {...value}
        cardConstruct['id'] = generateRandomNumber()
        cardConstruct['key'] = cardConstruct['id']
        cardConstruct['onOpenClick'] = handleShowModal
        cardConstruct['onCardClick'] = handleEditNote
        cardConstruct['onDeleteClick'] = handleDeleteClick
        cardConstruct['renderButtons'] = true
        return cardConstruct
    }

    function handleHideModal() {
        setShowModal(false)
    }

    function handleShowModal(event) {
        handleModalData(event)
        setShowModal(true)
    }

    function handleEditNote(event) {
        let data = createNoteData(event, cardDataRef.current)
        setNoteData(data)
        props.handleMainBody(event, 4)
    }

    function handleDeleteClick (event) {
        let target = event.target;
        let targetAtr = parseInt(target.getAttribute('data-index'));

        setCardData( (prevState) => {
            let arr = prevState.filter(itemToDelete.bind(null, targetAtr))
            return arr
            }
        )
    }

    function handleModalData (event) {
        let data = createNoteData(event, cardDataRef.current)
        setModalData(data)
    }

    const modalProps = {
        show: showModal,
        data: cardData.length ? modalData : null,
        onModalHide: handleHideModal
    }

    const toastProps = {
        showCreated,
        showEdited,
        toggleShowCreated,
        toggleShowEdited,
    }

    const bodyProps = {
        content: cardData,
        showModal: handleShowModal,
        loginForm: props.loginForm,
        signupForm: props.signupForm,
        onNewNoteSubmit,
        onUpdateNoteSubmit,
        noteData,
    }

    return (
        <MainContainer>
            <Row xs={2} className={'p-2'}>
                {props.isAuthenticated && 
                <Col xs={1} className={'sidebar-nav'}>
                    <SidebarMain {...props.nav}/>
                </Col>}
                <Col xs={12} xl={11}>
                    <ActiveBody {...bodyProps}/>
                </Col>
            </Row>
            <ModalUtil {...modalProps}/>
            <NoteToast {...toastProps}/>
        </MainContainer>
    )
}

const Body = (props) => {

    const sectionArray = [CardSection, NoteSection, LoginSection, SignupSection, NoteForm]
    const [sectionIndex, setSectionIndex] = useState(2);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginToast, setLoginToast] = useState(false);
    const [userUsername, setuserUsername] = useState('Stranger');
    const signupForm = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
    })

    const loginForm = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
          setuserUsername(values['username']) 
          handleAuthentication()
        },
    })
    const toggleLoginToast = () => setLoginToast(!showLoginToast);

    const handleAuthentication = (isAuthenticated) => {
        if (isAuthenticated) {
            setSectionIndex(2)
        }
        else {
            setSectionIndex(0)
            toggleLoginToast()
        }
        setIsAuthenticated(!isAuthenticated)
    }

    function handleMainBody(event, index) {
        event.preventDefault();
        setSectionIndex(index)
    }

    const navProps = {
        onNavLinkClick: handleMainBody,
        isAuthenticated,
        handleAuthentication
    }

    const toastProps = {
        showLoginToast,
        toggleLoginToast,
        userUsername
    }

    const mainProps = {
        ActiveSection: sectionArray[sectionIndex],
        handleMainBody,
        loginForm: loginForm,
        signupForm: signupForm,
        nav: navProps,
        isAuthenticated,
    }

    return (
        <Container fluid className={'wrapper-body'}>
            <NavbarMain {...navProps}/>
            <Main {...mainProps}/>
            <AuthenticationToast {...toastProps}/>
        </Container>
    )
    
}


const App = () => (
    <Body/>
);

export default App;