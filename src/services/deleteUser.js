export const deleteUser = async (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { accept: "*/*" },
  };

  await fetch(`http://localhost:8080/api/users/${id}`, requestOptions);
};
