"use client"

import { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Repeat, FastForward } from 'lucide-react'
import QuizPanel from '../components/QuizPanel'

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  font-family: system-ui, -apple-system, sans-serif;
`

const Title = styled.h1`
  color: #1f2937;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
`

const Subtitle = styled.p`
  color: #4b5563;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.5;
`

const VisualizerContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

const VisualizerTitle = styled.h2`
  color: #000;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 40px;
  text-align: center;
`

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`

const StyledInput = styled.input`
  width: 64px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  text-align: center;
  font-size: 1.5rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 500;
  cursor: pointer;
  background: ${props => props.primary ? '#000' : '#fff'};
  border: 1px solid ${props => props.primary ? '#000' : '#e5e7eb'};
  color: ${props => props.primary ? '#fff' : '#000'};

  &:hover:not(:disabled) {
    background: ${props => props.primary ? '#2563eb' : '#f9fafb'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 140px;
`

const SliderInput = styled.input`
  flex: 1;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
`

const SpeedLabel = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  min-width: 32px;
`

const VisualizationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 64px;
  margin: ${props => props.isActive ? '24px 0' : '0'};
  height: ${props => props.isActive ? 'auto' : '0'};
  opacity: ${props => props.isActive ? 1 : 0};
  overflow: hidden;
  transition: all 0.3s ease;
`

const NumbersColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  min-height: ${props => props.isActive ? '200px' : '0'};
`

const StepsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: ${props => props.isActive ? '200px' : '0'};
`

const NumberBox = styled.div`
  font-size: 3rem;
  font-family: monospace;
  font-weight: 700;
  color: ${props => props.isActive ? '#10b981' : '#d1d5db'};
  transition: all 0.3s ease;
  transform: scale(${props => props.isActive ? 1.1 : 0.9});
  opacity: ${props => props.isActive ? 1 : 0.8};
`

const StepBox = styled.div`
  font-family: monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: #10b981;
  opacity: ${props => props.showStep ? 1 : 0};
  transform: scale(${props => props.showStep ? 1 : 0.9});
  transition: all 0.3s ease;

  span.number {
    font-weight: 700;
    color: #10b981;
  }
`

const ResultBox = styled.div`
  margin-top: 16px;
  font-size: 1.75rem;
  font-family: monospace;
  font-weight: 700;
  color: #3b82f6;
  text-align: left;
`

const FeaturesContainer = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
`

const FeaturesTitle = styled.h3`
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
`

const FeaturesList = styled.ul`
  color: #4b5563;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  
  li {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    color: #6b7280;
    
    &:before {
      content: "•";
      margin-right: 8px;
    }
  }
`

const Section = styled.div`
  margin-top: 2rem;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
`

const QuizSection = styled(Section)`
  margin-top: 2rem;
