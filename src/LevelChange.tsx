import React from 'react';

export const LevelChange = ({ isCheckedTheme, selectDifficulty, setIsLevelClicked }: {
  isCheckedTheme: boolean,
  selectDifficulty: (index: number) => void,
  setIsLevelClicked: (w:boolean) => void
}) => {
  const levelListRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (levelListRef.current && !levelListRef.current.contains(event.target as Node)) {
        setIsLevelClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsLevelClicked]);

  const items = ['Random word', 'Easy: 4 letters', 'Medium: 5-6 letters', 'Hard: 7+ letters'];

  return (
    <ul ref={levelListRef} className={`level-list ${!isCheckedTheme ? '' : 'dark-theme'}`}>
      {items.map((item, index) => (
        <li key={index} onClick={() => selectDifficulty(index)} className={`${!isCheckedTheme ? '' : 'dark-theme'}`}>
          {item}
        </li>
      ))}
    </ul>
  );
};
