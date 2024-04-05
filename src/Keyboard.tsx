import React, { useEffect } from "react";

const keys = ['a','b','c','d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w','x', 'y', 'z'];

export const Keyboard = ({ handleButtonClick, numOfGuesses, buttonClasses, isSame, isChecked, pressedKeys, setPressedKeys, gameOver, setGameOver }:
    { handleButtonClick: (letter: string, index:number) => void, numOfGuesses: number, buttonClasses: string[],
         isSame: boolean, isChecked : boolean, pressedKeys: string[], setPressedKeys: (arr: string[]) => void, gameOver: boolean, setGameOver: (state: boolean) => void }) => {
    

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const pressedKey = event.key.toLowerCase();
            if ((keys.includes(pressedKey) && !pressedKeys.includes(pressedKey) && gameOver===false)) {
                event.preventDefault();
                handleButtonClick(pressedKey, keys.indexOf(pressedKey))
                setPressedKeys([...pressedKeys, pressedKey]);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [pressedKeys, gameOver, setPressedKeys]);


    useEffect(() => {
        if (numOfGuesses > 5 || isSame) {
            setPressedKeys([]);
            setGameOver(true);
        }
    }, [numOfGuesses, isSame, setGameOver, setPressedKeys]);

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))',
                gap: '.5rem'
            }}
        >
            {keys.map((key, index) => (
                <button
                    className={`key ${!isChecked ? '' : 'dark-theme'} ${buttonClasses[index]}`}
                    onClick={() => handleButtonClick(key, index)}
                    key={key}
                    disabled={buttonClasses[index] !== '' || (numOfGuesses > 5) || isSame || gameOver}
                    onBlur={(e) => e.target.blur()}
                >
                    {key}
                </button>
            ))}
        </div>
    );
};
