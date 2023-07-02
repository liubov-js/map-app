import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store';
import { setCenter } from '../../features/map/mapSlice';
import './Map.css';

interface MapProps {
  setNewCoords: Function,
  isSidebar: boolean,
}

const Map: React.FC<MapProps> = ({setNewCoords, isSidebar}) => {
  const [className, setClassName] = useState('EmptyMarkers')
  const dispatch = useDispatch();
  const addresses = useSelector((state: RootState) => state.map.addresses);
  const center = useSelector((state: RootState) => state.map.center);
  const zoom = 13;

  const CurrentLocation = () => {
    const map = useMap();

    useEffect(() => {
      map.locate().on('locationfound', (e) => {
        dispatch(setCenter(e.latlng));
        map.flyTo(e.latlng, map.getZoom());
      });
    }, []);

    return null;
  }

  const NewMarker = () => {
    useMapEvents({
      click: (e) => {
        setNewCoords(e.latlng);
      }
    });
    return null;
  }

  useEffect(() => {
    if (addresses.length === 0 && !isSidebar) {
      setClassName('EmptyMarkers')
    } else {
      setClassName('EnabledMarkers')
    }
  }, [isSidebar, addresses])

  return (
    <div className={className}>
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!isSidebar &&
          addresses.map(address => {
            return (
              <Marker position={address.marker}>
                <Popup>
                  <h3 className='MarkerTitle'>{address.title}</h3>
                  <div className='MarkerDescription'>{address.description}</div>
                </Popup>
              </Marker>
            )
          })
        }
        {addresses.length === 0 && !isSidebar && <div className='EmptyText'>Пусто</div>}
        <CurrentLocation />
        {isSidebar && <NewMarker/>}
      </MapContainer>
    </div>
  );
}

export default Map;
