

export const Hint = ({ isChecked, handleHint, hintsClickCount, quantityOfHints }: { isChecked: boolean, handleHint: () => void,
    hintsClickCount: number, quantityOfHints: number}) => {
    return (
        <button className={`hint-btn ${!isChecked ? '' : 'dark-theme'}`} onClick={handleHint}>
            Hint {`${hintsClickCount}/${quantityOfHints}`}
        </button>
    );
};
