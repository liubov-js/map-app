import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import styles from './Preloader.module.css';

const Preloader: React.FC = () => {
  return (
    <Box className={styles.container}>
      <LinearProgress />
    </Box>
  );
}

export default Preloader;
