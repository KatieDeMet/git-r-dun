import React from 'react';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <div className="header">
           <Link to="/"><img src="/images/checklist.png" alt="checklist logo" /></Link>
           <h1>Git 'R Dun</h1>
        </div>
    )
}
