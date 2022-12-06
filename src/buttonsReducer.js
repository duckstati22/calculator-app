import { initialState } from './App';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
};

function calculate(prevOperand, curOperand, operation) {
  if (prevOperand == null) {
    return curOperand;
  }

  const previousFloated = parseFloat(prevOperand);
  const currentFloated = parseFloat(curOperand);

  function symbolsAfterDot(num) {
    return num.toString().split('.')[1].length;
  }

  let formatter;

  if (!Number.isInteger(previousFloated) && !Number.isInteger(currentFloated)) {
    const prevOperandFormatter = 10 ** symbolsAfterDot(previousFloated);
    const curOperandFormatter = 10 ** symbolsAfterDot(currentFloated);
    formatter = Math.max(prevOperandFormatter, curOperandFormatter);
  }

  switch (operation) {
    case '÷':
      return formatter
        ? (previousFloated * formatter) /
            (currentFloated * formatter) /
            formatter
        : previousFloated / currentFloated;
    case '×':
      return formatter
        ? (previousFloated * formatter * (currentFloated * formatter)) /
            formatter
        : previousFloated * currentFloated;
    case '+':
      return formatter
        ? (previousFloated * formatter + currentFloated * formatter) / formatter
        : previousFloated + currentFloated;
    case '−':
      return formatter
        ? (previousFloated * formatter - currentFloated * formatter) / formatter
        : previousFloated - currentFloated;
    default:
      throw new Error('Error in calculate funciton');
  }
}

export default function buttonsReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if (state.calculated && !state.previousOperand) {
        return {
          ...initialState,
          currentOperand: action.value,
        };
      }
      if (state.currentOperand === '0' && action.value === '0') {
        return state;
      }
      if (!state.currentOperand && action.value === '.') {
        return state;
      }
      if (
        state.currentOperand &&
        state.currentOperand.includes('.') &&
        action.value === '.'
      ) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${action.value}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (action.value === 'C') {
        return { ...initialState };
      }
      if (action.value === 'DEL') {
        if (state.calculated) return { ...initialState };
        if (!state.currentOperand) return state;
        return {
          ...state,
          currentOperand: state.currentOperand.substring(
            0,
            state.currentOperand.length - 1
          ),
        };
      }
      if (action.value === '=') {
        if (state.previousOperand && !state.currentOperand) {
          return {
            ...state,
            previousOperand: null,
            operator: null,
            currentOperand: state.previousOperand,
          };
        }
        return {
          ...state,
          calculated: true,
          previousOperand: null,
          operator: null,
          currentOperand: calculate(
            state.previousOperand,
            state.currentOperand,
            state.operator
          ),
        };
      }
      if (!state.currentOperand) {
        return {
          ...state,
          operator: action.value,
        };
      }
      return {
        ...state,
        previousOperand: calculate(
          state.previousOperand,
          state.currentOperand,
          state.operator
        ),
        operator: action.value,
        currentOperand: null,
      };

    default:
      throw new Error('Error in reducer funciton');
  }
}
