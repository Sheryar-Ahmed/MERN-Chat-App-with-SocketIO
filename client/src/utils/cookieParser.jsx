export const getCookieValue = (name) => {
  const cookies = document.cookie.split('; ');
  console.log("cookies", cookies);
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
  
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
  
    return null;
  };

  