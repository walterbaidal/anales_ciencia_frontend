export const putElement = async (endpoint, id, postData) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  };

  const response = await fetch(
    `http://localhost:8080${endpoint}/${id}`,
    requestOptions
  );

  const usuario = await response.json();
  return usuario;
};
