export const getUserData = () => {
  const data = localStorage.getItem("dataUser");
  return data ? JSON.parse(data) : null;
};

export const setUserData = (userData) => {
  localStorage.setItem("dataUser", JSON.stringify(userData));
};

export const removeUserData = () => {
  localStorage.removeItem("dataUser");
};
