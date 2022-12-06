import React from 'react';
import { ACTIONS } from '../buttonsReducer';

export default function OperationButton({ value, dispatch, className }) {
  function handleCLick() {
    dispatch({ type: ACTIONS.CHOOSE_OPERATION, value: value });
  }

  return (
    <button onClick={handleCLick} className={`operation-btn ${className}`}>
      {value}
    </button>
  );
}
