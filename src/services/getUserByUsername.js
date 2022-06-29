export const getUserByUsername = async (nickname) => {
  const response = await fetch(
    `http://localhost:8080/api/users.json?username=${nickname}`
  );
  const usuario = await response.json();
  return usuario[0];
};
