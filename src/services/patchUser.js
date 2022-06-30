export const patchUser = async (id, postData) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/merge-patch+json",
    },
    body: JSON.stringify(postData),
  };

  const response = await fetch(
    `http://localhost:8080/api/users/${id}`,
    requestOptions
  );

  const usuario = await response.json();
  return usuario;
};
