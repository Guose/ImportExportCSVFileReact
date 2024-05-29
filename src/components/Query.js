// src/components/QueryBuilder.js
import React, { useState } from 'react';

const QueryBuilder = ({ columns, onQuery }) => {
  const [conditions, setConditions] = useState([
    { column: '', operator: '==', value: '', logic: 'AND' }
  ]);

  const addCondition = () => {
    setConditions([...conditions, { column: '', operator: '==', value: '', logic: 'AND' }]);
  };

  const updateCondition = (index, key, value) => {
    const newConditions = conditions.slice();
    newConditions[index][key] = value;
    setConditions(newConditions);
  };

  const handleQuery = () => {
    onQuery(conditions);
  };

  return (
    <div className="query-builder">
      <h3>Query Builder</h3>
      {conditions.map((condition, index) => (
        <div key={index} className="condition-row">
          <select value={condition.column} onChange={(e) => updateCondition(index, 'column', e.target.value)}>
            <option value="">Select Column</option>
            {columns.map(col => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
          <select value={condition.operator} onChange={(e) => updateCondition(index, 'operator', e.target.value)}>
            <option value="==">Equals</option>
            <option value="!=">Not Equals</option>
            <option value=">">Greater Than</option>
            <option value="<">Less Than</option>
            <option value=">=">Greater Than or Equal To</option>
            <option value="<=">Less Than or Equal To</option>
            <option value="==">{'=='}</option>
            <option value="!=">{'!='}</option>
            <option value=">">{'>'}</option>
            <option value="<">{'<'}</option>
            <option value=">=">{'>='}</option>
            <option value="<=">{'<='}</option>
          </select>
          <input type="text" value={condition.value} onChange={(e) => updateCondition(index, 'value', e.target.value)} />
          {index > 0 && (
            <select value={condition.logic} onChange={(e) => updateCondition(index, 'logic', e.target.value)}>
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          )}
        </div>
      ))}
      <button onClick={addCondition}>Add Condition</button>
      <button onClick={handleQuery}>Query</button>
    </div>
  );
};

export default QueryBuilder;
