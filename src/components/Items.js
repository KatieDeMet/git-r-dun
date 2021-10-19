import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Items(props) {
    const [items, setItems] = useState([])

    const getItems = async (id) => {
        await axios.get(`http://localhost:7777/items/${id}`)
            .then(res => {
                setItems(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getItems(props.id)
    }, [])

    
    const handleAddItem = () => {
        getItems(props.id)
    }

    return (
        <>
        <ul>
            {items.map((item) => {
                return (<li key={item.id}>{item.description}</li>)
            })}
        </ul>
        <button onClick={handleAddItem}></button>
        </>
    );
}