export const clearCookie = (name) => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
  };
  
export  const clearAccessToken = () => {
    clearCookie('accessToken');
  };