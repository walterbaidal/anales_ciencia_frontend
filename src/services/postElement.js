export const postElement = async (endpoint, postData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  };

  const response = await fetch(
    `http://localhost:8080${endpoint}`,
    requestOptions
  );

  const usuario = await response.json();
  return usuario;
};
