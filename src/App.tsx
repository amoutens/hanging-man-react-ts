import React, { ChangeEvent } from 'react';
import words from './wordList.json'
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import { ResetGame } from './ResetGame';
import './style.scss'
import { SliderTheme } from './SliderTheme';

export function App() {
    const [wordToGuess, setWordToGuess] = React.useState(() => {
        return words[Math.floor(Math.random() * words.length)]
    });
    const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);
    const [incorrectLetters, setIncorrectLetters] = React.useState<string[]>([]);
    const [buttonClasses, setButtonClasses] = React.useState<string[]>(Array.from({ length: 26 }, () => ''));
    const [isCheckedTheme, setIsCheckedTheme] = React.useState(false);
    const isSame = new Set(guessedLetters).size === new Set(wordToGuess).size;
    const addGuessedLetter = (letter: string) => {
        if (wordToGuess.includes(letter) && !guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
        } else if (!incorrectLetters.includes(letter)) {
            setIncorrectLetters([...incorrectLetters, letter]);
        }
    }
    const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      setIsCheckedTheme(isChecked);
      if (!isCheckedTheme) { 
        document.body.style.backgroundColor = '#121212';
        document.body.style.transition = '0.2s';
      } else {
        document.body.style.backgroundColor = 'transparent';
        document.body.style.transition = '0.2s';
    }
    }


    const isWon = () => {
        if (isSame) return 'YOU WON!'
        else return 'YOU LOSE :('
    }

    const handleReset = () => {
        setWordToGuess(words[Math.floor(Math.random() * words.length)]);
        setGuessedLetters([]);
        setIncorrectLetters([]);
        setButtonClasses(Array.from({ length: 26 }, () => ''));
    }

    const handleButtonClick = (letter: string, index: number) => {
        addGuessedLetter(letter);
        const updatedButtonClasses = [...buttonClasses];
        updatedButtonClasses[index] = wordToGuess.includes(letter) ? 'active' : 'inactive';
        setButtonClasses(updatedButtonClasses);
    };
    console.log(wordToGuess)
    console.log(isSame)
    return (
          <div style={{
              maxWidth: '800px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              margin: '0 auto',
              alignItems: 'center',
          }}>
              <div style={{
                  fontSize: '2rem',
                  textAlign: 'center'
              }}>
                  <span className={`main-label ${!isCheckedTheme ? '' : 'dark-theme'}`}>{(incorrectLetters.length > 5 || isSame) ? isWon() : 'Play Hangman!'} <ResetGame isChecked={isCheckedTheme} handleReset={handleReset} /></span>
                  <div className="container">
                      <SliderTheme isChecked={isCheckedTheme} handleInputChange={handleSliderChange}/>
                  </div>
              </div>
  
              <HangmanDrawing numOfGuesses={incorrectLetters.length} isChecked={isCheckedTheme} />
              <HangmanWord wordToGuess={wordToGuess} guessedLetters={guessedLetters} numOfGuesses={incorrectLetters.length} isChecked={isCheckedTheme} />
              <div style={{ alignSelf: 'stretch' }}><Keyboard buttonClasses={buttonClasses} handleButtonClick={handleButtonClick} numOfGuesses={incorrectLetters.length} isSame={isSame} isChecked={isCheckedTheme}  /> </div>
          </div>
  );
  
}

export default App
