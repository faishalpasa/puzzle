import React from 'react'

import './ButtonPlay.css'

const ButtonPlayView = () => {
  const handleClickButton = () => window.location.reload()
  return (
    <button className="button-play" type="button" onClick={handleClickButton}>
      Play Again
    </button>
  )
}

export default ButtonPlayView
