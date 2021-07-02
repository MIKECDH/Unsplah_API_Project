import React from 'react';
import './App.css';
import Loader from './Components/API/Loader.js'
import Photo from './Components/API/Photo.js';


function App() {

  return (
    <div className="App">
      <Loader />
      <Photo/>
    </div>
  );
}

export default App;
