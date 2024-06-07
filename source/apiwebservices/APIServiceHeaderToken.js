export const GetHeaderTokenData = token => {
  return {
    Authorization: 'Bearer ' + token,
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };
};
