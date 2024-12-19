import React from 'react';
import styled from 'styled-components';

const ResourcesContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  text-align: center;
`;

const ResourceSection = styled.div`
  margin-bottom: 2rem;
`;

const ResourceCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: var(--text-color);
  line-height: 1.5;
`;

function Resources() {
  const resources = [
    {
      title: 'Algorithm Theory',
      description: 'Explore detailed explanations of essential algorithms with animations and step-by-step breakdowns.',
    },
    {
      title: 'Download Notes & Cheat Sheets',
      description: 'Get PDF notes and cheat sheets for quick reference during your coding practice.',
    },
    {
      title: 'YouTube Playlists',
      description: 'Watch video explanations of key algorithms from leading educators on YouTube.',
    },
    {
      title: 'Quizzes & MCQs',
      description: 'Test your knowledge of algorithms with multiple-choice questions and quizzes.',
    }
  ];

  return (
    <ResourcesContainer>
      <SectionTitle>Resources</SectionTitle>

      {resources.map((resource, index) => (
        <ResourceSection key={index}>
          <ResourceCard>
            <CardTitle>{resource.title}</CardTitle>
            <CardDescription>{resource.description}</CardDescription>
          </ResourceCard>
        </ResourceSection>
      ))}
    </ResourcesContainer>
  );
}

export default Resources;
