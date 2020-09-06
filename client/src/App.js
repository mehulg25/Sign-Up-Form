import React, {Component} from 'react';
import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import './App.scss';
import logo from './logo.svg';
import {
    Form,
    Button,
    Container,
    InputGroup,
    Row,
    Col,
    Alert
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LoremIpsum} from 'react-lorem-ipsum';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

class App extends Component {

    state = {
        fname: '',
        lname: '',
        email: '',
        password: '',
        showAlert: false,
        isRevealed: false
    }


    responseGoogle = (response) => {
        console.log(response);
    }

    responseFacebook = (response) => {
        console.log(response);
    }

    revealPassword = () => {
        this.setState({
            isRevealed: !this.state.isRevealed
        })
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();

        const {email, password} = this.state;

        // Create User Object
        const newUser = {
            email,
            password
        };

        // Attempt to register using axios
        // NOTE : /api/register api was giving 400 error instead 'regster' seemed to work perfectly

        axios.post('https://reqres.in/api/regster', newUser).then(res => {
            if (res.status === 201) {
                this.setState({showAlert: true})
                setTimeout(() => this.setState({showAlert: false}), 4000);
            }

        }).catch(function (err) {
            console.log(err);
        })

    }

    render() {
        return (

            <div className="App">

                <img src={logo}
                    className="App-logo"
                    alt="Brand Logo"/><br/>

                <Container className="App-Container">
                    SIGN UP
                    <h2>Create your account</h2><br/>
                    <LoremIpsum p={1}
                        avgWordsPerSentence={1}
                        avgSentencesPerParagraph={1}/>

                    <Row>
                        <Col><GoogleLogin clientId=""
                                //CLIENTID NOT CREATED YET
                                buttonText="Sign Up With Google"
                                onSuccess={
                                    this.responseGoogle
                                }
                                onFailure={
                                    this.responseGoogle
                                }/></Col>
                        <Col>

                            <FacebookLogin appId=""
                                //APPID NOT CREATED YET
                                autoLoad={true}
                                fields="name,email"
                                icon="fa-facebook"
                                cssClass="facebook-button"
                                textButton="Sign Up With Facebook"
                                callback={
                                    this.responseFacebook
                                }/></Col>
                    </Row>

                    <br/>
                    or
                    <hr/>
                    <br/><br/>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="First Name" name="fname"
                                onChange={
                                    this.onChange
                                }/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Last Name" name="lname"
                                onChange={
                                    this.onChange
                                }/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Email Address" name="email"
                                onChange={
                                    this.onChange
                                }/>
                        </Form.Group>

                        <InputGroup className="mb-2">
                            <Form.Control type={
                                    this.state.isRevealed ? "text" : "password"
                                }
                                placeholder="Password"
                                name="password"
                                onChange={
                                    this.onChange
                                }/>
                            <InputGroup.Prepend onClick={
                                this.revealPassword
                            }>
                                <InputGroup.Text><FontAwesomeIcon icon={
                                        this.state.isRevealed ? faEyeSlash : faEye
                                    }/></InputGroup.Text>
                            </InputGroup.Prepend>
                        </InputGroup>

                        <Row>
                            <Col>
                                <Form.Text>By clicking Sign Up,you agree to our
                                    <a href="#">Terms Of Use</a>
                                    and our
                                    <a href="#">Privacy Policy</a>
                                </Form.Text>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Button variant="primary" type="submit" className="signup-button"
                                    onClick={
                                        this.onSubmit
                                }>
                                    SIGN UP
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                    <Alert show={
                            this.state.showAlert
                        }
                        variant="success">
                        <Alert.Heading>Register Successfull !</Alert.Heading>
                    </Alert>
                </Container>
            </div>
        );
    }
}

export default App;
