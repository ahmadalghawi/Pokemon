export const capitalizeFirstLetter = (str: string) => {
    if (!str) return "Loading...";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };