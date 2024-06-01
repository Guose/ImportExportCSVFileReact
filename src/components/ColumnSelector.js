// src/components/ColumnSelector.js
import React, { useState, useEffect } from 'react'
import './ColumnSelectorStyle.css'

const ColumnSelector = ({ columns, setColumns }) => {
  const [leftColumns, setLeftColumns] = useState(columns)
  const [rightColumns, setRightColumns] = useState([])
  const [selectedLeftColumns, setSelectedLeftColumns] = useState([])
  const [selectedRightColumns, setSelectedRightColumns] = useState([])

  useEffect(() => {
    setLeftColumns(columns)
  }, [columns])

  const handleSelectedLeftColumn = (col) => {
    setSelectedLeftColumns(prev => 
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    )
  }

  const handleSelectedRightColumn = (col) => {
    setSelectedRightColumns(prev => 
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    )
  }

  const moveSelectedRight = () => {
    setLeftColumns(leftColumns.filter(c => !selectedLeftColumns.includes(c)))
    setRightColumns([...rightColumns, ...selectedLeftColumns])
    setColumns([...rightColumns, ...selectedLeftColumns])
    setSelectedLeftColumns([])
  }

  const moveSelectedLeft = () => {
    setRightColumns(rightColumns.filter(c => !selectedRightColumns.includes(c)))
    setLeftColumns([...leftColumns, ...selectedRightColumns])
    setColumns(rightColumns.filter(c => !selectedRightColumns.includes(c)))
    setSelectedRightColumns([])
  }

  const moveAllRight = () => {
    setRightColumns([...rightColumns, ...leftColumns])
    setLeftColumns([])
    setColumns([...rightColumns, ...leftColumns])
    setSelectedLeftColumns([])
  }

  const moveAllLeft = () => {
    setLeftColumns([...leftColumns, ...rightColumns])
    setRightColumns([])
    setColumns([...leftColumns, rightColumns])
    setSelectedRightColumns([])
  }

  return (
    <div className="column-selector">
      <div className="container-columns">
        <h3>Available Columns</h3>
        <ul className='col-list-items'>
          {leftColumns.map(col => (
            <li key={col} className={selectedLeftColumns.includes(col) ? 'selected' : ''} onClick={() => handleSelectedLeftColumn(col)}>
              {col}
            </li>
          ))}
        </ul>
      </div>
      <div className="buttons">
        <button onClick={moveSelectedRight} disabled={selectedLeftColumns.length === 0}>{'>'}</button>
        <button onClick={moveAllRight} disabled={leftColumns.length === 0}>{'>>'}</button>
        <button onClick={moveAllLeft} disabled={rightColumns.length === 0}>{'<<'}</button>
        <button onClick={moveSelectedLeft} disabled={selectedRightColumns.length === 0}>{'<'}</button>
      </div>
      <div className="container-selected">
        <h3>Selected Columns</h3>
        <ul className='col-list-items'>
          {rightColumns.map(col => (
            <li key={col} className={selectedRightColumns.includes(col) ? 'selected' : ''} onClick={() => handleSelectedRightColumn(col)}>
              {col} 
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ColumnSelector
