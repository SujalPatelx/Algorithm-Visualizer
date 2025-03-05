import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Controls from '../components/Controls';
import Visualizer from '../components/Visualizer';
import CodePanel from '../components/CodePanel';
import { getInsertionSortSteps } from '../utils/sortingAlgorithms';
import StepExplanation from '../components/StepExplanation';
import QuizPanel from '../components/QuizPanel';

const AlgorithmContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 64px);
  background-color: var(--background-color);
`;

const VisualizerWrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const VisualizerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 600px), 1fr));
  gap: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.08);
  border: 1px solid #e8f0fe;
  min-height: 450px;
  display: flex;
  flex-direction: column;

  &:first-child {
    grid-column: ${props => props.arraySize > 8 ? '1 / -1' : 'auto'};
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const AlgorithmInfo = styled.div`
  margin-bottom: 2rem;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: var(--text-color);
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Complexity = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  
  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-color);
    font-size: 0.9rem;
    
    &::before {
      content: '•';
      color: var(--primary-color);
    }
  }
`;

const QuizSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.08);
  border: 1px solid #e8f0fe;
  min-height: 450px;
  display: flex;
  flex-direction: column;
`;

function InsertionSort() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [arraySize, setArraySize] = useState(5);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  const generateNewArray = () => {
    const newArray = Array.from({ length: arraySize }, 
      () => Math.floor(Math.random() * 100) + 10
    );
    setArray(newArray);
    setHistory([{ array: [...newArray], comparing: [] }]);
    setCurrentStep(0);
    setIsSorting(false);
    setIsRunning(false);
  };

  const runAlgorithm = async () => {
    setIsSorting(true);
    setIsRunning(true);
    const steps = getInsertionSortSteps([...array]);
    setHistory(steps);
    
    for (let i = 0; i < steps.length && isRunning; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000 - speed * 9));
      
      if (i === steps.length - 1) {
        setIsRunning(false);
      }
    }
  };

  useEffect(() => {
    let timeoutId;
    if (isRunning && currentStep < history.length - 1) {
      timeoutId = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000 - speed * 9);
    } else if (currentStep === history.length - 1) {
      setIsRunning(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentStep, isRunning, speed, history.length]);

  const pauseAlgorithm = () => {
    setIsRunning(false);
  };

  const resumeAlgorithm = () => {
    setIsRunning(true);
  };

  return (
    <AlgorithmContainer>
      <AlgorithmInfo>
        <Title>Insertion Sort Visualization</Title>
        <Description>
          Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time.
          It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.
        </Description>
        <Complexity>
          <span>Time Complexity: O(n²)</span>
          <span>Space Complexity: O(1)</span>
        </Complexity>
      </AlgorithmInfo>

      <VisualizerWrapper>
        <Controls 
          generateNewArray={generateNewArray}
          speed={speed}
          setSpeed={setSpeed}
          arraySize={arraySize}
          setArraySize={setArraySize}
          runAlgorithm={runAlgorithm}
          pauseAlgorithm={pauseAlgorithm}
          resumeAlgorithm={resumeAlgorithm}
          nextStep={() => setCurrentStep(prev => Math.min(prev + 1, history.length - 1))}
          previousStep={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
          isSorting={isSorting}
          isRunning={isRunning}
          currentStep={currentStep}
          totalSteps={history.length}
        />
        
        <VisualizerContainer>
          <Section arraySize={arraySize}>
            <SectionTitle>Array Visualization</SectionTitle>
            <Visualizer 
              array={history[currentStep]?.array || array}
              comparingIndices={history[currentStep]?.comparing || []}
            />
            <StepExplanation 
              algorithm="insertion"
              currentStep={currentStep}
              history={history}
            />
          </Section>
          <Section>
            <SectionTitle>Algorithm Code</SectionTitle>
            <CodePanel 
              algorithm="insertion"
              currentStep={currentStep}
              comparing={history[currentStep]?.comparing || []}
            />
          </Section>
          <QuizSection>
            <SectionTitle>Test Your Knowledge</SectionTitle>
            <QuizPanel algorithm="insertion" />
          </QuizSection>
        </VisualizerContainer>
      </VisualizerWrapper>
    </AlgorithmContainer>
  );
}

export default InsertionSort; 