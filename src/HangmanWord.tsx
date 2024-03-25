import React from 'react';

type HangmanWordProps = {
    wordToGuess: string,
    guessedLetters: string[],
    numOfGuesses: number
}

export const HangmanWord = ({wordToGuess, guessedLetters, numOfGuesses}: HangmanWordProps) => {
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
                    textColor = 'black';
                } else if (isGameOver && isMissing) {
                    textColor = 'red';
                }

                return (
                    <span key={index} style={{
                        borderBottom: '.1em solid black',
                        color: textColor
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
