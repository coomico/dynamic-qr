export const codeToStatus = (code: number) => {
  if (code >= 200 && code < 400) {
    return 'success';
  }

  return 'error';
};