import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Button from './components/Button/Button';
import Preloader from "./components/Preloader/Preloader";
import './App.css';

const Map = React.lazy(() => import('./components/Map/Map'));

const App = () => {
  const [isSidebar, setIsSidebar] = useState(false);
  const [newCoords, setNewCoords] = useState();

  const toggleSidebar = () => {
    setIsSidebar(prevState => !prevState);
  };

  return (
    <React.Suspense fallback={<Preloader />}>
      <Map setNewCoords={setNewCoords} isSidebar={isSidebar} />
      {
        isSidebar ? (
          <Sidebar handler={toggleSidebar} newCoords={newCoords} />
        ) : (
          <Button text='Добавить адрес' handler={toggleSidebar} />
        )
      }
    </React.Suspense>
  );
}

export default App;
