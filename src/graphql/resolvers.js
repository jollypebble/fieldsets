
export const resolvers = {
  Mutation: {
    focusCircle: ( object, variables, { cache } ) => {
      console.log('Focus Circle');
      const focusedCircle = {
        id: variables.id,
        centerX: variables.centerX,
        centerY: variables.centerY,
        __typename: 'Circle'
      };
      cache.writeData({ data: { currentFocus: focusedCircle } });
      // const event_focusCircleSet = new Event('focusCircleSet', { bubbles: true });
      // document.dispatchEvent(event_focusCircleSet);
      return focusedCircle;
    },
  }
};
