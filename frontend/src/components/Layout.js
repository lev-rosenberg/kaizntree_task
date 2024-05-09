import React from 'react';
import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <div className='h-dvh p-2'>
      <div className="flex h-full border-2 border-blue-400">
        <NavBar />
        <main className='w-full'>{children}</main>
      </div>
    </div>
    
  );
}