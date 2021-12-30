import React from 'react'
import PropTypes from 'prop-types'

import ButtonPlay from 'components/ButtonPlay'
import './Board.css'

const BoradView = ({
  boardRef,
  handleClickBox,
  imageUrl,
  isCompleted,
  list,
  selectedFirstBox,
}) => (
  <>
    <div className={`board ${isCompleted ? 'completed' : ''}`} ref={boardRef}>
      {list.map((data, idx) => {
        const position = data.split(',')
        const [positionY, positionX] = position
        return (
          <div
            key={data}
            className={`box ${selectedFirstBox === `${idx}` ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            data-boxposition={idx}
            onMouseDown={!isCompleted ? handleClickBox : undefined}
            role="button"
            aria-hidden
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: `${positionY} ${positionX}`,
            }}
          />
        )
      })}
    </div>

    {isCompleted && (
      <div className="button-play-wrapper">
        <ButtonPlay />
      </div>
    )}
  </>
)

BoradView.propTypes = {
  boardRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  handleClickBox: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFirstBox: PropTypes.string,
}

export default BoradView
