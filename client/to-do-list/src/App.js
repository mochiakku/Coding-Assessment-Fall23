import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  //Adding item
  const addItem = async (e) => {
    e.preventDefault();
    try {
      if (itemText === "") {
        alert("Enter a task")
      }
      else {
        const res = await axios.post('http://localhost:5500/api/item', { item: itemText })
        setListItems(prev => [...prev, res.data]);
        setItemText('')
      }
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get('http://localhost:5500/api/items')
        setListItems(res.data);
        console.log('render')
      } catch (err) {
        console.log(err);
      }
    }
    getItemsList()
  }, []);

  //Delete

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`)
      const newListItems = listItems.filter(item => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="App">
      <h1>To-Do-List</h1>
      <form className="form" onSubmit={e => addItem(e)}>
        <input type="text" placeholder='Add Item' onChange={e => { setItemText(e.target.value) }} value={itemText} />
        <button type="submit">
          Add
        </button>
      </form>
      <div className="todo-listItems">
        {
          listItems.map(item => (
            <div className="todo-item">
              <p className="item-content">{item.item}</p>
              <button className="delete-item" onClick={() => { deleteItem(item._id) }}>Delete</button>
            </div>)
          )
        }
      </div>
    </div>
  );
}

export default App;
