import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blood-donation-xi-one.vercel.app",
});
const useAxios = () => {
  return axiosInstance;
};
export default useAxios;
