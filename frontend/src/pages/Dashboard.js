import React, { useEffect, useState } from 'react';
import { handleGetItems } from '../backendActions/items';
import styles from '../styles/dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faEtsy, faShopify } from '@fortawesome/free-brands-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
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

  function Icons({tags}) {
    const icons = {
      Etsy: faEtsy,
      Shopify: faShopify,
      Square: faSquare,
    }
    const tagList = tags.split(' ');
    console.log(tagList)
    return tagList.map((tag, index) => {
      return (
        <FontAwesomeIcon key={index} icon={icons[tag]} />
      )
    })
  }
  return (
    <div className={styles.dashboardContainer}>
      <div className='flex justify-between pb-5'>
        <div>
          <h1>Item Dashboard</h1>
          <p>All items</p>
          <button className='ml-2 my-8'>NEW ITEM CATEGORY</button>
        </div>
        <div className='flex flex-col w-1/4'>
          <div className={`${styles.stat} border-b`}>
            <p>Total Categories</p>
            <p>3</p>
          </div>
          <div className={styles.stat}>
            <p>Total Items</p>
            <p>4</p>
          </div>
        </div>
      </div>
      
      <div className={styles.itemsContainer}>
        <div className={styles.itemInteraction}>
          <div className='flex gap-2'>
            <button>NEW ITEM</button>
            <button disabled>OPTIONS</button>
          </div>
          <div className='flex gap-2'>
            <form className='flex'>
              <input placeholder='Search'/>
              <button type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
            <button>
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>
        </div>
        <ul className={styles.itemsList}>
          <div>
            <li className={`${styles.item} font-bold`}>
              <input type="checkbox" />
              <span>SKU</span>
              <span>Name</span>
              <span>Icons</span>
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
                  <span className='fakeLink'>{item.name}</span>
                  <span>
                    <span className='flex gap-1'>
                      <Icons tags={item.tags}/>
                    </span>
                  </span>
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