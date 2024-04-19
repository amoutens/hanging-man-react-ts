import React from 'react';

type LevelChangeProps = {
  isCheckedTheme: boolean,
  selectDifficulty: (index: number) => void,
  setIsLevelClicked: (w:boolean) => void
}
export const LevelChange = ({ isCheckedTheme, selectDifficulty, setIsLevelClicked }: LevelChangeProps) => {

  const levelListRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target: HTMLElement | null = event.target as HTMLElement;
      if (levelListRef.current && !levelListRef.current.contains(target as Node) && !target?.classList.contains('level-label')) {
        setIsLevelClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsLevelClicked]);

  const items: string[] = ['Random word', 'Easy: 4 letters', 'Medium: 5-6 letters', 'Hard: 7+ letters'];

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
