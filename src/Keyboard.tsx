import React, { useState } from 'react';

const keys = ['a','b','c','d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w','x', 'y', 'z'];

export const Keyboard = ({ handleButtonClick, numOfGuesses, buttonClasses, isSame }:
     { handleButtonClick: (letter: string, index:number) => void, numOfGuesses: number, buttonClasses: string[], isSame: boolean }) => {
   
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))',
            gap: '.5rem'
        }}>
            {keys.map((key, index) => (
                <button
                    className={`key ${buttonClasses[index]}`}
                    onClick={() => handleButtonClick(key, index)}
                    key={key}
                    disabled={buttonClasses[index] !== '' || (numOfGuesses > 5) || isSame}
                    onBlur={(e) => e.target.blur()}
                >
                    {key}
                </button>
            ))}
        </div>
    );
};
