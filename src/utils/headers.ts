const token = localStorage.getItem('token');

export const headers = {
  'Authorization': `Bearer ${token}`
};

export const authorization = `Bearer ${token}`;
