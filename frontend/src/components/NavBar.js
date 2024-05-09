import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { useContext } from 'react';
import { Context } from '../context/authContext';
import { handleLogout } from '../backendActions/userAuth';

export default function NavBar() {
  const { dispatch } = useContext(Context);

  async function handleLogoutClick() {
    const result = await handleLogout();
    if (result) {
      dispatch({ type: 'LOGGED_IN', payload: false });
      localStorage.removeItem('auth-kaizntree');
    };
  }

  return (
    //note: these would be links to the respective pages. right now they are just placeholders
    <nav className={styles.navContainer}>
      <ul>
        <li>Home</li>
        <Link to="/"><li>Items</li></Link>
        <li>Stock</li>
        <li>Build</li>
        <li>Customers</li>
        <li>Suppliers</li>
        <li>Manufacturers</li>
        <li>Purchase Orders</li>
        <li>Reports</li>
      </ul>
      <ul>
        <li>Help!</li>
        <li>Integrations</li>
        <li onClick={handleLogoutClick}>Logout</li>
        <li>My Profile</li>
      </ul>
    </nav>
  );
}