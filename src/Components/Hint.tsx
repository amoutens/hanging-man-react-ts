type HintProps ={
    isChecked: boolean,
    handleHint: () => void,
    hintsClickCount: number,
    quantityOfHints: number
}
export const Hint = ({ isChecked, handleHint, hintsClickCount, quantityOfHints } : HintProps) => {
    return (
        <button className={`hint-btn ${!isChecked ? '' : 'dark-theme'}`} onClick={handleHint}>
            Hint {`${hintsClickCount}/${quantityOfHints}`}
        </button>
    );
};