`;

export default function FactorialVisualizer() {
  const [input, setInput] = useState("5")
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [isCalculating, setIsCalculating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [finalResult, setFinalResult] = useState(null)
  const [autoReplay, setAutoReplay] = useState(false)
  const [speed, setSpeed] = useState(1)
  const timeoutRef = useRef(null)

  const calculateSteps = (n) => {
    const numbers = []
    let runningTotal = n

    for (let i = n; i >= 1; i--) {
      numbers.push({
        number: i,
        runningTotal: runningTotal,
        isActive: false,
        showMultiplication: false,
      })
      if (i > 1) {
        runningTotal *= i - 1
      }
    }
    return numbers
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStepIndex = currentStep + 1
      setCurrentStep(nextStepIndex)
      
      const updatedSteps = [...steps]
      updatedSteps[nextStepIndex] = {
        ...updatedSteps[nextStepIndex],
        isActive: true,
        showMultiplication: true,
      }
      setSteps(updatedSteps)

      if (nextStepIndex === steps.length - 1) {
        setFinalResult(steps[steps.length - 1].runningTotal)
        if (autoReplay) {
          timeoutRef.current = setTimeout(() => {
            handleReset()
            calculateFactorial(parseInt(input))
          }, 2000 / speed)
        }
      }
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1
      setCurrentStep(prevStepIndex)
      
      const updatedSteps = [...steps]
      updatedSteps[currentStep] = {
        ...updatedSteps[currentStep],
        isActive: false,
        showMultiplication: false,
      }
      setSteps(updatedSteps)
      setFinalResult(null)
    }
  }

  const calculateFactorial = (n) => {
    setIsCalculating(true)
    setIsPaused(false)
    setSteps(calculateSteps(n))
    setCurrentStep(-1)
    setFinalResult(null)
  }

  const runAnimation = () => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        nextStep()
      }, 1500 / speed)
    }
  }

  useEffect(() => {
    if (isCalculating && !isPaused && currentStep < steps.length - 1) {
      runAnimation()
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentStep, isPaused, isCalculating, speed])

  const handleCalculate = () => {
    const num = parseInt(input)
    if (!isNaN(num) && num >= 0 && num <= 10) {
      calculateFactorial(num)
    }
  }

  const handleReset = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setSteps([])
    setCurrentStep(-1)
    setIsCalculating(false)
    setIsPaused(false)
    setFinalResult(null)
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  return (
    <Container>

      <VisualizerContainer>
        <VisualizerTitle>Factorial Algorithm Visualizer</VisualizerTitle>
        
        <ControlsContainer>
          <ControlRow>
            <StyledInput
              type="number"
              min="0"
              max="10"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <StyledButton primary onClick={handleCalculate} disabled={isCalculating && !isPaused}>
              <Play size={16} />
              Start
            </StyledButton>
            <StyledButton onClick={togglePause} disabled={!isCalculating}>
              {isPaused ? <Play size={16} /> : <Pause size={16} />}
              {isPaused ? "Resume" : "Pause"}
            </StyledButton>
            <StyledButton onClick={handleReset}>
              <RotateCcw size={16} />
              Reset
            </StyledButton>
          </ControlRow>

          <ControlRow>
            <StyledButton onClick={previousStep} disabled={currentStep <= 0} size="icon">
              <SkipBack size={16} />
            </StyledButton>
            <StyledButton onClick={nextStep} disabled={currentStep >= steps.length - 1} size="icon">
              <SkipForward size={16} />
            </StyledButton>
            <StyledButton 
              onClick={() => setAutoReplay(!autoReplay)}
              primary={autoReplay}
            >
              <Repeat size={16} />
              Auto Replay
            </StyledButton>
            <SliderContainer>
              <FastForward size={16} className="text-gray-500" />
              <SliderInput
                type="range"
                min={0.5}
                max={2}
                step={0.5}
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
              />
              <SpeedLabel>{speed}x</SpeedLabel>
            </SliderContainer>
          </ControlRow>
        </ControlsContainer>

        <VisualizationContainer isActive={steps.length > 0}>
          <NumbersColumn isActive={steps.length > 0}>
            {steps.map((step, index) => (
              <NumberBox
                key={index}
                isActive={step.isActive}
                isCurrent={index === currentStep}
              >
                {step.number}
              </NumberBox>
            ))}
          </NumbersColumn>

          <StepsColumn isActive={steps.length > 0}>
            {steps.map((step, index) => (
              <StepBox
                key={index}
                isActive={step.isActive}
                showStep={step.showMultiplication}
              >
                {index === 0 ? (
                  <div>Start with: <span className="number">{step.number}</span></div>
                ) : step.showMultiplication ? (
                  <div>
                    <span className="number">{steps[index - 1].runningTotal}</span> × <span className="number">{step.number}</span> = <span className="number">{step.runningTotal}</span>
                  </div>
                ) : null}
              </StepBox>
            ))}
            
            {finalResult !== null && (
              <ResultBox>
                {input}! = {finalResult}
              </ResultBox>
            )}
          </StepsColumn>
        </VisualizationContainer>
        
        <Section>
          <SectionTitle>Test Your Knowledge</SectionTitle>
          <QuizPanel algorithm="factorial" />
        </Section>
      </VisualizerContainer>
    </Container>
  )
}