import React from 'react';
import styled from 'styled-components';

const ExplanationContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.08);
  border: 1px solid #e8f0fe;
  margin-top: 1rem;
`;

const StepTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const ExplanationText = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const HighlightedValue = styled.span`
  background: var(--secondary-color);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9em;
`;

function StepExplanation({ algorithm, currentStep, history }) {
  const getExplanation = () => {
    if (!history[currentStep]) return null;
    
    const { comparing, swapped } = history[currentStep];
    
    switch (algorithm) {
      case 'bubble':
        if (comparing.length === 0) {
          return "Initial array state";
        }
        const [i, j] = comparing;
        if (swapped) {
          return `Swapped elements ${history[currentStep].array[j]} and ${history[currentStep].array[i]} because ${history[currentStep-1]?.array[i]} > ${history[currentStep-1]?.array[j]}`;
        }
        return `Comparing elements at positions ${i} and ${j}: ${history[currentStep].array[i]} ≤ ${history[currentStep].array[j]}, no swap needed`;
      
      // Add cases for other algorithms
      default:
        return null;
    }
  };

  return (
    <ExplanationContainer>
      <StepTitle>Step {currentStep + 1} Explanation</StepTitle>
      <ExplanationText>{getExplanation()}</ExplanationText>
    </ExplanationContainer>
  );
}

export default StepExplanation;
