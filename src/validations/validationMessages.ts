export const objectIdMessages = (label: string): Record<string, string> => ({
  "string.pattern": `"${label}" must be a valid mongo id`,
});

export const passwordMessages = {
  "string.min": "password must be at least 8 characters",
  "string.token": "password must contain at least 1 letter and 1 number",
};
