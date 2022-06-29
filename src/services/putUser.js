export const putUser = async (id, postData) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  };

  const response = await fetch(
    `http://localhost:8080/api/users/${id}`,
    requestOptions
  );

  const usuario = await response.json();
  return usuario;
};
