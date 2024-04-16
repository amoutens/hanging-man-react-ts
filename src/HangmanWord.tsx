import React from 'react';

type HangmanWordProps = {
    wordToGuess: string,
    guessedLetters: string[],
    numOfGuesses: number,
    isChecked : boolean,
    isSame: boolean
}

export const HangmanWord = ({wordToGuess, guessedLetters, numOfGuesses, isChecked, isSame}: HangmanWordProps) => {
    const word = wordToGuess;
    const missingLetters = wordToGuess.split('').filter(el => !guessedLetters.includes(el));
    const isGameOver = numOfGuesses >5;

    return (
        <div className='word-container'>
            {word.split('').map((letter, index) => {
                const isGuessed = guessedLetters.includes(letter);
                const isMissing = missingLetters.includes(letter);
                let textColor = 'transparent';

                if (isGuessed) {
                    textColor = !isChecked ? 'black' : 'white';
                } else if (isGameOver && isMissing) {
                    textColor = !isChecked ? 'red': "#FF7F50"	;
                }
                if(isSame) {
                    textColor = !isChecked ? 'green': "#7fe757"	;
                }

                return (
                    <span key={index} style={{
                        borderBottom: `.1em solid ${!isChecked? "black" : 'white'}`,
                        color: textColor,
                        
                    }}>
                        <span>
                            {letter}
                        </span>
                    </span>
                );
            })}
            {isSame && <span>🎉</span>}
        </div>
    );
};