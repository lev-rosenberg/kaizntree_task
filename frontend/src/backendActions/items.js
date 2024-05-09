import axios from 'axios';
import Cookies from 'js-cookie';

export async function handleGetItems() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    }
  };
  // const body = JSON.stringify({
  //   'withCredentials': true,
  // });

  try {
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/api/items/`, config);
    if (result.data.error) { 
      console.error("error:", result.data.error);
      return false;
    } else {
      return result.data;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function handleCreateCategory(data) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    }
  };

  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/categories/`, data, config);
    if (result.data.error) { 
      console.error("error:", result.data.error);
      return false;
    } else {
      return result.data;
    }
  } catch (e) {
    console.error(e);
    return false;
  }

}

export async function handleCreateItem(data) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    }
  };

  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/items/`, data, config);
    if (result.data.error) { 
      console.error("error:", result.data.error);
      return false;
    } else {
      return result.data;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function handleGetCategories() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    }
  };

  try {
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories/`, config);
    if (result.data.error) { 
      console.error("error:", result.data.error);
      return false;
    } else {
      return result.data;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}