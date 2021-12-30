import React, { useEffect, useState, useRef } from 'react'

import { IMAGE_DATA, IMAGE_POSITIONS } from 'constants/puzzle'
import useOutsideElementClick from 'hooks/useOutsideElementClick'
import useWindowSize from 'hooks/useWindowSize'

import BoardView from './BoradView'

const shuffledImagePosition = [...IMAGE_POSITIONS]
shuffledImagePosition.sort(() => 0.5 - Math.random())

const shuffledImageData = [...IMAGE_DATA]
shuffledImageData.sort(() => 0.5 - Math.random())
const imageRandomIndex = Math.floor((Math.random() * shuffledImageData.length))
const imageUrl = `/images/${shuffledImageData[imageRandomIndex]}.png`

const BoardContainer = () => {
  const boardRef = useRef(null)
  const windowSize = useWindowSize()
  const [selectedFirstBox, setSelectedFirstBox] = useState('')
  const [selectedSecondBox, setSelectedSecondBox] = useState('')
  const [list, setList] = useState(IMAGE_POSITIONS)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isReady, setIsReady] = useState(true)
  const [countdownTime, setCountdownTime] = useState(3000)

  const isMobile = windowSize.width < 768

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
    const myInterval = setInterval(() => {
      if (countdownTime > 0) {
        setCountdownTime(countdownTime - 1000)
      }
      if (countdownTime === 1000) {
        clearInterval(myInterval)
        setIsReady(false)
        setList(shuffledImagePosition)
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  }, [countdownTime])

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
        setIsCompleted(true)
      }, 250)
    } else {
      setIsCompleted(false)
    }
  }, [list])

  const viewProps = {
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
  }

  return (
    <BoardView {...viewProps} />
  )
}

export default BoardContainer
