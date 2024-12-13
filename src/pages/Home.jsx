import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 50px auto;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #4A90E2;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: #333;
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.8;
  font-weight: 500;
`;

const AlgorithmsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const AlgorithmCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: ${props => props.comingSoon ? 'not-allowed' : 'pointer'};
  position: relative;
  opacity: ${props => props.comingSoon ? 0.6 : 1};

  &:hover {
    transform: ${props => !props.comingSoon && 'translateY(-10px)'};
    box-shadow: ${props => !props.comingSoon && '0 12px 24px rgba(0, 0, 0, 0.15)'};
  }
`;

const CardTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CardDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
`;

const Complexity = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
  color: #555;
`;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  color: #4A90E2;
  margin: 3rem 0 1.5rem;
  text-align: left;
  border-left: 5px solid #4A90E2;
  padding-left: 1rem;
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
  font-size: 0.9rem;
  font-weight: bold;
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
        <Title>Explore the World of Algorithms</Title>
        <Description>
          Step into the fascinating world of algorithms! Discover, learn, and visualize step-by-step how these fundamental concepts work. Dive into categories like Sorting, Searching, and Graph Algorithms.
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
                  <div><strong>Time:</strong> {algo.timeComplexity}</div>
                  <div><strong>Space:</strong> {algo.spaceComplexity}</div>
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
