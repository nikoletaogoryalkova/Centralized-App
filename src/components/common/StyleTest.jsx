import React, { Component } from 'react';
import Select from 'react-select';

export default function StyleTest(props) {

  const { selectedOption } = '';

  return (
    <div className="container">
      <div className="no-entries-message">
        <h3 style={{ textAlign: 'center', padding: '20px' }}>
          There are no reservation requests. If someone requests to book your property, it will appear here.
        </h3>
      </div>
    </div>
  );
}