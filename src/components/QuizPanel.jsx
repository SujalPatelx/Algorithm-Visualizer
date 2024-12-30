import React, { useState } from 'react';
import styled from 'styled-components';

const QuizContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.08);
  border: 1px solid #e8f0fe;
  margin-top: 1rem;
`;

const QuizTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const Question = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Option = styled.button`
  padding: 0.75rem 1rem;
  border: 1px solid #e8f0fe;
  border-radius: 8px;
  background: ${props => 
    props.isSelected 
      ? props.isCorrect 
        ? '#10b981' 
        : '#ef4444'
      : 'white'
  };
  color: ${props => props.isSelected ? 'white' : 'var(--text-color)'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  
  &:hover {
    background: ${props => props.isAnswered ? '' : '#f3f4f6'};
  }
  
  &:disabled {
    cursor: default;
  }
`;

const Feedback = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: ${props => props.isCorrect ? '#f0fdf4' : '#fef2f2'};
  color: ${props => props.isCorrect ? '#10b981' : '#ef4444'};
`;

const NextButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const QuizPanel = ({ algorithm }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = {
    bubble: [
      {
        question: "What is the time complexity of Bubble Sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
        correctAnswer: 2,
        explanation: "Bubble Sort has a time complexity of O(n²) because it uses nested loops to compare adjacent elements."
      },
      {
        question: "Which of the following is true about Bubble Sort?",
        options: [
          "It's the fastest sorting algorithm",
          "It's stable and in-place",
          "It has O(n) space complexity",
          "It's primarily used in industry"
        ],
        correctAnswer: 1,
        explanation: "Bubble Sort is both stable (maintains relative order of equal elements) and in-place (uses constant extra space)."
      },
      {
        question: "What happens in the first pass of Bubble Sort?",
        options: [
          "The smallest element moves to the beginning",
          "The largest element moves to the end",
          "The array gets completely sorted",
          "All elements are compared with the pivot"
        ],
        correctAnswer: 1,
        explanation: "In the first pass, the largest element 'bubbles up' to the end of the array through adjacent swaps."
      },
      {
        question: "When is Bubble Sort most efficient?",
        options: [
          "When dealing with large datasets",
          "When the array is nearly sorted",
          "When memory is very limited",
          "When dealing with linked lists"
        ],
        correctAnswer: 1,
        explanation: "Bubble Sort performs best when the array is nearly sorted, as it can complete in almost linear time."
      },
      {
        question: "What is the best-case time complexity of Bubble Sort?",
        options: [
          "O(n²)",
          "O(n log n)",
          "O(n)",
          "O(1)"
        ],
        correctAnswer: 2,
        explanation: "The best-case time complexity is O(n) when the array is already sorted and the optimized version is used."
      }
    ],
    quick: [
      {
        question: "What is the average time complexity of Quick Sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
        correctAnswer: 1,
        explanation: "Quick Sort has an average time complexity of O(n log n) due to its divide-and-conquer approach."
      },
      {
        question: "What is the key concept in Quick Sort?",
        options: [
          "Merging sorted arrays",
          "Selecting minimum elements",
          "Partitioning around a pivot",
          "Bubble up maximum elements"
        ],
        correctAnswer: 2,
        explanation: "Quick Sort works by selecting a pivot element and partitioning the array around it."
      },
      {
        question: "What is the worst-case scenario for Quick Sort?",
        options: [
          "When the array is already sorted",
          "When all elements are the same",
          "When the pivot is always the smallest/largest element",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "Quick Sort performs worst when the pivot selection consistently results in the most unbalanced partitions."
      },
      {
        question: "How does Quick Sort handle duplicate elements?",
        options: [
          "It cannot sort arrays with duplicates",
          "It treats them as unique elements",
          "It groups them around the pivot",
          "It ignores them completely"
        ],
        correctAnswer: 2,
        explanation: "Quick Sort can handle duplicates by grouping equal elements around the pivot using three-way partitioning."
      }
    ],
    merge: [
      {
        question: "What is the space complexity of Merge Sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 2,
        explanation: "Merge Sort requires O(n) extra space to merge the sorted subarrays."
      }
    ],
    // Add more questions for other algorithms
  };

  const ScoreDisplay = styled.div`
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: var(--primary-color);
  `;

  const SkipButton = styled(NextButton)`
    background: #6b7280;
    margin-left: 1rem;
  `;

  const currentQuestion = questions[algorithm]?.[currentQuestionIndex];

  const handleOptionSelect = (optionIndex) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    setShowAnswer(true);
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowAnswer(false);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleSkip = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowAnswer(false);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowAnswer(false);
    setScore(0);
  };

  if (!currentQuestion) {
    return (
      <QuizContainer>
        <QuizTitle>Quiz Completed!</QuizTitle>
        <ScoreDisplay>
          Your Score: {score} out of {questions[algorithm].length}
        </ScoreDisplay>
        <NextButton onClick={resetQuiz}>
          Try Again
        </NextButton>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      <QuizTitle>Quiz Time!</QuizTitle>
      <ScoreDisplay>
        Question {currentQuestionIndex + 1} of {questions[algorithm].length}
        {" | "}Score: {score}
      </ScoreDisplay>
      <Question>{currentQuestion.question}</Question>
      <OptionsContainer>
        {currentQuestion.options.map((option, index) => (
          <Option
            key={index}
            onClick={() => handleOptionSelect(index)}
            isSelected={selectedOption === index}
            isCorrect={showAnswer && index === currentQuestion.correctAnswer}
            isAnswered={isAnswered}
            disabled={isAnswered}
          >
            {option}
          </Option>
        ))}
      </OptionsContainer>
      
      {showAnswer && (
        <>
          <Feedback isCorrect={selectedOption === currentQuestion.correctAnswer}>
            {selectedOption === currentQuestion.correctAnswer 
              ? "Correct! " 
              : "Incorrect. "}
            {currentQuestion.explanation}
          </Feedback>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <NextButton onClick={handleNext}>
              Next Question
            </NextButton>
            {!isAnswered && (
              <SkipButton onClick={handleSkip}>
                Skip Question
              </SkipButton>
            )}
          </div>
        </>
      )}
    </QuizContainer>
  );
};

export default QuizPanel; 