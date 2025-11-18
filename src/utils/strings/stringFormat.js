export const formatString = (text) => {
  if (text === null || text === undefined) return "";

  // Convert to string
  let str = String(text).trim();

  if (!str) return "";

  // Convert camelCase → snake_case first
  str = str.replace(/([a-z])([A-Z])/g, "$1_$2");

  // Replace hyphens → underscores
  str = str.replace(/[-\s]+/g, "_");

  // Convert to lowercase and split by underscore
  return str
    .toLowerCase()
    .split("_")
    .filter(Boolean) // remove empty chunks
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
