// ✅ Store full user object in localStorage
export const storeUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// ✅ Get full user object
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ✅ Remove user data (on logout)
export const removeUser = () => {
  localStorage.removeItem("user");
};