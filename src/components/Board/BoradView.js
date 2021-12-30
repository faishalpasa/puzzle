import React from 'react'
import PropTypes from 'prop-types'

import ButtonPlay from 'components/ButtonPlay'
import './Board.css'

const MARGIN_Y = 32
const BOX_WIDTH_DESKTOP = 600

const BoradView = ({
  boardRef,
  countdownTime,
  handleClickBox,
  imageUrl,
  isCompleted,
  isMobile,
  isReady,
  list,
  selectedFirstBox,
  windowSize,
}) => (
  <>
    <div className={`board ${isCompleted ? 'completed' : ''}`} ref={boardRef}>
      {list.map((data, idx) => {
        const position = data.split(',')
        const [positionY, positionX] = position
        const rows = Math.sqrt(list.length)
        const boxWidth = isMobile ? (windowSize.width - MARGIN_Y) : BOX_WIDTH_DESKTOP

        const backgroundPosition = `${(boxWidth / rows) * positionY}px ${(boxWidth / rows) * positionX}px`
        const backgroundSize = isMobile ? `calc(100vw - ${MARGIN_Y}px) calc(100vw - ${MARGIN_Y}px)` : `${BOX_WIDTH_DESKTOP}px ${BOX_WIDTH_DESKTOP}px`
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
              backgroundPosition,
              backgroundSize,
            }}
          />
        )
      })}
      {isReady && <div className="ready">{countdownTime / 1000}</div>}
    </div>

    {isCompleted && !isReady && (
      <div className="button-play-wrapper">
        <ButtonPlay />
      </div>
    )}
  </>
)

BoradView.propTypes = {
  boardRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  countdownTime: PropTypes.number.isRequired,
  handleClickBox: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isReady: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFirstBox: PropTypes.string,
  windowSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
}

export default BoradView
