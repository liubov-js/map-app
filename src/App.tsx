import React, { useState } from 'react';
import Map from './components/Map/Map';
import Sidebar from './components/Sidebar/Sidebar';
import Button from './components/Button/Button';
import './App.css';

const App = () => {
  const [isSidebar, setIsSidebar] = useState(false);
  const [newCoords, setNewCoords] = useState();

  const toggleSidebar = () => {
    setIsSidebar(prevState => !prevState);
  };

  return (
    <>
      <Map setNewCoords={setNewCoords} isSidebar={isSidebar} />
      {
        isSidebar ? (
          <Sidebar handler={toggleSidebar} newCoords={newCoords} />
        ) : (
          <Button text='Добавить адрес' handler={toggleSidebar} />
        )
      }
    </>
  );
}

export default App;
