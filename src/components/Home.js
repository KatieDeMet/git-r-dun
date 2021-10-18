import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';


export default function Home() {
    return (
        <div>
            <Header />
            <h1>Welcome to Git 'R Dun!</h1>
                <h2>Manage all your household tasks with a single app!</h2>
                    <p>Please <Link to="/login">log in</Link> or <Link to="/signup">sign up here</Link></p> 
        </div>
    )
}