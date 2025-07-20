import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WeddingApp from './components/WeddingApp';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeddingApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;