import { useReducer } from 'react';
import buttonsReducer from './buttonsReducer';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';
import './style.css';

export const initialState = {
  previousOperand: null,
  currentOperand: null,
  operator: null,
  calculated: false,
};

function App() {
  const [{ previousOperand, currentOperand, operator }, dispatch] = useReducer(
    buttonsReducer,
    initialState
  );

  return (
    <div className="calc">
      <div className="calc__output output">
        <div className="output__previous">
          {previousOperand} {operator}
        </div>
        <div className="output__current">{currentOperand}</div>
      </div>
      <OperationButton value="C" dispatch={dispatch} />
      <OperationButton value="DEL" dispatch={dispatch} className="btn_large" />
      <OperationButton value="÷" dispatch={dispatch} />
      <DigitButton value="7" dispatch={dispatch} />
      <DigitButton value="8" dispatch={dispatch} />
      <DigitButton value="9" dispatch={dispatch} />
      <OperationButton value="×" dispatch={dispatch} />
      <DigitButton value="4" dispatch={dispatch} />
      <DigitButton value="5" dispatch={dispatch} />
      <DigitButton value="6" dispatch={dispatch} />
      <OperationButton value="−" dispatch={dispatch} />
      <DigitButton value="1" dispatch={dispatch} />
      <DigitButton value="2" dispatch={dispatch} />
      <DigitButton value="3" dispatch={dispatch} />
      <OperationButton value="+" dispatch={dispatch} />
      <DigitButton value="0" dispatch={dispatch} className="btn_large" />
      <DigitButton value={'.'} dispatch={dispatch} />
      <OperationButton value="=" dispatch={dispatch} />
    </div>
  );
}

export default App;
