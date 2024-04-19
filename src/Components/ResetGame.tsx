type ResetGameProps = {
  handleReset: ()=> void,
  isChecked : boolean
}
export const ResetGame = ({handleReset, isChecked}: ResetGameProps) => {
    
  return (
    <button className={`reset-btn ${!isChecked? '' : 'dark-theme'}`} onClick={handleReset}>Reset</button>
  )
}
