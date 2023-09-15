export const isExistItem = (array: any[], id: number): boolean => {
  for (const item of array) {
    if (item.id === id) {
      return true;
    }
  }
  return false;
};
