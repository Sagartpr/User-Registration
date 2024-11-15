import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isRegistered, setRegistered] = useState(false);
  

  return (
    <div>
      {!isAuthenticated && !isRegistered && <Register setRegistered={setRegistered} />}
      {!isAuthenticated && isRegistered && <Login setAuthenticated={setAuthenticated} />}
      {isAuthenticated && <Home/>}
    </div>
  );
};

export default App;
