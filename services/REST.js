import Axios from "axios";

export const BASE_URL = {
  googleMap: "https://maps.googleapis.com/maps/api/"
};

class API {
  token = null;

  setToken = token => {
    this.token = token;
  };

  callApi(baseURL, endpoint, method, payload) {
    console.log(
      "calling API=--------------------",
      endpoint,
      method,
      { Authorization: this.token ? `token ${this.token}` : "" },
      payload
    );
    return Axios.create({
      baseURL,
      responseType: "json"
    }).request({
      method,
      url: endpoint,
      headers: { Authorization: this.token ? `token ${this.token}` : "" },
      data: payload
    });
  }
}

export default new API();
