import axios from "axios";

const instance = axios.create({
  baseURL: "https://budget-app-34364.firebaseio.com/"
});

export default instance;
