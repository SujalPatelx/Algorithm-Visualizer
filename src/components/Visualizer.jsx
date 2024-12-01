import React from 'react';
import styled from 'styled-components';

const VisualizerContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  padding: 2rem 3rem;
  gap: 12px;
  justify-content: center;
  background-color: #fafafa;
  border-radius: 8px;
  position: relative;
  height: 350px;
  margin-top: 2rem;
`;

const Bar = styled.div`
  width: ${props => Math.min(80, Math.max(35, 600 / props.totalBars))}px;
  height: ${props => `${(props.value / props.maxValue) * 300}px`};
  transition: all 0.3s ease;
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: ${props => props.isComparing ? 'var(--warning-color)' : 'var(--primary-color)'};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const BarValue = styled.span`
  position: absolute;
  top: -28px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
`;

function Visualizer({ array, comparingIndices }) {
  const maxValue = Math.max(...array);

  return (
    <VisualizerContainer>
      {array.map((value, idx) => (
        <Bar
          key={idx}
          value={value}
          maxValue={maxValue}
          totalBars={array.length}
          isComparing={comparingIndices.includes(idx)}
        >
          <BarValue>{value}</BarValue>
        </Bar>
      ))}
    </VisualizerContainer>
  );
}

export default Visualizer; 