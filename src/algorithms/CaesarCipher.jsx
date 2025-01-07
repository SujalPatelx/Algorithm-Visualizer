import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Controls from '../components/Controls';
import CodePanel from '../components/CodePanel';
import QuizPanel from '../components/QuizPanel';

const AlgorithmContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 64px);
  background-color: var(--background-color);
`;

const VisualizerWrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const VisualizerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 600px), 1fr));
  gap: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.08);
  border: 1px solid #e8f0fe;
  min-height: 450px;
  display: flex;
  flex-direction: column;
`;

const InputSection = styled.div`
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e8f0fe;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const ShiftInput = styled.input`
  width: 80px;
  padding: 0.5rem;
  border: 1px solid #e8f0fe;
  border-radius: 8px;
  font-size: 1rem;
  margin-left: 1rem;
`;

const OutputDisplay = styled.div`
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  font-family: monospace;
  font-size: 1.1rem;
  min-height: 3rem;
  margin-bottom: 1rem;
`;

const AlphabetDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(7, 1fr);
  }
`;

const Letter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #e8f0fe;
  border-radius: 4px;
  font-family: monospace;
  background: ${props => props.isActive ? '#f0f7ff' : 'white'};
  border-color: ${props => props.isActive ? 'var(--primary-color)' : '#e8f0fe'};
  transform: ${props => props.isActive ? 'scale(1.1)' : 'scale(1)'};
  transition: all 0.3s ease;
  
  span:first-child {
    color: var(--text-color);
  }
  
  span:last-child {
    color: var(--primary-color);
    margin-top: 0.25rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: var(--text-color);
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 500;
`;

const ExplanationSection = styled(Section)`
  margin-top: 2rem;
`;

const StepContainer = styled.div`
  margin-bottom: 2rem;
`;

const StepTitle = styled.h3`
  color: var(--primary-color);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Example = styled.div`
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  font-family: monospace;
`;

const HighlightText = styled.span`
  color: var(--primary-color);
  font-weight: 600;
`;

const InfoBox = styled.div`
  background: #e8f4ff;
  border-left: 4px solid var(--primary-color);
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0 8px 8px 0;
`;

const CharacterTransform = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
`;

const CharBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border: 2px solid ${props => props.isActive ? 'var(--primary-color)' : '#e8f0fe'};
  border-radius: 8px;
  min-width: 60px;
  background: ${props => props.isActive ? '#f0f7ff' : 'white'};
  transition: all 0.3s ease;
`;

const TransformArrow = styled.div`
  color: var(--primary-color);
  font-size: 1.2rem;
  margin: 0.25rem 0;
`;

const CharPosition = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
`;

const ProcessStep = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
  text-align: center;
`;

function CaesarCipher() {
  const [inputText, setInputText] = useState('');
  const [shift, setShift] = useState(3);
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [selectedChar, setSelectedChar] = useState(null);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const getCharacterPosition = (char) => {
    return char.toUpperCase().charCodeAt(0) - 65;
  };

  const getShiftedPosition = (position, shift) => {
    return ((position + shift) % 26 + 26) % 26;
  };

  const encrypt = (text, shift) => {
    return text
      .toUpperCase()
      .split('')
      .map(char => {
        if (char.match(/[A-Z]/)) {
          const code = ((char.charCodeAt(0) - 65 + shift) % 26) + 65;
          return String.fromCharCode(code);
        }
        return char;
      })
      .join('');
  };

  const decrypt = (text, shift) => {
    return encrypt(text, 26 - shift);
  };

  useEffect(() => {
    if (inputText) {
      const encrypted = encrypt(inputText, shift);
      setEncryptedText(encrypted);
      setDecryptedText(decrypt(encrypted, shift));
    } else {
      setEncryptedText('');
      setDecryptedText('');
    }
  }, [inputText, shift]);

  const renderCharacterTransformation = () => {
    if (!inputText) return null;
    
    return inputText.toUpperCase().split('').map((char, index) => {
      if (!char.match(/[A-Z]/)) return null;
      
      const originalPos = getCharacterPosition(char);
      const shiftedPos = getShiftedPosition(originalPos, shift);
      const encryptedChar = String.fromCharCode(shiftedPos + 65);
      const isActive = selectedChar === index;
      
      return (
        <CharBox 
          key={index} 
          isActive={isActive}
          onClick={() => setSelectedChar(index)}
        >
          <div>{char}</div>
          <CharPosition>Position: {originalPos}</CharPosition>
          <TransformArrow>↓</TransformArrow>
          <ProcessStep>+{shift} → {(originalPos + shift)} % 26</ProcessStep>
          <TransformArrow>↓</TransformArrow>
          <div>{encryptedChar}</div>
          <CharPosition>Position: {shiftedPos}</CharPosition>
        </CharBox>
      );
    });
  };

  return (
    <AlgorithmContainer>
      <Title>Caesar Cipher Visualization</Title>
      <Description>
        The Caesar Cipher is one of the simplest and most widely known encryption techniques.
        It is a type of substitution cipher in which each letter in the plaintext is shifted
        a certain number of places down the alphabet.
      </Description>

      <VisualizerWrapper>
        <VisualizerContainer>
          <Section>
            <SectionTitle>Cipher Visualization</SectionTitle>
            <InputSection>
              <Label>Input Text</Label>
              <Input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to encrypt..."
              />
              <Label>
                Shift Amount
                <ShiftInput
                  type="number"
                  value={shift}
                  onChange={(e) => setShift(Number(e.target.value) % 26)}
                  min="0"
                  max="25"
                />
              </Label>
            </InputSection>

            <Label>Character Transformation</Label>
            <CharacterTransform>
              {renderCharacterTransformation()}
            </CharacterTransform>

            <Label>Encrypted Text</Label>
            <OutputDisplay>{encryptedText}</OutputDisplay>

            <Label>Decrypted Text</Label>
            <OutputDisplay>{decryptedText}</OutputDisplay>

            <AlphabetDisplay>
              {alphabet.map((letter, index) => (
                <Letter 
                  key={letter}
                  isActive={selectedChar !== null && letter === inputText[selectedChar]?.toUpperCase()}
                >
                  <span>{letter}</span>
                  <span>{encrypt(letter, shift)}</span>
                </Letter>
              ))}
            </AlphabetDisplay>
          </Section>

          <Section>
            <SectionTitle>Algorithm Code</SectionTitle>
            <CodePanel 
              algorithm="caesar"
              currentStep={0}
              comparing={[]}
            />
          </Section>
        </VisualizerContainer>

        <ExplanationSection>
          <SectionTitle>How Caesar Cipher Works</SectionTitle>
          
          <StepContainer>
            <StepTitle>1. Understanding the Basics</StepTitle>
            <StepDescription>
              The Caesar Cipher is named after Julius Caesar, who used it for secret communication.
              It's a substitution cipher that replaces each letter in the plaintext with a letter 
              that is a fixed number of positions down the alphabet.
            </StepDescription>
            <InfoBox>
              For example, with a shift of 3:
              <Example>
                A → D, B → E, C → F, ..., X → A, Y → B, Z → C
              </Example>
            </InfoBox>
          </StepContainer>

          <StepContainer>
            <StepTitle>2. The Encryption Process</StepTitle>
            <StepDescription>
              To encrypt a message, follow these steps:
            </StepDescription>
            <ol>
              <li>Choose a shift value (key) between 1 and 25</li>
              <li>For each letter in your message:</li>
              <ul>
                <li>Convert the letter to its position in the alphabet (A=0, B=1, etc.)</li>
                <li>Add the shift value to the position</li>
                <li>If the result is greater than 25, subtract 26</li>
                <li>Convert the new position back to a letter</li>
              </ul>
            </ol>
            <Example>
              With shift = 3:<br/>
              "HELLO" → "KHOOR"<br/>
              H(7) → K(10), E(4) → H(7), L(11) → O(14), L(11) → O(14), O(14) → R(17)
            </Example>
          </StepContainer>

          <StepContainer>
            <StepTitle>3. The Decryption Process</StepTitle>
            <StepDescription>
              Decryption is the reverse of encryption. Instead of adding the shift value,
              we subtract it (or add 26-shift).
            </StepDescription>
            <Example>
              With shift = 3:<br/>
              "KHOOR" → "HELLO"<br/>
              K(10) → H(7), H(7) → E(4), O(14) → L(11), O(14) → L(11), R(17) → O(14)
            </Example>
          </StepContainer>

          <StepContainer>
            <StepTitle>4. Mathematical Formula</StepTitle>
            <StepDescription>
              The encryption formula for each character position is:
            </StepDescription>
            <Example>
              Encrypted = (Position + Shift) % 26<br/>
              Decrypted = (Position - Shift + 26) % 26
            </Example>
            <InfoBox>
              The modulo operation (%) ensures the result stays within the alphabet (0-25).
            </InfoBox>
          </StepContainer>

          <StepContainer>
            <StepTitle>5. Security Considerations</StepTitle>
            <StepDescription>
              While historically significant, the Caesar Cipher is not secure for modern use because:
            </StepDescription>
            <ul>
              <li>There are only 25 possible shifts to try (brute force attack)</li>
              <li>Letter frequency analysis can easily break the cipher</li>
              <li>The pattern of the original text is preserved</li>
            </ul>
            <InfoBox>
              This cipher is primarily used for educational purposes to introduce basic cryptography concepts.
            </InfoBox>
          </StepContainer>
        </ExplanationSection>

        <Section>
          <SectionTitle>Test Your Knowledge</SectionTitle>
          <QuizPanel algorithm="caesar" />
        </Section>
      </VisualizerWrapper>
    </AlgorithmContainer>
  );
}

export default CaesarCipher; 