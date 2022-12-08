import { useReducer } from 'react';

enum Actions {
  add,
  sub
}

function reducer(state: {count: number}, action: Actions) {
  if (action === Actions.add) {
    return { count: state.count + 1}
  }
  if (action === Actions.sub) {
    return { count: state.count - 1}
  }
  return state;
}

const initialState = {
  count: 0
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <>
    <h2>Hook: useReducer</h2>
    <div>
      <span>Count: {state.count} </span>
      <button onClick={() => dispatch(Actions.add)} type={"button"}>+</button>
      &nbsp;&nbsp;
      <button onClick={() => dispatch(Actions.sub)} type={"button"}>-</button>
    </div>
  </>

}
