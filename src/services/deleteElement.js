export const deleteElement = async (endpoint, id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { accept: "*/*" },
  };

  await fetch(`http://localhost:8080${endpoint}/${id}`, requestOptions);
};
