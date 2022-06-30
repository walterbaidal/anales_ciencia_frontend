export const postUser = async (postData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  };

  let response = {};

  try {
    response = await fetch(`http://localhost:8080/api/users`, requestOptions);
  } catch (e) {
    return e;
  }

  const usuario = await response.json();
  return usuario;
};
