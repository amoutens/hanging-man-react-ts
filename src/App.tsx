import React from 'react';
import words from './wordList.json'
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import { ResetGame } from './ResetGame';
import './style.scss'

function App() {
    const [wordToGuess, setWordToGuess] = React.useState(() => {
        return words[Math.floor(Math.random() * words.length)]
    });
    const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);
    const [incorrectLetters, setIncorrectLetters] = React.useState<string[]>([]);
    const [buttonClasses, setButtonClasses] = React.useState<string[]>(Array.from({ length: 26 }, () => ''));
    const isSame = new Set(guessedLetters).size === new Set(wordToGuess).size;
    const addGuessedLetter = (letter: string) => {
        if (wordToGuess.includes(letter) && !guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
        } else if (!incorrectLetters.includes(letter)) {
            setIncorrectLetters([...incorrectLetters, letter]);
        }
    }

    
    const isWon = () => {
        if (isSame) return 'You Won!'
        else return 'You Lose :('
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
        <>
            <div style={{
                maxWidth: '800px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                margin: '0 auto',
                alignItems: 'center'
            }}>
                <div style={{
                    fontSize: '2rem',
                    textAlign: 'center'
                }}>
                    <span>{(incorrectLetters.length > 5 || isSame) ? isWon() : 'Play Hangman!'} <ResetGame handleReset={handleReset} /></span>
                </div>

                <HangmanDrawing numOfGuesses={incorrectLetters.length} />
                <HangmanWord wordToGuess={wordToGuess} guessedLetters={guessedLetters} numOfGuesses={incorrectLetters.length} />
                <div style={{ alignSelf: 'stretch' }}><Keyboard buttonClasses={buttonClasses} handleButtonClick={handleButtonClick} numOfGuesses={incorrectLetters.length} isSame={isSame} /> </div>

            </div>
        </>
    )
}

export default App
