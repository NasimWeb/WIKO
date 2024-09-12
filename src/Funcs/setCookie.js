export const setCookie = (name, value, hours) => {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
  };
  
export  const setAccessToken = (token) => {
    setCookie('accessToken', token, 1); // 1 hour expiration
  };

