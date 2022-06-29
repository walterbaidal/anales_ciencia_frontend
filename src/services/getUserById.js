export const getUserById = async (id) => {
  const response = await fetch(`http://localhost:8080/api/users/${id}`);
  const usuario = await response.json();
  return usuario;
};
