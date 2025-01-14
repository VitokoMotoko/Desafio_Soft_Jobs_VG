import './App.css';
import Context from './contexts/Context';
import useDeveloper from './hooks/useDeveloper';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Profile from './views/Profile'; // Esto estaba mal

const App = () => {
  const globalState = useDeveloper();

  return (
    <Context.Provider value={globalState}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registrarse' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/perfil' element={<Profile />} /> {/* Esto estaba mal*/}
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
