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
import styles from './Map.module.css';

interface MapProps {
  setNewCoords: Function,
  isSidebar: boolean,
}

const Map: React.FC<MapProps> = ({setNewCoords, isSidebar}) => {
  const [className, setClassName] = useState(styles['empty-markers']);
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
      setClassName(styles['empty-markers']);
    } else {
      setClassName(styles['enabled-markers']);
    }
  }, [isSidebar, addresses])

  return (
    <div className={className}>
      <MapContainer center={center} zoom={zoom} className={styles['leaflet-container']}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!isSidebar &&
          addresses.map((address, i) => {
            return (
              <Marker position={address.marker} key={i}>
                <Popup>
                  <h3 className={styles['marker-title']}>{address.title}</h3>
                  <div className={styles['marker-description']}>{address.description}</div>
                </Popup>
              </Marker>
            )
          })
        }
        {addresses.length === 0 && !isSidebar && <div className={styles['empty-text']}>Пусто</div>}
        <CurrentLocation />
        {isSidebar && <NewMarker/>}
      </MapContainer>
    </div>
  );
}

export default Map;
