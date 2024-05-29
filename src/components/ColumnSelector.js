// src/components/ColumnSelector.js
import React, { useState, useEffect } from 'react'

const ColumnSelector = ({ columns, setColumns }) => {
  const [leftColumns, setLeftColumns] = useState(columns)
  const [rightColumns, setRightColumns] = useState([])

  useEffect(() => {
    setLeftColumns(columns)
  }, [columns])

  const moveRight = (col) => {
    setLeftColumns(leftColumns.filter(c => c !== col))
    setRightColumns([...rightColumns, col])
    setColumns([...rightColumns, col])
  };

  const moveLeft = (col) => {
    setRightColumns(rightColumns.filter(c => c !== col))
    setLeftColumns([...leftColumns, col])
    setColumns(rightColumns.filter(c => c !== col))
  };

  const moveAllRight = () => {
    setRightColumns([...leftColumns, ...rightColumns])
    setLeftColumns([])
    setColumns([...leftColumns, ...rightColumns])
  };

  return (
    <div className="column-selector">
      <div className="container-columns">
        <h3>Available Columns</h3>
        <ul>
          {leftColumns.map(col => (
            <li key={col}>
              {col} <button onClick={() => moveRight(col)}>{'>'}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="buttons">
        <button onClick={moveAllRight}>{'>>'}</button>
      </div>
      <div className="container-selected">
        <h3>Selected Columns</h3>
        <ul>
          {rightColumns.map(col => (
            <li key={col}>
              {col} <button onClick={() => moveLeft(col)}>{'<'}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ColumnSelector;
