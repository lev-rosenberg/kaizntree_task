import React from 'react';
import styles from '../styles/dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEtsy, faShopify } from '@fortawesome/free-brands-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

export function ItemList({ items }) {

  function Icons({tags}) {
    const icons = {
      Etsy: faEtsy,
      Shopify: faShopify,
      Square: faSquare,
    }
    const tagList = tags.split(' ').sort();
    return tagList.map((tag, index) => {
      return (
        <FontAwesomeIcon key={index} icon={icons[tag]} />
      )
    })
  }
  return (
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
  );
}