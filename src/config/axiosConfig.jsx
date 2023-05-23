import axios from "axios";

const axiosClient = axios.create();
axiosClient.defaults.baseURL = "https://long-ruby-hatchling-shoe.cyclic.app/";

axiosClient.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// get request
export async function getRequest(url) {
  return axiosClient.get(`${url}`).then((response) => {
    return response;
  });
}

// post request
export async function postRequest(url, data) {
  return axiosClient.post(`${url}`, data).then((response) => {
    return response;
  });
}

// patch request
export async function patchRequest(url, data) {
  return axiosClient.patch(`${url}`, data).then((response) => {
    return response;
  });
}

// delete request
export async function deleteRequest(url, data) {
  return axiosClient.delete(`${url}`, data).then((response) => {
    return response;
  });
}
