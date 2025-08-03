import { useEffect } from 'react';

function Logout() {
  useEffect(() => {
    localStorage.removeItem('token'); // 🧼 Clear the JWT
    window.location.href = '/login';  // 🔁 Redirect to login
  }, []);

  return null; // No UI needed
}

export default Logout;