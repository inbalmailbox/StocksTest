// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from '../components/MainLayout';
import StockList from '../pages/StockList'; // Adjust paths as necessary
import StockDetails from '../pages/StockDetails'; // Adjust paths as necessary

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<StockList />} />
          <Route path="/stocks/:symbol" element={<StockDetails />} />
          {/* Add other routes here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
