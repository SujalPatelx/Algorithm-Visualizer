import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Controls from '../components/Controls';
import Visualizer from '../components/Visualizer';
import CodePanel from '../components/CodePanel';
import { getMergeSortSteps } from '../utils/sortingAlgorithms';
import StepExplanation from '../components/StepExplanation';
import QuizPanel from '../components/QuizPanel';

const AlgorithmContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
  min-height: calc(100vh - 64px);
`;

const VisualizerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.08);
  border: 1px solid #e8f0fe;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const QuizSection = styled(Section)`
  margin-top: 2rem;
`;

function MergeSort() {
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
    const steps = getMergeSortSteps([...array]);
    setHistory(steps);
    
    // Animation logic
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
        <Section>
          <SectionTitle>Array Visualization</SectionTitle>
          <Visualizer 
            array={history[currentStep]?.array || array}
            comparingIndices={history[currentStep]?.comparing || []}
          />
          <StepExplanation 
            algorithm="merge"
            currentStep={currentStep}
            history={history}
          />
        </Section>
        <Section>
          <SectionTitle>Algorithm Code</SectionTitle>
          <CodePanel 
            algorithm="merge"
            currentStep={currentStep}
            comparing={history[currentStep]?.comparing || []}
          />
        </Section>
        <QuizSection>
          <SectionTitle>Test Your Knowledge</SectionTitle>
          <QuizPanel algorithm="merge" />
        </QuizSection>
      </VisualizerContainer>
    </AlgorithmContainer>
  );
}

export default MergeSort;