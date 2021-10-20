import React, {useState, useContext, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import UserContext from '../UserContext';
import axios from 'axios';
import Header from './Header';
import Items from './Items';

const baseURL = "http://localhost:7777"

function Lists(props) {
    const [lists, setLists] = useState([]);
    const [newList, setNewList] = useState("");
    const [currentList, setCurrentList] = useState(null);
    const [modal, setModal] = useState(false);
    const [listModal, setListModal] = useState(false);
    const user = useContext(UserContext);
    let currentUser = user.user[0]


    async function fetchData() {
        await axios.get(`${baseURL}/lists/${currentUser.id}`)
            .then(res => {
                setLists(res.data)
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

    const openListModal = (e) => {
        setCurrentList(e.target.id)
        setListModal(true)
    }

    const handleListChange = (e) => {
        setNewList(e.target.value)
    }

    const addList = async (e) => {
        e.preventDefault()
        await axios.post(`${baseURL}/lists/${currentUser.id}`, {"name" : newList})
            .then(res => {
                setNewList("")
                setModal(false)
                fetchData();
            })
            .catch(err => console.log(err))
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        await axios.patch(`${baseURL}/lists/${currentList}`, {"name" : newList})
            .then(res => {
                setNewList("")
                setListModal(false)
                fetchData()
            })
            .catch(err => console.log(err))
    }

    const handleDelete = async (e) => {
        await axios.delete(`${baseURL}/lists/${e.target.id}`)
        fetchData()
    }

    const handleCancel = () => {
        setModal(false)
        setListModal(false)
    }

    return (
        <div className="wrapper">
            <Header />
            <div className="list-wrapper">
            <aside>
                <h3>My Lists</h3>
                    <ul>
                        {lists.map((list) => {
                            return (<li key={list.id} className="list">{list.name}&nbsp;
                                    <img src="/images/edit.png" alt="edit" id={list.id} className="button" onClick={openListModal} />
                                    <img src="/images/trashcan.png" alt="delete" id={list.id} className="button" onClick={handleDelete} />
                                    </li>
                                )
                        })}
                    </ul>
                    {listModal ? (
                        <form onSubmit={handleEdit}>
                        <label htmlFor="newListName">New Name:</label>
                        <input type="text" name="newListName" id="newListName" onChange={handleListChange} value={newList}></input>
                        <input type="submit" value="Change"></input>
                        <button onClick={handleCancel}>Cancel</button>
                        </form>
                    ) : null}
                    {modal | listModal ? null : <button onClick={openModal} id="new-list-btn">Add New List</button>}
                {modal ? (
                    <form onSubmit={addList}>
                    <label htmlFor="listName">Name:</label>
                    <input type="text" name="listName" id="listName" onChange={handleListChange} value={newList}></input>
                    <input type="submit" value="Add" className="add-btn"></input>
                    <button onClick={handleCancel}>Cancel</button>
                    </form>
                    ) : null
                }
            </aside>
            <div className="main-content">
                <div className="welcomeHeader">
                    <h2>Welcome {currentUser.username}!</h2>
                    <button onClick={handleLogOut}>Logout</button>
                </div>
                <ul>
                {lists.map(list => {
                    return (
                        <li key={list.id} className="item-title">
                            <h3>{list.name}</h3>
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