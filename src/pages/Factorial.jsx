import React from 'react';
import styled from 'styled-components';
import FactorialVisualizer from '../algorithms/FactorialVisualizer';

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

function Factorial() {
  return (
    <PageContainer>
      <Title>Factorial Calculator</Title>
      <Description>
        Visualize how factorial is calculated step by step. The factorial of a non-negative integer n 
        is the product of all positive integers less than or equal to n.
      </Description>
      <FactorialVisualizer />
    </PageContainer>
  );
}

export default Factorial; 