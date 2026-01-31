import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Layout.scss';

export const Layout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/invoices', label: 'Facturas', icon: '📄' },
    // { path: '/clients', label: 'Clientes', icon: '👥' },
    { path: '/settings', label: 'Configuración', icon: '⚙️' },
  ];

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1 className="brand-title">Invoice Creator</h1>
        </div>
        
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {/* <span className="nav-icon">{item.icon}</span> */}
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; 2026 Invoice Creator - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Layout;
