export const getElementById = async (endpoint, id) => {
  const response = await fetch(`http://localhost:8080${endpoint}/${id}`);
  const element = await response.json();
  return element;
};
