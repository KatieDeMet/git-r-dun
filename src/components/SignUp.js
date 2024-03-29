import axios from 'axios';
import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../UserContext';
import Header from './Header';

const baseURL = ""

export default function SignUp(props) {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [oldEmailError, setOldEmailError] = useState("");
    const [userError, setUserError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const userContext = useContext(UserContext);

    useEffect(() => {
        setEmailError("")
        const emailValid = /[\w-.]+@[\w-.]+\.[\w-]+/
        if(email === "") {
            return
        } else if(email.length > 255) {
            setEmailError("Email exceeds maximum length")
        } else {
            if(!emailValid.test(email)) {
                setEmailError("Please enter a valid email")
            }
        }

       
    }, [email])

    useEffect(() => {
        if(password === "") {
            return
        } else if(password.length < 8) {
            setPasswordError("Password should be at least 8 characters")
        } else if(password.length > 72) {
            setPasswordError("Password cannot be more than 72 characters")
        } else {
            setPasswordError("")
        }
    }, [password])

    const handleChange = ({target}) => {
        switch (target.id) {
            case 'email':
                setOldEmailError("")
                setEmail(target.value);
                break;
            case 'username':
                setUserError("")
                setUsername(target.value);
                if(username.length > 50) {
                    setUserError("Username cannot be more than 50 characters")
                }
                break;
            case 'password':
                setPassword(target.value);
                break;
            default:
                console.log("Unexpected input")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(emailError === "" && oldEmailError === "" && userError === "" && passwordError === "") {
            const newUser = {
                email: email,
                username: username,
                password: password
            }
            await axios.post(`${baseURL}/signup`, {newUser})
                .then(res => {
                    setEmail("")
                    setUsername("")
                    setPassword("")
                    userContext.setUser(res.data)
                    userContext.setLoggedIn(true)
                })
                .catch(err => {
                    if(err.response.status === 400) {
                        let message = err.response.data
                        message.includes("Username") ? setUserError(message) : setOldEmailError(message)
                        return
                    } else {
                        console.log(err)
                    }
                })
            }
    }

    return (
        <div className="main-background">
        <Header />
         { userContext.loggedIn ? props.history.push(`/lists/${userContext.user[0].id}`) : (
        <div className="main">
        <div className="form-container">
            <h2>Sign up here</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="email">Email:</label>
                    <input required type="text" name="email" id="email" value={email} onChange={handleChange}></input>
                </div>
                <div className="form-row">
                    {oldEmailError === "" ? <p className="error-message">{emailError}</p> : <p className="error-message">{oldEmailError}</p>}
                
                </div>
                <div className="form-row">
                    <label htmlFor="username">Username:</label>
                    <input required type="text" name="username" id="username" value={username} onChange={handleChange}></input>
                </div>
                <div className="form-row">
                    <p className="error-message">{userError}</p>
                </div>
                <div className="form-row">
                    <label htmlFor="password">Password:</label>
                    <input required type="text" name="password" id="password" value={password} onChange={handleChange}></input>
                </div>
                <div className="form-row">
                    <p className="error-message">{passwordError}</p>
                </div>
                <div className="form-row">
                    <input type="submit" value="Submit"></input>
                </div>
            </form>
            <p>Already have an account? <Link to="Login">Log in here.</Link></p>
        </div>
        </div>
         )}
        </div>
    );
}