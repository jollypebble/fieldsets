/* eslint-disable import/prefer-default-export */
export const createRequestTypes = (base) => {
  const res = {};
  ['REQUEST', 'SUCCESS', 'FAILURE'].forEach((type) => { res[type] = `${base}_${type}`; });
  return res;
};
