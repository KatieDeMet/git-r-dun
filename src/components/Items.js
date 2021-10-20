import React, {useState, useEffect} from 'react';
import axios from 'axios';

const baseURL = ""

export default function Items(props) {
    const [items, setItems] = useState([]);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [newItem, setNewItem] = useState("");

    const getItems = async (id) => {
        await axios.get(`${baseURL}/items/${id}`)
            .then(res => {
                setItems(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getItems(props.id)
    }, [])

    const openModal = () => {
        setModal(true)
    }

    const openEditModal = (e) => {
        setCurrentItem(e.target.id)
        setEditModal(true)
    }

    const handleChange = (e) => {
        setNewItem(e.target.value)
    }
    
    const handleAddItem = async (e) => {
        e.preventDefault()
        await axios.post(`${baseURL}/items/${props.id}`, {"name": newItem})
            .then(() => {
                setNewItem("")
                setModal(false)
                getItems(props.id)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleEditItem = async (e) => {
        e.preventDefault()
        await axios.patch(`${baseURL}/items/${currentItem}`, {"name": newItem})
            .then(() => {
                setCurrentItem(null)
                setNewItem("")
                setEditModal(false)
                getItems(props.id)
            })
            .catch(err => console.log(err))
    }

    const handleDelete = async (e) => {
        await axios.delete(`${baseURL}/items/${e.target.id}`)
            .then(() => {
                getItems(props.id)
            })
            .catch(err => console.log(err))
    }

    const handleCancel = () => {
        setEditModal(false)
        setModal(false)
    }

    return (
        <>
        <ul className="item-list">
            {items.map((item) => {
                return (
                    <li key={item.id} className="list-item">{item.description}
                    <div>
                        <img src="/images/edit.png" alt="edit" id={item.id} className="button" onClick={openEditModal} />
                        <img src="/images/trashcan.png" alt="delete" id={item.id} className="button" onClick={handleDelete} />
                    </div>
                    </li>
                )
            })}
        </ul>
        {editModal ? (
            <form onSubmit={handleEditItem}>
                <label htmlFor="editListItem">Edit Item:</label>
                <input type="text" name="editListItem" value={newItem} onChange={handleChange}></input>
                <input type="submit" value="Edit Item"></input>
                <button onClick={handleCancel} className="cncl-btn">Cancel</button>
            </form>
        ) : null}
        {modal | editModal ? null : <button onClick={openModal}>Add Item</button>}
        {modal ? (
            <form onSubmit={handleAddItem}>
                <label htmlFor="addListItem">New Item:</label>
                <input type="text" name="addListItem" id="addListItem" value={newItem} onChange={handleChange}></input>
                <input type="submit" value="Add Item" className="add-btn"></input>
                <button onClick={handleCancel} className="cncl-btn">Cancel</button>
            </form>
        ) : null}
        </>
    );
}