import { useEffect, useState } from 'react';

type MenuItem = {
  key: string;
  label: string;
  path: string;
};

type User = {
  name: string;
  isAdmin: boolean;
};

const decodeToken = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload as User;
  } catch {
    return null;
  }
};

const useMenuItems = (): MenuItem[] => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let user: User | null = null;

    if (token) {
      user = decodeToken(token);
    }

    const items: MenuItem[] = [];

    if (!user) {
      items.push(
        { key: 'home', label: 'Inicio', path: '/' },
        { key: 'login', label: 'Iniciar sesión', path: '/login' },
        { key: 'register', label: 'Registrarse', path: '/register' }
      );
    } else {
      items.push(
        { key: 'home', label: 'Inicio', path: '/' },
        { key: 'profile', label: 'Perfil', path: '/profile' },
        { key: 'logout', label: 'Cerrar sesión', path: '/logout' }
      );

      if (user.isAdmin) {
        items.push({ key: 'admin', label: 'Panel de admin', path: '/admin' });
      }
    }

    setMenuItems(items);
  }, []);

  return menuItems;
};

export default useMenuItems;
