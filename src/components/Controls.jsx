import React from 'react';
import styled from 'styled-components';

const ControlPanel = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.08);
  border: 1px solid #e8f0fe;
  margin-bottom: 24px;
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(74, 144, 226, 0.15);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StepInfo = styled.span`
  color: var(--text-color);
  font-weight: 500;
`;

const StatusMessage = styled.div`
  color: var(--success-color);
  font-weight: 500;
`;

const Controls = ({
  generateNewArray,
  speed,
  setSpeed,
  arraySize,
  setArraySize,
  runAlgorithm,
  pauseAlgorithm,
  resumeAlgorithm,
  nextStep,
  previousStep,
  isSorting,
  isRunning,
  currentStep,
  totalSteps
}) => {
  return (
    <ControlPanel>
      <ControlGroup>
        <Button 
          onClick={generateNewArray}
          disabled={isSorting && isRunning}
        >
          Generate New Array
        </Button>
      </ControlGroup>

      <ControlGroup>
        <span>Array Size:</span>
        <input 
          type="range"
          min="3"
          max="20"
          value={arraySize}
          onChange={(e) => setArraySize(parseInt(e.target.value))}
          disabled={isSorting && isRunning}
        />
        <span>{arraySize}</span>
      </ControlGroup>

      <ControlGroup>
        <span>Speed:</span>
        <input 
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
        />
        <span>{speed}</span>
      </ControlGroup>

      <ControlGroup>
        {!isSorting ? (
          <Button onClick={runAlgorithm}>
            Start Sorting
          </Button>
        ) : isRunning ? (
          <Button onClick={pauseAlgorithm}>
            Pause
          </Button>
        ) : (
          <Button onClick={resumeAlgorithm}>
            Resume
          </Button>
        )}
        
        <Button 
          onClick={previousStep}
          disabled={currentStep === 0 || isRunning}
        >
          Previous
        </Button>
        <Button 
          onClick={nextStep}
          disabled={currentStep === totalSteps - 1 || isRunning}
        >
          Next
        </Button>
        
        <StepInfo>
          Step: {currentStep + 1} / {totalSteps}
        </StepInfo>
        
        {currentStep === totalSteps - 1 && !isRunning && (
          <StatusMessage>
            Sorting Complete!
          </StatusMessage>
        )}
      </ControlGroup>
    </ControlPanel>
  );
};

export default Controls; 