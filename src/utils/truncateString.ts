export const getTruncateString = (text: any, length: number) => {
  if (!text) text = "";

  if (text?.length > length) {
    return `${text?.substring(0, length)}...`;
  }
  return text;
};
