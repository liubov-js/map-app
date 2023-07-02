import React, { Dispatch, SetStateAction } from 'react';
import './Selector.css';

interface SelectorProps {
  options?: { id: number, name: string }[],
  handler: Dispatch<SetStateAction<undefined>>,
}

const Selector: React.FC<SelectorProps> = ({ options, handler }) => {
  const chooseOption = (e: any) => {
    handler(e.target.value);
  };

  return (
    <div className='SelectContainer'>
      <select className='Selector' onChange={chooseOption}>
        <option>Выбрать</option>
        {options && options.length > 0 && options.map((option: any) => {
          return (
            <option key={option.id} value={option.name}>{option.name}</option>
          );
        })}
      </select>
    </div>
  );
}

export default Selector;
