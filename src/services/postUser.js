export const postUser = async (postData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  };

  const response = await fetch(
    `http://localhost:8080/api/users`,
    requestOptions
  );

  const usuario = await response.json();
  return usuario;
};
