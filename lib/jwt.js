const tokenExpired = exp => {
  const currentDate = new Date().getTime();
  const expDate = new Date(exp * 1000).getTime();

  return currentDate > expDate;
};

export { tokenExpired };
