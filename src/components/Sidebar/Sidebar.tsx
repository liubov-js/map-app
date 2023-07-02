import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Selector from '../Selector/Selector';
import { add } from '../../features/map/mapSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './Sidebar.css';

interface SidebarProps {
  newCoords: number[] | undefined,
  handler: () => void,
}

const Sidebar: React.FC<SidebarProps> = ({ newCoords, handler }) => {
  const [address, setAddress] = useState('Не выбран');
  const [descriptions, setDescriptions] = useState();
  const [titles, setTitles] = useState();
  const [description, setDescription] = useState(undefined);
  const [title, setTitle] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('https://run.mocky.io/v3/6102c1b2-254f-4b7c-addb-67d4df752866')
      .then(res => {
        setDescriptions(res.data.reference.descriptions);
        setTitles(res.data.reference.titles);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (newCoords) {
      axios
        .get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${newCoords[0]}&lon=${newCoords[1]}`)
        .then(res => setAddress(res.data.display_name))
        .catch(err => console.log(err));
    }
  }, [newCoords]);

  const addAddress = () => {
    if (newCoords && title && description) {
      dispatch(add({
        marker: newCoords,
        title,
        description,
      }));
      handler();
    }
  };

  return (
    <div className="SidebarContainer">
      <span className='CloseCross' onClick={handler}>x</span>
      <div className='Header'>Выберите адрес на карте</div>
      <div className='Address'>Адрес: {address}</div>
      <Selector options={titles} handler={setTitle} />
      <Selector options={descriptions} handler={setDescription} />
      <Button text='Добавить' handler={addAddress} disabled={(!(newCoords && title && description))} />
    </div>
  );
}

export default Sidebar;
