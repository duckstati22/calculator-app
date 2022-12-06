import React from 'react';
import { ACTIONS } from '../buttonsReducer';

export default function DigitButton({ value, dispatch, className }) {
  function handleCLick() {
    dispatch({ type: ACTIONS.ADD_DIGIT, value: value });
  }

  return (
    <button onClick={handleCLick} className={`digit-btn ${className}`}>
      {value}
    </button>
  );
}
