import React, {useState, useContext} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import UserContext from '../UserContext';
import Header from './Header';

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userError, setUserError] = useState("");
    const [passError, setPassError] = useState("");
    const user = useContext(UserContext);

    const handleChange = (e) => {
        if(e.target.id === 'username') {
            setUserError("")
            setUsername(e.target.value);
        } else {
            setPassError("")
            setPassword(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:7777/user/${username}/${password}`)
            .then(res => {
                user.setUser(res.data)
                user.setLoggedIn(true)
            })
            .catch(err => {
                if(err.response.status === 400) {
                    setUserError(err.response.data)
                    return
                } else if(err.response.status === 401) {
                    setPassError(err.response.data)
                    return
                } else {
                    console.log(err)
                }
            }) 
        
    }

    return (
        <>
        <Header />
        { user.loggedIn ? props.history.push(`/lists/${user.user[0].id}`) : (
        <div className="main">
        <div className="form-container">
            <h2>Log in to your account</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input required type="text" id="username" name="username" value={username} onChange={handleChange}></input>
                <p className="error-message">{userError}</p>
                <label htmlFor="password">Password:</label>
                <input required type="text" id="password" name="password" value={password} onChange={handleChange}></input>
                <p className="error-message">{passError}</p>
                <input type="submit" value="Log in"></input>
            </form>
            <p>Forgot your username or password?</p>
            <p>New to Git 'R Dun? <Link to="SignUp">Sign up here.</Link></p>
        </div>
        </div>
        )}
        </>
    );
}

export default withRouter(Login);