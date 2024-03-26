import React from 'react';

type HangmanWordProps = {
    wordToGuess: string,
    guessedLetters: string[],
    numOfGuesses: number,
    isChecked : boolean
}

export const HangmanWord = ({wordToGuess, guessedLetters, numOfGuesses, isChecked}: HangmanWordProps) => {
    const word = wordToGuess;
    const missingLetters = wordToGuess.split('').filter(el => !guessedLetters.includes(el));
    const isGameOver = numOfGuesses >5;

    return (
        <div style={{
            display: 'flex',
            gap: '.25em',
            fontSize: '6rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontFamily: 'monospace'
        }}>
            {word.split('').map((letter, index) => {
                const isGuessed = guessedLetters.includes(letter);
                const isMissing = missingLetters.includes(letter);
                let textColor = 'transparent';

                if (isGuessed) {
                    textColor = !isChecked ? 'black' : 'white';
                } else if (isGameOver && isMissing) {
                    textColor = !isChecked ? 'red': "#FF7F50"	;
                }

                return (
                    <span key={index} style={{
                        borderBottom: `.1em solid ${!isChecked? "black" : 'white'}`,
                        color: textColor,
                        transition: '0.2s'
                    }}>
                        <span>
                            {letter}
                        </span>
                    </span>
                );
            })}
        </div>
    );
};
