import {ChangeEvent} from 'react'

type SliderThemeProps = {
  isChecked : boolean,
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
};
export const SliderTheme = ({isChecked, handleInputChange} : SliderThemeProps) => {
  return (
    <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={(event) => handleInputChange(event)} />
        <span className="slider round"></span>
    </label>
  )
}
