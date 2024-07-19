import { useState, useEffect } from 'react';
import User from '@/dto/user';

export default function useUser() {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    /**
     * Fetches the user data from local storage and sets the user state.
     */
    const storedUser = localStorage.getItem('user');
    if (storedUser !== 'undefined' && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return { user };
}
