import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Appel à ton backend Flask
    axios.get('http://127.0.0.1:5000/')
      .then(response => {
        setMessage(response.data); // devrait contenir "Hello AgriTwin!"
      })
      .catch(error => {
        console.error("Erreur de connexion au backend :", error);
        setMessage("Impossible de joindre le backend");
      });
  }, []);

  return (
    <div>
      <h1>Test Backend</h1>
      <p>{message}</p>
    </div>
  );
}

export default Home;
