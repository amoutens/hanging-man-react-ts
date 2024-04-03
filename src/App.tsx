import React, { ChangeEvent } from 'react';
import words from './wordList.json'
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import { ResetGame } from './ResetGame';
import './style.scss'
import { SliderTheme } from './SliderTheme';
import { LevelChange } from './LevelChange';

export function App() {
    const [wordArrDiff, setWordArrDiff] = React.useState<string[]>(words);
    const [wordToGuess, setWordToGuess] = React.useState(() => {
        return wordArrDiff[Math.floor(Math.random() * wordArrDiff.length)]
    });
    const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);
    const [incorrectLetters, setIncorrectLetters] = React.useState<string[]>([]);
    const [buttonClasses, setButtonClasses] = React.useState<string[]>(Array.from({ length: 26 }, () => ''));
    const [isCheckedTheme, setIsCheckedTheme] = React.useState<boolean>(false);
    const isSame = new Set(guessedLetters).size === new Set(wordToGuess).size;
    const [isLevelClicked, setIsLevelClicked] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        setWordToGuess(wordArrDiff[Math.floor(Math.random() * wordArrDiff.length)]);
    }, [wordArrDiff]);
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
    
    const selectDifficulty = (index: number): void => {
        switch(index) {
            case 0:
                setWordArrDiff(words);
                handleReset();
                setIsLevelClicked(false);
                break;
            case 1:
                setWordArrDiff(words.filter(el => el.length === 4));
                handleReset();
                setIsLevelClicked(false);
                break;
            case 2:
                setWordArrDiff(words.filter(el => el.length === 5 || el.length === 6));
                handleReset();
                setIsLevelClicked(false);
                break;
            case 3:
                setWordArrDiff(words.filter(el => el.length >= 7));
                handleReset();
                setIsLevelClicked(false);
                break;
            default:
                break;
        }
    }



    const isWon = () => {
        if (isSame) return 'YOU WON!'
        else return 'YOU LOSE :('
    }

    const handleReset = () => {
        setWordToGuess(wordArrDiff[Math.floor(Math.random() * wordArrDiff.length)]);
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
            position: 'relative', 
            maxWidth: '800px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            margin: '0 auto',
            alignItems: 'center',
        }}>
            <div style={{
                position: 'relative', 
                zIndex: 999, 
                fontSize: '2rem',
                display: 'block',
                textAlign: 'center',
            }}>
                <div className='main-container'>
                    <span className={`main-label ${!isCheckedTheme ? '' : 'dark-theme'}`}>
                        {(incorrectLetters.length > 5 || isSame) ? isWon() : 'Play Hangman!'} 
                        <div className='btn-container'>
                            <ResetGame isChecked={isCheckedTheme} handleReset={handleReset} />
                            <button onClick={() => setIsLevelClicked((prev) => !prev)} className={`level-label ${!isCheckedTheme ? '' : 'dark-theme'}`}>
                                Choose Level
                            </button>
                        </div>
                        <span className='level-main-container'>
                            {isLevelClicked && <span className={`level-container `}><LevelChange isCheckedTheme={isCheckedTheme} selectDifficulty={selectDifficulty} setIsLevelClicked={setIsLevelClicked}/></span>}
                        </span>
                    </span>
                </div>
                <div className="container">
                    <SliderTheme isChecked={isCheckedTheme} handleInputChange={handleSliderChange}/>
                </div>
            </div>
            <HangmanDrawing numOfGuesses={incorrectLetters.length} isChecked={isCheckedTheme} />
            <HangmanWord wordToGuess={wordToGuess} guessedLetters={guessedLetters} numOfGuesses={incorrectLetters.length} isChecked={isCheckedTheme} />
            <div style={{ alignSelf: 'stretch' }}>
                <Keyboard buttonClasses={buttonClasses} handleButtonClick={handleButtonClick} numOfGuesses={incorrectLetters.length} isSame={isSame} isChecked={isCheckedTheme}  />
            </div>
        </div>
    );
    
  
}

export default App
