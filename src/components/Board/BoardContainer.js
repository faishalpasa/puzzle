import React, { useEffect, useState, useRef } from 'react'

import useOutsideElementClick from 'hooks/useOutsideElementClick'
import BoardView from './BoradView'

const BOX_WIDTH = 200
const IMAGE_POSITIONS = [
  '0px,0px', `-${BOX_WIDTH * 1}px,0px`, `-${BOX_WIDTH * 2}px,0px`,
  `0px,-${BOX_WIDTH * 1}px`, `-${BOX_WIDTH * 1}px,-${BOX_WIDTH * 1}px`, `-${BOX_WIDTH * 2}px,-${BOX_WIDTH * 1}px`,
  `0px,-${BOX_WIDTH * 2}px`, `-${BOX_WIDTH * 1}px,-${BOX_WIDTH * 2}px`, `-${BOX_WIDTH * 2}px,-${BOX_WIDTH * 2}px`,
]
const IMAGE_DATA = ['mangga', 'jeruk', 'pisang', 'naga', 'nanas', 'pepaya']

const shuffledImagePosition = [...IMAGE_POSITIONS]
shuffledImagePosition.sort(() => 0.5 - Math.random())

const shuffledImageData = [...IMAGE_DATA]
shuffledImageData.sort(() => 0.5 - Math.random())
const imageRandomIndex = Math.floor((Math.random() * shuffledImageData.length))
const imageUrl = `/images/${shuffledImageData[imageRandomIndex]}.png`

const BoardContainer = () => {
  const boardRef = useRef(null)
  const [selectedFirstBox, setSelectedFirstBox] = useState('')
  const [selectedSecondBox, setSelectedSecondBox] = useState('')
  const [list, setList] = useState(shuffledImagePosition)

  const handleResetSelectedBoxes = () => {
    setSelectedFirstBox('')
    setSelectedSecondBox('')
  }

  useOutsideElementClick(boardRef, handleResetSelectedBoxes)

  const handleClickBox = (e) => {
    const position = e.target.dataset?.boxposition
    if (!selectedFirstBox) {
      setSelectedFirstBox(position)
    }
    if (selectedFirstBox && !selectedSecondBox) {
      setSelectedSecondBox(position)
    }
  }

  const moveArrayElement = (array, from, to) => {
    const firstElement = array[from]
    const secondElement = array[to]
    const newArray = [...array]
    newArray[from] = secondElement
    newArray[to] = firstElement
    return newArray
  }

  useEffect(() => {
    if (list && selectedFirstBox && selectedSecondBox) {
      const newList = moveArrayElement(list, selectedFirstBox, selectedSecondBox)
      setList(newList)
      setSelectedFirstBox('')
      setSelectedSecondBox('')
    }
  }, [selectedFirstBox, selectedSecondBox, list])

  useEffect(() => {
    if (Array.isArray(list)
    && Array.isArray(IMAGE_POSITIONS)
    && list.length === IMAGE_POSITIONS.length
    && list.every((val, index) => val === IMAGE_POSITIONS[index])) {
      setTimeout(() => {
        alert('Congratz')
      }, 250)
    }
  }, [list])

  const viewProps = {
    boardRef,
    handleClickBox,
    imageUrl,
    list,
    selectedFirstBox,
  }

  return (
    <BoardView {...viewProps} />
  )
}

export default BoardContainer
