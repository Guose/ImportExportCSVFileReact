/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import DataImporter from './components/DataImporter'
import ColumnSelector from './components/ColumnSelector'
import QueryBuilder from './components/QueryBuilder'
import DataExporter from './components/DataExporter'
import './App.css'

const App = () => {
  const [columns, setColumns] = useState([])
  const [selectedColumns, setSelectedColumns] = useState([])
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const handleFileLoaded = (data) => {
    setData(data)
    setColumns(Object.keys(data[0]))
  }

  const handleQuery = (conditions) => {
    const filtered = data.filter(row => {
       return conditions.every((cond, index) => {
        const comparison = compare(row[cond.column], cond.operator, cond.value)
        if (index === 0) {
          return comparison
        } else {
          return cond.logic === 'AND' ? comparison : true
        }
      })
    })

    const orFiltered = data.filter(row => {
      return conditions.some((cond, index) => {
        const comparison = compare(row[cond.column], cond.operator, cond.value)
        if (index === 0) {
          return comparison
        } else {
          return cond.logic === 'OR' ? comparison : false
        }
      })
    })
    const finalFiltered = conditions.some(cond => cond.logic == 'OR') ? orFiltered : filtered
    setFilteredData(finalFiltered)
  }

  const compare = (a, operator, b) => {
    switch (operator) {
      case '==': return a == b
      case '!=': return a != b
      case '>': return a > b
      case '<': return a < b
      case '>=': return a >= b
      case '<=': return a <= b
      default: return false
    }
  }

  return (
    <div className="App">
      <DataImporter onDataLoaded={handleFileLoaded} />
      {columns.length > 0 && (
        <>
          <ColumnSelector columns={columns} setColumns={setSelectedColumns} />
          {selectedColumns.length > 0 && (
            <>
              <QueryBuilder columns={selectedColumns} onQuery={handleQuery} />
              {filteredData.length > 0 && (
                <div>
                  <h3>Filtered Data</h3>
                  <table>
                    <thead>
                      <tr>
                        {selectedColumns.map(col => (
                          <th key={col}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((row, index) => (
                        <tr key={index}>
                          {selectedColumns.map(col => (
                            <td key={col}>{row[col]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <DataExporter data={filteredData} filename="filtered_data.csv" />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default App
