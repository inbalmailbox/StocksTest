// src/components/Sidebar.tsx
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      mode="inline"
    >
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/stocks">Stocks</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/portfolio">Portfolio</Link>
      </Menu.Item>
      {/* Add more menu items as needed */}
    </Menu>
  );
};

export default Sidebar;
