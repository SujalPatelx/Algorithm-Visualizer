import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(to bottom, #f4f6f9, #ffffff);
  border-radius: 12px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem;
  background-color: #1e90ff;
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #fff;
`;

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  color: #f0f0f0;
`;

const AlgorithmsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const AlgorithmCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: ${props => props.comingSoon ? 'not-allowed' : 'pointer'};
  position: relative;
  opacity: ${props => props.comingSoon ? 0.7 : 1};

  &:hover {
    transform: ${props => !props.comingSoon && 'translateY(-8px)'};
    box-shadow: ${props => !props.comingSoon && '0 8px 16px rgba(0, 0, 0, 0.2)'};
  }
`;

const CardTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const Complexity = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
  color: #888;
`;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  color: #1e90ff;
  margin: 2rem 0 1rem;
  text-align: left;
  font-weight: bold;
`;

const ComingSoonBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ff6347;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const algorithmCategories = [
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    algorithms: [
      {
        id: 'bubble',
        name: 'Bubble Sort',
        description: 'Simple and slow but educational sorting algorithm.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        path: '/bubble-sort'
      },
      {
        id: 'quick',
        name: 'Quick Sort',
        description: 'A faster, more efficient sorting technique.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n)',
        path: '/quick-sort'
      },
      {
        id: 'merge',
        name: 'Merge Sort',
        description: 'Divide and conquer sorting approach.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        path: '/merge-sort'
      },
      {
        id: 'insertion',
        name: 'Insertion Sort',
        description: 'Simple and efficient for small data sets.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        path: '/insertion-sort'
      },
      {
        id: 'selection',
        name: 'Selection Sort',
        description: 'Simple sorting algorithm with O(n²) complexity.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        path: '/selection-sort'
      }
    ]
  },
  {
    id: 'math',
    title: 'Mathematical Algorithms',
    algorithms: [
      {
        id: 'factorial',
        name: 'Factorial Calculator',
        description: 'Visualize factorial calculation with step-by-step animations.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        path: '/factorial'
      },
      {
        id: 'fibonacci',
        name: 'Fibonacci Sequence',
        description: 'Visualize the Fibonacci sequence generation with step-by-step animations.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        path: '/fibonacci'
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
        description: 'Shortest path algorithm for graphs.',
        timeComplexity: 'O(V² + E)',
        spaceComplexity: 'O(V)',
        path: '/dijkstra',
        comingSoon: true
      },
      {
        id: 'bfs',
        name: 'Breadth First Search',
        description: 'Explores all neighbors at the current depth.',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        path: '/bfs',
        comingSoon: true
      }
    ]
  },
  {
    id: 'cryptography',
    title: 'Cryptography Algorithms',
    algorithms: [
      {
        id: 'caesar',
        name: 'Caesar Cipher',
        description: 'A simple substitution cipher that shifts letters by a fixed amount.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        path: '/caesar-cipher'
      }
      // Add more cryptography algorithms here
    ]
  }
];

function Home() {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Header>
        <Title>Explore the World of Algorithms</Title>
        <Description>
          Dive into the world of algorithms with interactive visualizations, in-depth explanations, and hands-on practice. Start exploring today!
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
