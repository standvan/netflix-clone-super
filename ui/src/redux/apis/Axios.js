import axios from "axios";
const Axios = axios.create({
  baseURL: "https://netflix-clone-super-server.onrender.com/api",
});
export default Axios;
