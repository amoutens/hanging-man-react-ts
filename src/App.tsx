import React, { ChangeEvent } from 'react';
import words from './wordList.json'
import { HangmanDrawing } from "./Components/HangmanDrawing";
import { HangmanWord } from "./Components/HangmanWord";
import { Keyboard } from "./Components/Keyboard";
import { ResetGame } from './Components/ResetGame';
import './style.scss'
import { SliderTheme } from './Components/SliderTheme';
import { LevelChange } from './Components/LevelChange';
import { Hint } from './Components/Hint';


export function App() {
    const [wordToGuessByDifficulty, setWordToGuessByDifficulty] = React.useState<string[]>(words);
    const [wordToGuess, setWordToGuess] = React.useState(() => {
        return wordToGuessByDifficulty[Math.floor(Math.random() * wordToGuessByDifficulty.length)]
    });
    const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);
    const [incorrectLetters, setIncorrectLetters] = React.useState<string[]>([]);
    const [buttonClasses, setButtonClasses] = React.useState<string[]>(Array.from({ length: 26 }, () => ''));
    const [isCheckedTheme, setIsCheckedTheme] = React.useState<boolean>(false);
    const [isLevelClicked, setIsLevelClicked] = React.useState<boolean>(false);
    const [pressedKeysByKeyboard, setPressedKeysByKeyboard] = React.useState<string[]>([]);
    const [gameOver, setGameOver] = React.useState<boolean>(false);
    const [hintsClickCount, setHintsClickCount] = React.useState<number>(3);
    const [difficultLevel, setDifficultLevel] = React.useState<number>(0);
    const [quantityOfHints, setQuantityOfHints] = React.useState<number>(0);

    const keys:string[] = ['a','b','c','d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w','x', 'y', 'z'];
    const isSame = new Set(guessedLetters).size === new Set(wordToGuess).size;

    React.useEffect(() => {
        setWordToGuess(wordToGuessByDifficulty[Math.floor(Math.random() * wordToGuessByDifficulty.length)]);
    }, [wordToGuessByDifficulty
    ]);

    React.useEffect (() => {
        if((wordToGuess.length === 4 && difficultLevel === 1) || (wordToGuess.length === 4 && difficultLevel === 0)) {setHintsClickCount(1);
            setQuantityOfHints(1);
        }
        else if((wordToGuess.length === 5 || wordToGuess.length === 6) || difficultLevel === 2) {setHintsClickCount(2);
            setQuantityOfHints(2);
        }
        else if(wordToGuess.length >= 7 || difficultLevel === 3) {setHintsClickCount(3);
            setQuantityOfHints(3);
        }
    }, [wordToGuess, difficultLevel, setHintsClickCount]);

    const addGuessedLetter = (letter: string) => {
        if (wordToGuess.includes(letter) && !guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
            setPressedKeysByKeyboard([...guessedLetters, letter]);
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
                setWordToGuessByDifficulty(words);
                setDifficultLevel(0);
                break;
            case 1:
                setWordToGuessByDifficulty(words.filter(el => el.length === 4));
                setDifficultLevel(1);
                break;
            case 2:
                setWordToGuessByDifficulty(words.filter(el => el.length === 5 || el.length === 6));
                setDifficultLevel(2);
                break;
            case 3:
                setWordToGuessByDifficulty(words.filter(el => el.length >= 7));
                setDifficultLevel(3);
                break;
            default:
                break;
        }
        handleReset();
        setIsLevelClicked(false);
    }

    const handleHint = (): void => {
        const remainingLetters: string[] = wordToGuess
        .split('')
        .filter(el => !guessedLetters.includes(el));
        if(remainingLetters.length > 0 && hintsClickCount > 0) {
            const hintLetter = remainingLetters[Math.floor(Math.random() * remainingLetters.length)];
            handleKeyClick(hintLetter, keys.indexOf(hintLetter))
            setHintsClickCount(prev => prev - 1);
        }
    }
    
    const isWon = (): string => {
        if (isSame) return 'YOU WON!'
        else return 'YOU LOSE :('
    }

    const handleReset = (): void => {
        setWordToGuess(wordToGuessByDifficulty[Math.floor(Math.random() * wordToGuessByDifficulty.length)]);
        setGuessedLetters([]);
        setIncorrectLetters([]);
        setButtonClasses(Array.from({ length: 26 }, () => ''));
        setPressedKeysByKeyboard([]);
        setGameOver(false); 
    }

    const handleKeyClick = (letter: string, index: number): void => {
        if(guessedLetters.includes(letter) === false){
            addGuessedLetter(letter);
            const updatedButtonClasses = [...buttonClasses];
            updatedButtonClasses[index] = wordToGuess.includes(letter) ? 'active' : 'inactive';
            setButtonClasses(updatedButtonClasses); 
        }
    };
    return (
        <div className='game-container'>
            <div className='header-container'>
                <div className='main-container'>
                    <span className={`main-label ${!isCheckedTheme ? '' : 'dark-theme'}`}>
                        {(incorrectLetters.length > 5 || isSame) ? isWon() : 'Hangman!'} 
                        <div className='btn-container'>
                            <ResetGame isChecked={isCheckedTheme} handleReset={handleReset} />
                            <button onClick={() => setIsLevelClicked((prev) => !prev)} className={`level-label ${!isCheckedTheme ? '' : 'dark-theme'}`}>
                                Choose Level
                            </button>
                        <span className='level-main-container'>
                            {isLevelClicked && <span className={`level-container `}><LevelChange isCheckedTheme={isCheckedTheme}
                             selectDifficulty={selectDifficulty} setIsLevelClicked={setIsLevelClicked}/></span>}
                        </span>
                        </div>
                    </span>
                    <p><Hint isChecked={isCheckedTheme} handleHint={handleHint} hintsClickCount = {hintsClickCount}
                     quantityOfHints={quantityOfHints} /></p>
                </div>
                <div className="slider-container">
                    <SliderTheme isChecked={isCheckedTheme} handleInputChange={handleSliderChange}/>
                </div>
            </div>
            <HangmanDrawing numOfGuesses={incorrectLetters.length} isChecked={isCheckedTheme} />
            <HangmanWord isSame={isSame} wordToGuess={wordToGuess} guessedLetters={guessedLetters} numOfGuesses={incorrectLetters.length}
             isChecked={isCheckedTheme} />
            <div style={{ alignSelf: 'stretch' }}>
                <Keyboard keys={keys} gameOver={gameOver} setGameOver={setGameOver} pressedKeysByKeyboard={pressedKeysByKeyboard}
                 setPressedKeysByKeyboard={setPressedKeysByKeyboard} buttonClasses={buttonClasses} handleKeyClick={handleKeyClick}
                 numOfGuesses={incorrectLetters.length} isSame={isSame} isChecked={isCheckedTheme}  />
            </div>
        </div>
    );
}

export default App
