import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../UserContext';

export default function Header(props) {
    const user = useContext(UserContext);

    const handleLogOut = () => {
        user.setLoggedIn(false)
    }

    return (
        <div className="header">
           <Link to="/"><img src="/images/checklist.png" alt="checklist logo" onClick={handleLogOut} /></Link>
           <h1>Git 'R Dun</h1>
        </div>
    )
}
