import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';

import Routers from './components/Route.js';
import { Nav } from './components/all.js';




function App() {
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Routers />
      </div>
    </Router>
  );
}

export default App;
