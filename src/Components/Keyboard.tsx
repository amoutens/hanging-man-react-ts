import { useEffect } from "react";

type KeyboardProps = {
    handleKeyClick: (letter: string, index:number) => void,
    setPressedKeysByKeyboard: (arr: string[]) => void,
    setGameOver: (state: boolean) => void,
    keys:string[],
    numOfGuesses: number,
    buttonClasses: string[],
    isSame: boolean,
    isChecked: boolean,
    pressedKeysByKeyboard: string[],
    gameOver: boolean
}

export const Keyboard = ({keys, handleKeyClick, numOfGuesses, buttonClasses, isSame,
     isChecked, pressedKeysByKeyboard, setPressedKeysByKeyboard, gameOver, setGameOver}:
    KeyboardProps) => {

    useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        const pressedKey = event.key.toLowerCase();
        if (keys.includes(pressedKey) && !pressedKeysByKeyboard.includes(pressedKey) && !gameOver) {
            event.preventDefault();
            handleKeyClick(pressedKey, keys.indexOf(pressedKey));
            setPressedKeysByKeyboard([...pressedKeysByKeyboard, pressedKey]);
        }
    };
    
    window.addEventListener("keydown", handleKeyDown);

    return () => {
        window.removeEventListener("keydown", handleKeyDown);
    };
    }, [keys, pressedKeysByKeyboard, gameOver, handleKeyClick, setPressedKeysByKeyboard]);


    useEffect(() => {
        if (numOfGuesses > 5 || isSame) {
            setPressedKeysByKeyboard([]);
            setGameOver(true);
        }
    }, [numOfGuesses, isSame, setGameOver, setPressedKeysByKeyboard]);

    return (
        <div
        className="keyboard">
            {keys.map((key, index) => (
                <button
                    className={`key ${!isChecked ? '' : 'dark-theme'} ${buttonClasses[index]}`}
                    onClick={() => handleKeyClick(key, index)}
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
