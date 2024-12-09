import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BubbleSort from './algorithms/BubbleSort';
import QuickSort from './algorithms/QuickSort';
import MergeSort from './algorithms/MergeSort';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bubble-sort" element={<BubbleSort />} />
        <Route path="/quick-sort" element={<QuickSort />} />
        <Route path="/merge-sort" element={<MergeSort />} />
      </Routes>
    </Router>
  );
}

export default App;
