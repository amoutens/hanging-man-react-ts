import React, { ChangeEvent } from 'react';
import words from './wordList.json'
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import { ResetGame } from './ResetGame';
import './style.scss'
import { SliderTheme } from './SliderTheme';
import { LevelChange } from './LevelChange';
import { Hint } from './Hint';


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
    const [pressedKeys, setPressedKeys] = React.useState<string[]>([]);
    const [gameOver, setGameOver] = React.useState<boolean>(false);
    const [hintsClickCount, setHintsClickCount] = React.useState<number>(3);
    const [difficultLevel, setDifficultLevel] = React.useState<number>(0);
    const [quantityOfHints, setQuantityOfHints] = React.useState<number>(0);

    const keys = ['a','b','c','d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w','x', 'y', 'z'];

    React.useEffect(() => {
        setWordToGuess(wordArrDiff[Math.floor(Math.random() * wordArrDiff.length)]);
    }, [wordArrDiff]);
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
    }, [wordToGuess, difficultLevel, setHintsClickCount])


    
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
                setDifficultLevel(0);
                handleReset();
                setIsLevelClicked(false);
                break;
            case 1:
                setWordArrDiff(words.filter(el => el.length === 4));
                setDifficultLevel(1);
                handleReset();
                setIsLevelClicked(false);
                break;
            case 2:
                setWordArrDiff(words.filter(el => el.length === 5 || el.length === 6));
                setDifficultLevel(2);
                handleReset();
                setIsLevelClicked(false);
                break;
            case 3:
                setWordArrDiff(words.filter(el => el.length >= 7));
                setDifficultLevel(3);
                handleReset();
                setIsLevelClicked(false);
                break;
            default:
                break;
        }
    }

    const handleHint = (): void => {
        const wordLetters: string[] = wordToGuess.split('').filter(el => !guessedLetters.includes(el));
        if(wordLetters.length > 0 && hintsClickCount > 0) {
            const hintLetter = wordLetters[Math.floor(Math.random() * wordLetters.length)];
            handleButtonClick(hintLetter, keys.indexOf(hintLetter))
            setHintsClickCount(prev => prev - 1);
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
        setPressedKeys([]);
        setGameOver(false); 
    }

    const handleButtonClick = (letter: string, index: number) => {
        addGuessedLetter(letter);
        const updatedButtonClasses = [...buttonClasses];
        updatedButtonClasses[index] = wordToGuess.includes(letter) ? 'active' : 'inactive';
        setButtonClasses(updatedButtonClasses);
    };
    console.log(wordToGuess)
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
                    <p><Hint isChecked={isCheckedTheme} handleHint={handleHint} hintsClickCount = {hintsClickCount} quantityOfHints={quantityOfHints} /></p>
                </div>
                <div className="container">
                    <SliderTheme isChecked={isCheckedTheme} handleInputChange={handleSliderChange}/>
                </div>
            </div>
            <HangmanDrawing numOfGuesses={incorrectLetters.length} isChecked={isCheckedTheme} />
            <HangmanWord isSame={isSame} wordToGuess={wordToGuess} guessedLetters={guessedLetters} numOfGuesses={incorrectLetters.length} isChecked={isCheckedTheme} />
            <div style={{ alignSelf: 'stretch' }}>
                <Keyboard keys={keys} gameOver={gameOver} setGameOver={setGameOver} pressedKeys={pressedKeys} setPressedKeys={setPressedKeys} buttonClasses={buttonClasses} handleButtonClick={handleButtonClick} numOfGuesses={incorrectLetters.length} isSame={isSame} isChecked={isCheckedTheme}  />
            </div>
        </div>
    );
    
  
}

export default App
