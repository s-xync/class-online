import axios from "axios";

const makeApiRequest = async (type, url, auth = false, body = {}) => {
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
  }

  try {
    let response;
    if (type === "POST") {
      if (auth) {
        response = await axios.post(
          `/${url}`,
          { ...body },
          { headers: { Authorization: bearerToken } }
        );
      } else {
        response = await axios.post(`/${url}`, { ...body });
      }
    } else if (type === "GET") {
      if (auth) {
        response = await axios.get(`/${url}`, {
          ...body,
          headers: { Authorization: bearerToken }
        });
      } else {
        response = await axios.get(`/${url}`, {
          ...body
        });
      }
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
