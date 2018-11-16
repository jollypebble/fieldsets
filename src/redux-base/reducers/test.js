const initialState = {
  message: 'hello'
};

export default function test(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
