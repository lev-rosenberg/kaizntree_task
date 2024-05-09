import axios from 'axios';
import Cookies from 'js-cookie';

export async function handleLogin(username, password) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'), // This is the important for any non-GET request. this is good for security
    }
  };
  const body = JSON.stringify({username: username, password: password});
  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/login/`, body, config);
    if (result.data.error) { 
      console.error("error:", result.data.error);
      return false;
    } else {
      console.log('Login successful');
      return true;
    }
  } catch (e) {
    console.error(e);
    return false;
  }

}

export async function handleSignUp(username, password) {

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    }
  };
  const body = JSON.stringify({username: username, password: password});
  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/signup/`, body, config);
    if (result.data.error) { 
      console.error("error:", result.data.error);
      return false;
    } else {
      console.log('User created');
      return true;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function handleLogout() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    }
  };
  const body = JSON.stringify({
    'withCredentials': true,
  });

  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/logout/`, body, config);
    if (result.data.error) { 
      console.error("error:", result.data.error);
      return false;
    } else {
      console.log('Logout successful');
      return true;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}