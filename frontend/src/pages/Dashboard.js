import React, { useEffect, useState } from 'react';
import styles from '../styles/dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons';
import { ItemList } from '../components/ItemList';
import { NewItemModal } from '../components/NewItemModal';
import { handleGetItems, handleCreateCategory, handleGetCategories } from '../backendActions/items';


export default function Dashboard() {
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    async function getItems() {
      const result = await handleGetItems();
      if (result) {
        setItems(result) 
      }
    }
    async function getCategories() {
      const result = await handleGetCategories();
      if (result) {
        const categories = result.filter((category) => category.name !== '');
        setCategories(categories) 
      }
    }
    getCategories()
    getItems()
  }, []);

  function handleCategorySubmit(data) {
    return async (e) => {
      e.preventDefault();
      if (data.name === '') {
        console.error('Category name cannot be empty');
        return;
      }
      const result = await handleCreateCategory(data);
      if (result) {
        console.log(result);
        setShowNewCategoryForm(false);
        setCategories((prevCategories) => [...prevCategories, result]);
      }
    }
  }


  return (
    <div className={styles.dashboardContainer}>
      <div className='flex justify-between pb-5'>
        <div>
          <h1>Item Dashboard</h1>
          <p>All items</p>
          {showNewCategoryForm ? (
            <form className='flex gap-1 ml-2 my-8' onSubmit={handleCategorySubmit({name: categoryName})}>
              <input 
                placeholder='Category Name' 
                onChange={(e) => setCategoryName(e.target.value)} 
                value={categoryName}/>
              <button type="submit">SUMBIT</button>
              <button onClick={() => setShowNewCategoryForm(false)}>X</button>
            </form>
          ) : (
            <button className='ml-2 my-8' onClick={() => setShowNewCategoryForm(true)}>NEW ITEM CATEGORY</button>
          )}
        </div>
        <div className='flex flex-col w-1/4'>
          <div className={`${styles.stat} border-b`}>
            <p>Total Categories</p>
            <p>{categories.length}</p>
          </div>
          <div className={styles.stat}>
            <p>Total Items</p>
            <p>{items.length}</p>
          </div>
        </div>
      </div>
      <div className={styles.itemsContainer}>
        <div className={styles.itemInteraction}>
          <div className='flex gap-2'>
            <button onClick={() => setShowNewItemForm(true)}>NEW ITEM</button>
            <button disabled>OPTIONS</button>
          </div>
          <div className='flex gap-2'>
            <form className='flex'>
              <input placeholder='Search'/>
              <button type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
            <button className='rounded-full p-0 w-10 h-10'>
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>
        </div>
        <ItemList items={items}/>
      </div>
      {showNewItemForm && <NewItemModal setShowNewItemForm={setShowNewItemForm} setItems={setItems}/>}
    </div>
  );
}