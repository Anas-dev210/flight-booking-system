import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [passengerName, setPassengerName] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/flights', {
        passengerName: passengerName,
        flightNumber: flightNumber,
        status: status
      });
      setMessage('Flight saved successfully!');
      setPassengerName('');
      setFlightNumber('');
      setStatus('');
    } catch (error) {
      setMessage('Error saving flight');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Flight Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Passenger Name"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Flight Number"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
