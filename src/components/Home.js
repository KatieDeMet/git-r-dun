import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';


export default function Home() {
    return (
        <div className="main-background">
        <Header />
        <div className="main">
            <div className="landing-page">
                <h2>Welcome to <span style={{fontFamily: 'Nothing You Could Do'}}>Git 'R Dun!</span></h2>
                    <h3>Manage all your household tasks with a single app!</h3>
                        <p>Please <Link to="/login">log in</Link> or <Link to="/signup">sign up here</Link></p> 
            </div>
        </div>
        </div>
    )
}