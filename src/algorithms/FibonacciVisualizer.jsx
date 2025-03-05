import { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Repeat, FastForward } from 'lucide-react'
import QuizPanel from '../components/QuizPanel';

// Reusing styled components from FactorialVisualizer
const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  font-family: system-ui, -apple-system, sans-serif;
`

const VisualizerContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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
  gap: 20px;
  padding: 24px;
  background: #f9fafb;
  border-radius: 12px;
  margin-bottom: 32px;
  border: 1px solid #e5e7eb;
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
  background: ${props => props.primary ? '#10b981' : '#fff'};
  border: 1px solid ${props => props.primary ? '#10b981' : '#e5e7eb'};
  color: ${props => props.primary ? '#fff' : '#374151'};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${props => props.primary ? '#059669' : '#f9fafb'};
    transform: translateY(-1px);
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
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin: ${props => props.isActive ? '24px 0' : '0'};
  height: ${props => props.isActive ? 'auto' : '0'};
  opacity: ${props => props.isActive ? 1 : 0};
  overflow: hidden;
  transition: all 0.3s ease;
`

const FibonacciTree = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 20px;
`

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 600px;
`

const NumberBox = styled.div`
  font-size: 2.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  padding: 16px 32px;
  border-radius: 12px;
  background: ${props => props.isActive ? '#10b981' : '#f3f4f6'};
  color: ${props => props.isActive ? '#fff' : '#6b7280'};
  transition: all 0.4s ease;
  transform: scale(${props => props.isActive ? 1.1 : 1});
  width: 100%;
  text-align: center;
  box-shadow: ${props => props.isActive ? '0 4px 12px rgba(16, 185, 129, 0.2)' : 'none'};
`

const StepBox = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.25rem;
  font-weight: 500;
  color: #4b5563;
  background: ${props => props.showStep ? '#f0fdf4' : 'transparent'};
  padding: 12px 24px;
  border-radius: 8px;
  opacity: ${props => props.showStep ? 1 : 0};
  transform: translateY(${props => props.showStep ? '0' : '10px'});
  transition: all 0.4s ease;
  width: 100%;
  text-align: center;
  border: ${props => props.showStep ? '1px solid #d1fae5' : 'none'};
`

const ResultBox = styled.div`
  margin-top: 24px;
  font-size: 2rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  color: #10b981;
  text-align: center;
  padding: 24px;
  background: #ecfdf5;
  border-radius: 12px;
  border: 2px solid #d1fae5;
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
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

const QuizContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-top: 2rem;
`

export default function FibonacciVisualizer() {
  const [input, setInput] = useState("6")
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [isCalculating, setIsCalculating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [finalResult, setFinalResult] = useState(null)
  const [autoReplay, setAutoReplay] = useState(false)
  const [speed, setSpeed] = useState(1)
  const timeoutRef = useRef(null)

  const calculateSteps = (n) => {
    const steps = []
    let prev = 0
    let current = 1

    if (n === 0) {
      steps.push({ number: 0, explanation: "F(0) = 0" })
      return steps
    }

    if (n === 1) {
      steps.push({ number: 1, explanation: "F(1) = 1" })
      return steps
    }

    steps.push({ number: prev, explanation: "F(0) = 0" })
    steps.push({ number: current, explanation: "F(1) = 1" })

    for (let i = 2; i <= n; i++) {
      const next = prev + current
      steps.push({
        number: next,
        explanation: `F(${i}) = F(${i-2}) + F(${i-1}) = ${prev} + ${current} = ${next}`
      })
      prev = current
      current = next
    }

    return steps
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStepIndex = currentStep + 1
      setCurrentStep(nextStepIndex)

      if (nextStepIndex === steps.length - 1) {
        setFinalResult(steps[steps.length - 1].number)
        if (autoReplay) {
          timeoutRef.current = setTimeout(() => {
            handleReset()
            calculateFibonacci(parseInt(input))
          }, 2000 / speed)
        }
      }
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setFinalResult(null)
    }
  }

  const calculateFibonacci = (n) => {
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
    if (!isNaN(num) && num >= 0 && num <= 20) {
      calculateFibonacci(num)
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
        <VisualizerTitle>Fibonacci Sequence Visualizer</VisualizerTitle>
        
        <ControlsContainer>
          <ControlRow>
            <StyledInput
              type="number"
              min="0"
              max="20"
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
            <StyledButton onClick={previousStep} disabled={currentStep <= 0}>
              <SkipBack size={16} />
            </StyledButton>
            <StyledButton onClick={nextStep} disabled={currentStep >= steps.length - 1}>
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
          <FibonacciTree>
            {steps.map((step, index) => (
              <StepContainer key={index}>
                <NumberBox isActive={index <= currentStep}>
                  {step.number}
                </NumberBox>
                <StepBox showStep={index <= currentStep}>
                  {step.explanation}
                </StepBox>
              </StepContainer>
            ))}
          </FibonacciTree>
          
          {finalResult !== null && (
            <ResultBox>
              F({input}) = {finalResult}
            </ResultBox>
          )}
        </VisualizationContainer>
      </VisualizerContainer>

      <QuizContainer>
        <SectionTitle>Test Your Knowledge</SectionTitle>
        <QuizPanel algorithm="fibonacci" />
      </QuizContainer>
    </Container>
  )
} 