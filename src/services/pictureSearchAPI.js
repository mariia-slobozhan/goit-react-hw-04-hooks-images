import axios from "axios";

export default function handleRequest(query, page) {
  axios.defaults.baseURL = "https://pixabay.com/api/";
  const key = "23875883-62ec2e0d3177fc3e314277236";
  const parameters = `?key=${key}&q=${query}&per_page=12&image_type=photo&orientation=horizontal&page=${page}`;
  return axios
    .get(parameters)
    .then((response) => {
      if (response.data.hits.length === 0) {
        return Promise.reject(
          new Error("Can not find any photos for your request")
        );
      }
      return response;
    })
    .catch((error) => {
      return error;
    });
}
