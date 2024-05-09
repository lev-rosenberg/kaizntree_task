import React, { useState } from 'react';
import { handleCreateItem } from '../backendActions/items';

export function NewItemModal({ setShowNewItemForm, setItems }) {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [inStock, setInStock] = useState(false);
  const [availableStock, setAvailableStock] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      sku,
      name,
      category,
      tags,
      in_stock: inStock,
      available_stock: availableStock,
    }
    const result = await handleCreateItem(data);
    if (result) {
      setShowNewItemForm(false);
      setItems((prevItems) => [...prevItems, result.success]);
    }
  }
  
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg w-1/2'>
        <div className='flex w-full justify-between'>
          <h1>Create New Item</h1>
          <button 
            onClick={() => setShowNewItemForm(false)}
            className='rounded-full p-0 w-10 h-10'
          >
            X
          </button>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
        >
          <label>SKU</label>
          <input 
            type="text" 
            onChange={(e) => setSku(e.target.value)}
            value={sku}
            required
          />
          <label>Name</label>
          <input 
            type="text" 
            onChange={(e) => setName(e.target.value)} 
            value={name}
            required
          />
          <label>Category</label>
          <input 
            type="text" 
            onChange={(e) => setCategory(e.target.value)}
            value={category} 
            required
          />
          <label>Tags</label>
          <input 
            type="text" 
            onChange={(e) => setTags(e.target.value)} 
            value={tags}
            required
          />
          <label>In Stock</label>
          <input 
            className='block'
            type="checkbox"
            onChange={(e) => setInStock(e.target.checked)}
            value={inStock}
          />
          <label>Available Stock</label>
          <input 
            type="text" 
            onChange={(e) => setAvailableStock(e.target.value)} 
            value={availableStock}
            required
          />
          <button type="submit" className='mt-4'>CREATE ITEM</button>
        </form>
      </div>
    </div>
  )
}