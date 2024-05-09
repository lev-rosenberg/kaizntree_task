import React, { useEffect, useState } from 'react';
import { handleGetItems } from '../backendActions/items';
import styles from '../styles/dashboard.module.css';
export default function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getItems() {
      const result = await handleGetItems();
      if (result) {
        setItems(result) 
      }
    }
    getItems()
  }, []);
  return (
    <div className={styles.dashboardContainer}>
      <h1>Item Dashboard</h1>
      <p>All items</p>
      <div className={styles.itemsContainer}>
        <div className={styles.itemInteraction}>
          <div className='flex gap-2'>
            <button>NEW ITEM</button>
            <button className='bg-gray-200 text-gray-500' style={{backgroundColor: "#E5E5E5", color: "#4E4E4E"}}>OPTIONS</button>
          </div>
          <div className='flex gap-2'>
            <form className='flex'>
              <input placeholder='Search'/>
              <button type="submit">search</button>
            </form>
            <button>Filter</button>
          </div>
        </div>
        <ul className={styles.itemsList}>
          <div>
            <li className={`${styles.item} font-bold`}>
              <input type="checkbox" />
              <span>SKU</span>
              <span>Name</span>
              <span>Tags</span>
              <span>Category</span>
              <span>In Stock</span>
              <span>Available Stock</span>
            </li>
          </div>
          {items.map((item, index) => {
            return (
              <div className='border-t-2 border-slate-200'>
                <li key={index} className={styles.item}>
                  <input type="checkbox" />
                  <span>{item.sku}</span>
                  <span>{item.name}</span>
                  <span>{item.tags}</span>
                  <span>{item.category}</span>
                  <span>{item.in_stock ? 'True' : 'False'}</span>
                  <span>{item.available_stock}</span>
                </li>
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  );
}