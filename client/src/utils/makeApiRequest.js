import axios from "axios";

const makeApiRequest = async (
  type,
  url,
  auth = false,
  body = {},
  filePresent = false,
  uploadProgressEventHandler
) => {
  if (!type || !url) {
    return {
      error: true,
      logout: false,
      message: "Something went wrong. Please try again."
    };
  }

  if (type !== "GET" && type !== "POST") {
    return {
      error: true,
      logout: false,
      message: "Something went wrong. Please try again."
    };
  }

  const headers = {};
  let data;
  let bearerToken = "";
  if (auth) {
    const jwt = localStorage.getItem("jwt");
    bearerToken = `Bearer ${jwt}`;
    if (!bearerToken) {
      return {
        error: true,
        logout: true,
        message: "You have been logged out. Please login again."
      };
    }
    headers.Authorization = bearerToken;
  }

  if (filePresent) {
    headers["Content-Type"] = "multipart/form-data";
    data = new FormData();
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  } else {
    data = { ...body };
  }

  try {
    let response;
    if (type === "POST") {
      response = await axios.post(`/${url}`, data, {
        headers,
        onUploadProgress: uploadProgressEventHandler
      });
    } else if (type === "GET") {
      response = await axios.get(`/${url}`, {
        ...data,
        headers
      });
    }
    return {
      error: false,
      logout: false,
      message: response.data.message,
      response: response.data
    };
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.status === 401) {
        localStorage.removeItem("jwt");
        return {
          error: true,
          logout: true,
          message: "You have been logged out. Please login again."
        };
      }
      return {
        error: true,
        logout: false,
        message: error.response.data.message
      };
    }

    if (error.message && error.message.includes("Network Error")) {
      return {
        error: true,
        logout: false,
        message:
          "You are not connected to the internet. Please connect and try again."
      };
    }

    return {
      error: true,
      logout: false,
      message: "Something went wrong. Please try again."
    };
  }
};

export default makeApiRequest;
