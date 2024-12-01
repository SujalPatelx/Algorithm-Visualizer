import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: var(--text-color);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const AlgorithmsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const AlgorithmCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: var(--text-color);
  line-height: 1.5;
`;

const Complexity = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
  color: #666;
`;

const algorithms = [
  {
    id: 'bubble',
    name: 'Bubble Sort',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    path: '/bubble-sort'
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    description: 'An efficient, in-place sorting algorithm that uses a divide-and-conquer strategy to sort elements quickly.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    path: '/quick-sort'
  },
  {
    id: 'merge',
    name: 'Merge Sort',
    description: 'A divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    path: '/merge-sort'
  }
];

function Home() {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Header>
        <Title>Algorithm Visualizer</Title>
        <Description>
          Welcome to Algorithm Visualizer! This interactive tool helps you understand 
          how different sorting algorithms work through step-by-step visualization. 
          Select an algorithm below to get started.
        </Description>
      </Header>

      <AlgorithmsGrid>
        {algorithms.map((algo) => (
          <AlgorithmCard 
            key={algo.id}
            onClick={() => navigate(algo.path)}
          >
            <CardTitle>{algo.name}</CardTitle>
            <CardDescription>{algo.description}</CardDescription>
            <Complexity>
              <div>Time Complexity: {algo.timeComplexity}</div>
              <div>Space Complexity: {algo.spaceComplexity}</div>
            </Complexity>
          </AlgorithmCard>
        ))}
      </AlgorithmsGrid>
    </HomeContainer>
  );
}

export default Home; 