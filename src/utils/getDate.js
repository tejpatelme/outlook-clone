export const getDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
