export const logTimestamp = (message: string): void => {
  //UTC TIME
  console.log(`${(new Date()).toISOString()}: ${message}`);
};