

export const Hint = ({ isChecked, handleHint, clickCount, quantityOfHints }: { isChecked: boolean, handleHint: () => void,
     clickCount: number, quantityOfHints: number}) => {
    return (
        <button className={`hint-btn ${!isChecked ? '' : 'dark-theme'}`} onClick={handleHint}>
            Hint {`${clickCount}/${quantityOfHints}`}
        </button>
    );
};
