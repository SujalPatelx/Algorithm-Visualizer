import React from 'react';
import styled from 'styled-components';
import InsertionSort from '../algorithms/InsertionSort';

const CodeContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: auto;
`;

const CodeTitle = styled.div`
  color: #fff;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #333;
  font-weight: 500;
`;

const CodeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CodeLine = styled.pre`
  color: ${props => props.highlight ? '#ffd700' : '#e0e0e0'};
  background-color: ${props => props.highlight ? '#333' : 'transparent'};
  padding: 0.25rem 0.75rem;
  margin: 0;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 13px;
  line-height: 1.5;
  border-radius: 4px;
  transition: all 0.2s ease;
`;

const bubbleSortCode = [
  'do {',
  '    swapped = false',
  '    for (i = 0; i < array.length - 1; i++) {',
  '        if (array[i] > array[i + 1]) {',
  '            swap(array[i], array[i + 1])',
  '            swapped = true',
  '        }',
  '    }',
  '} while swapped'
];

const quickSortCode = [
  'function partition(low, high) {',
  '    pivot = array[high]',
  '    i = low - 1',
  '    for (j = low; j < high; j++) {',
  '        if (array[j] < pivot) {',
  '            i++',
  '            swap(array[i], array[j])',
  '        }',
  '    }',
  '    swap(array[i + 1], array[high])',
  '    return i + 1',
  '}'
];

const mergeSortCode = [
  'function merge(left, middle, right) {',
  '    leftArray = array.slice(left, middle)',
  '    rightArray = array.slice(middle, right)',
  '    i = 0, j = 0, k = left',
  '    while (i < leftArray.length && j < rightArray.length) {',
  '        if (leftArray[i] <= rightArray[j]) {',
  '            array[k++] = leftArray[i++]',
  '        } else {',
  '            array[k++] = rightArray[j++]',
  '        }',
  '    }',
  '    while (i < leftArray.length) array[k++] = leftArray[i++]',
  '    while (j < rightArray.length) array[k++] = rightArray[j++]',
  '}'
];

const insertionSortCode = [
  'for (i = 1; i < array.length; i++) {',
  '    key = array[i]',
  '    j = i - 1',
  '    while (j >= 0 && array[j] > key) {',
  '        array[j + 1] = array[j]',
  '        j--',
  '    }',
  '    array[j + 1] = key',
  '}'
];

const selectionSortCode = [
  'for (i = 0; i < array.length - 1; i++) {',
  '    minIdx = i',
  '    for (j = i + 1; j < array.length; j++) {',
  '        if (array[j] < array[minIdx]) {',
  '            minIdx = j',
  '        }',
  '    }',
  '    if (minIdx !== i) {',
  '        [array[i], array[minIdx]] = [array[minIdx], array[i]]',
  '    }',
  '}'
];

const caesarCipherCode = [
  'function encrypt(text, shift) {',
  '    return text.toUpperCase()',
  '        .split("")',
  '        .map(char => {',
  '            if (char.match(/[A-Z]/)) {',
  '                const code = ((char.charCodeAt(0) - 65 + shift) % 26) + 65',
  '                return String.fromCharCode(code)',
  '            }',
  '            return char',
  '        })',
  '        .join("")',
  '}',
  '',
  'function decrypt(text, shift) {',
  '    return encrypt(text, 26 - shift)',
  '}'
];

const CodePanel = ({ algorithm, currentStep, comparing }) => {
  const getHighlightedLines = () => {
    if (!comparing || comparing.length === 0) return [];
    
    switch (algorithm) {
      case 'bubble':
        if (comparing.length === 2) {
          // When comparing two elements
          return [3, 4, 5]; // Highlight comparison and swap lines
        }
        return [2]; // Highlight the loop line
      
      case 'quick':
        if (comparing.length === 2) {
          return [4, 5, 6];
        }
        return [1, 2, 3];
      
      case 'merge':
        if (comparing.length === 2) {
          return [5, 6, 7];
        }
        return [2, 3, 4];
      
      case 'insertion':
        if (comparing.length === 1) {
          return [1, 2];
        }
        if (comparing.length === 2) {
          return [4, 5, 6];
        }
        return [7, 8];
      
      case 'selection':
        if (comparing.length === 1) {
          return [1, 2];
        }
        if (comparing.length === 2) {
          return [3, 4, 5];
        }
        return [8, 9];
      
      case 'caesar':
        if (comparing.length === 1) {
          return [1, 2];
        }
        if (comparing.length === 2) {
          return [4, 5, 6];
        }
        return [7, 8];
      
      default:
        return [];
    }
  };

  const getCodeArray = () => {
    switch (algorithm) {
      case 'bubble':
        return bubbleSortCode;
      case 'quick':
        return quickSortCode;
      case 'merge':
        return mergeSortCode;
      case 'insertion':
        return insertionSortCode;
      case 'selection':
        return selectionSortCode;
      case 'caesar':
        return caesarCipherCode;
      default:
        return bubbleSortCode;
    }
  };

  const getTitle = () => {
    switch (algorithm) {
      case 'bubble':
        return 'Bubble Sort Algorithm';
      case 'quick':
        return 'Quick Sort Algorithm';
      case 'merge':
        return 'Merge Sort Algorithm';
      case 'insertion':
        return 'Insertion Sort Algorithm';
      case 'selection':
        return 'Selection Sort Algorithm';
      case 'caesar':
        return 'Caesar Cipher Algorithm';
      default:
        return 'Sorting Algorithm';
    }
  };

  const highlightedLines = getHighlightedLines();

  return (
    <CodeContainer>
      <CodeTitle>{getTitle()}</CodeTitle>
      <CodeContent>
        {getCodeArray().map((line, index) => (
          <CodeLine
            key={index}
            highlight={highlightedLines.includes(index)}
          >
            {line}
          </CodeLine>
        ))}
      </CodeContent>
    </CodeContainer>
  );
};

export default CodePanel;