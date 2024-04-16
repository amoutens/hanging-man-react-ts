import React, { useEffect } from "react";


export const Keyboard = ({keys, handleButtonClick, numOfGuesses, buttonClasses, isSame, isChecked, pressedKeys, setPressedKeys, gameOver, setGameOver }:
    {keys:string[], handleButtonClick: (letter: string, index:number) => void, numOfGuesses: number, buttonClasses: string[],
         isSame: boolean, isChecked : boolean, pressedKeys: string[], setPressedKeys: (arr: string[]) => void, gameOver: boolean, setGameOver: (state: boolean) => void}) => {
    

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
        className="keyboard">
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
