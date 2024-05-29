// src/components/DataExporter.js
import React from 'react';
import { CSVLink } from 'react-csv';

const DataExporter = ({ data, filename }) => {
  return (
    <div className="data-exporter">
      <CSVLink data={data} filename={filename}>
        Export CSV
      </CSVLink>
    </div>
  );
};

export default DataExporter;
