import React, { useState, useEffect } from 'react'
import axios from 'axios';

export function CSRFToken() {
  const [csrfToken, setCsrfToken] = useState('');

  function getCookie(name) {
    let cookieValue = '';
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    console.log('cookieValue:', cookieValue);
    return cookieValue;
  }

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/csrf_cookie/`);
        console.log('result:', result.data.success);
      } catch(e) {
          console.error(e);
      }
      setCsrfToken(getCookie('csrftoken'));
    }
    fetchCsrfToken();
  }, []);
  return (
    <input type='hidden' name='csrfmiddlewaretoken' value={csrfToken} />
  )
}