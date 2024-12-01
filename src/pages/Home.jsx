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
  cursor: ${props => props.comingSoon ? 'not-allowed' : 'pointer'};
  position: relative;
  opacity: ${props => props.comingSoon ? 0.7 : 1};

  &:hover {
    transform: ${props => !props.comingSoon && 'translateY(-5px)'};
    box-shadow: ${props => !props.comingSoon && '0 6px 12px rgba(0, 0, 0, 0.15)'};
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

const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text-color);
  margin: 2rem 0 1rem;
  text-align: left;
`;

const ComingSoonBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--warning-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const algorithmCategories = [
  {
    id: 'sorting',
    title: 'Sorting',
    algorithms: [
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
    ]
  },
  {
    id: 'array',
    title: 'Array Operations',
    algorithms: [
      {
        id: 'search',
        name: 'Binary Search',
        description: 'An efficient search algorithm that finds the position of a target value within a sorted array.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        path: '/binary-search',
        comingSoon: true
      },
      {
        id: 'rotation',
        name: 'Array Rotation',
        description: 'Algorithm to rotate an array by a given number of positions.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        path: '/array-rotation',
        comingSoon: true
      }
    ]
  },
  {
    id: 'graph',
    title: 'Graph Algorithms',
    algorithms: [
      {
        id: 'dijkstra',
        name: "Dijkstra's Algorithm",
        description: 'An algorithm for finding the shortest paths between nodes in a graph.',
        timeComplexity: 'O(V² + E)',
        spaceComplexity: 'O(V)',
        path: '/dijkstra',
        comingSoon: true
      },
      {
        id: 'bfs',
        name: 'Breadth First Search',
        description: 'A graph traversal algorithm that explores all vertices at the present depth before moving on to vertices at the next depth level.',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        path: '/bfs',
        comingSoon: true
      }
    ]
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
          how different algorithms work through step-by-step visualization. 
          Select an algorithm below to get started.
        </Description>
      </Header>

      {algorithmCategories.map((category) => (
        <div key={category.id}>
          <CategoryTitle>{category.title}</CategoryTitle>
          <AlgorithmsGrid>
            {category.algorithms.map((algo) => (
              <AlgorithmCard 
                key={algo.id}
                onClick={() => !algo.comingSoon && navigate(algo.path)}
                comingSoon={algo.comingSoon}
              >
                <CardTitle>{algo.name}</CardTitle>
                <CardDescription>{algo.description}</CardDescription>
                <Complexity>
                  <div>Time Complexity: {algo.timeComplexity}</div>
                  <div>Space Complexity: {algo.spaceComplexity}</div>
                </Complexity>
                {algo.comingSoon && (
                  <ComingSoonBadge>Coming Soon</ComingSoonBadge>
                )}
              </AlgorithmCard>
            ))}
          </AlgorithmsGrid>
        </div>
      ))}
    </HomeContainer>
  );
}

export default Home; 