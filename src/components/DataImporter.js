// src/components/CsvImporter.js
import React, { useState } from 'react';

const DataImporter = ({ onDataLoaded }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const csvData = parseCSV(text);
        onDataLoaded(csvData);
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (text) => {
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
    });
    return data;
  };

  return (
    <div className="csv-importer">
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {fileName && <p>File loaded: {fileName}</p>}
    </div>
  );
};

export default DataImporter;
