import {ChangeEvent} from 'react'

export const SliderTheme = ({isChecked, handleInputChange} :
     {isChecked : boolean, handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void}) => {
        console.log(isChecked)
  return (
    <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={(event) => handleInputChange(event)} />
        <span className="slider round"></span>
    </label>
  )
}
