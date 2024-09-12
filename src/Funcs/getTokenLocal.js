const getTokenLocal = (name) => {
  const token = localStorage.getItem(name);
  if (token) {
    return token;
  }
}

export default getTokenLocal