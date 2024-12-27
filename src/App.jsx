import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BubbleSort from './algorithms/BubbleSort';
import QuickSort from './algorithms/QuickSort';
import MergeSort from './algorithms/MergeSort';
import Resources from './components/Resources';
import Factorial from './pages/Factorial';
import InsertionSort from './algorithms/InsertionSort';
import SelectionSort from './algorithms/SelectionSort';
import Fibonacci from './pages/Fibonacci';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bubble-sort" element={<BubbleSort />} />
        <Route path="/quick-sort" element={<QuickSort />} />
        <Route path="/merge-sort" element={<MergeSort />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/factorial" element={<Factorial />} />
        <Route path="/insertion-sort" element={<InsertionSort />} />
        <Route path="/selection-sort" element={<SelectionSort />} />
        <Route path="/fibonacci" element={<Fibonacci />} />
      </Routes>
    </Router>
  );
}

export default App;
