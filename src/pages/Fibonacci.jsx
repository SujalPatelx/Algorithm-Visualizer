import React from 'react';
import styled from 'styled-components';
import FibonacciVisualizer from '../algorithms/FibonacciVisualizer';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const CodeSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const CodeTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const CodeContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CodeExplanation = styled.div`
  color: #4b5563;
  line-height: 1.6;
  
  h3 {
    color: #374151;
    margin: 1.5rem 0 0.5rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
`;

function Fibonacci() {
  return (
    <PageContainer>
      <Title>Fibonacci Sequence</Title>
      <Description>
        Visualize how the Fibonacci sequence is generated step by step. Each number is the sum of the two 
        preceding ones, starting from 0 and 1.
      </Description>
      <FibonacciVisualizer />
      
      <CodeSection>
        <CodeTitle>Implementation</CodeTitle>
        <CodeContainer>
          <pre>
            <code className="javascript">
{`// Iterative implementation
function fibonacci(n) {
    // Base cases
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    let prev = 0;    // F(0)
    let current = 1; // F(1)
    
    // Calculate Fibonacci numbers from F(2) to F(n)
    for (let i = 2; i <= n; i++) {
        const next = prev + current;
        prev = current;
        current = next;
    }
    
    return current;
}

// Recursive implementation
function fibonacciRecursive(n) {
    // Base cases
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    // Recursive case: F(n) = F(n-1) + F(n-2)
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}`}
            </code>
          </pre>
        </CodeContainer>
        
        <CodeExplanation>
          <h3>How it Works</h3>
          <p>
            The Fibonacci sequence can be implemented in two main ways:
          </p>
          
          <h3>Iterative Approach</h3>
          <p>
            The iterative implementation uses a loop to calculate each Fibonacci number, 
            keeping track of the previous two numbers (prev and current). This approach 
            has O(n) time complexity and O(1) space complexity, making it more efficient 
            for larger numbers.
          </p>
          
          <h3>Recursive Approach</h3>
          <p>
            The recursive implementation directly follows the mathematical definition: 
            F(n) = F(n-1) + F(n-2). While more elegant, it has O(2ⁿ) time complexity 
            due to redundant calculations, making it impractical for larger numbers.
          </p>
          
          <h3>Time & Space Complexity</h3>
          <p>
            - Iterative: O(n) time, O(1) space<br />
            - Recursive: O(2ⁿ) time, O(n) space (due to call stack)
          </p>
        </CodeExplanation>
      </CodeSection>
    </PageContainer>
  );
}

export default Fibonacci; 