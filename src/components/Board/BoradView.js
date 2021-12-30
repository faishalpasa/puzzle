import React from 'react'
import PropTypes from 'prop-types'

import './Board.css'

const BoradView = ({
  boardRef,
  handleClickBox,
  imageUrl,
  list,
  selectedFirstBox,
}) => (
  <div className="board" ref={boardRef}>
    {list.map((data, idx) => {
      const position = data.split(',')
      const [positionY, positionX] = position
      return (
        <div
          key={data}
          className={`box ${selectedFirstBox === `${idx}` ? 'active' : ''}`}
          data-boxposition={idx}
          onMouseDown={handleClickBox}
          role="button"
          aria-hidden
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: '600px 600px',
            backgroundPosition: `${positionY} ${positionX}`,
            backgroundRepeat: 'no-repeat',
          }}
        />
      )
    })}
  </div>
)

BoradView.propTypes = {
  boardRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  handleClickBox: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFirstBox: PropTypes.string,
}

export default BoradView
