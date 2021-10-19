import React, {useState, useContext, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import UserContext from '../UserContext';
import axios from 'axios';
import Header from './Header';
import Items from './Items';

function Lists(props) {
    const [lists, setLists] = useState([]);
    const [newList, setNewList] = useState("");
    const [modal, setModal] = useState(false);
    const user = useContext(UserContext);
    let currentUser = user.user[0]


    async function fetchData() {
        await axios.get(`http://localhost:7777/lists/${currentUser.id}`)
            .then(res => {
                setLists(res.data)
                console.log("!")
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleLogOut = () => {
        user.setLoggedIn(false)
        props.history.push('/')
    }

    const openModal = () => {
        setModal(true)
    }

    const handleListChange = (e) => {
        setNewList(e.target.value)
    }

    const addList = async (e) => {
        e.preventDefault()
        await axios.post(`http://localhost:7777/lists/${currentUser.id}`, {"name" : newList})
            .then(res => {
                setNewList("")
                setModal(false)
                fetchData();
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="wrapper">
            <Header />
            <div className="list-wrapper">
            <aside>
                <h2>My Lists</h2>
                    <ul>
                        {lists.map((list) => {
                            return (<li key={list.id} className="list">{list.name}
                                    <img src="/images/edit.png" alt="edit" />
                                    <img src="/images/trashcan.png" alt="delete" />
                                    </li>
                                )
                        })}
                    </ul>
                <button onClick={openModal}>Add New List</button>
                {modal ? (
                    <form onSubmit={addList}>
                    <label htmlFor="listName">Name:</label>
                    <input type="text" name="listName" id="listName" onChange={handleListChange} value={newList}></input>
                    <input type="submit" value="Add"></input>
                    </form>
                    ) : null
                }
            </aside>
            <div className="main-content">
                <h1>Welcome {currentUser.username}!</h1>
                <button onClick={handleLogOut}>Logout</button>
                <ul>
                {lists.map(list => {
                    return (
                        <li key={list.id}>
                            <h3>{list.name}</h3>
                            {console.log("New list")}
                            <Items id={list.id} />
                        </li>
                    )
                })}
                </ul>
            </div>
            </div>
        </div>
    );
}

export default withRouter(Lists);