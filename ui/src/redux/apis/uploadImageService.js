import toast from "react-hot-toast";
import Axios from "./Axios";

const uploadImageService = async (data, setLoading) => {
  try {
    setLoading(true);
    const response = await Axios.post("/upload", data);
    setLoading(false);
    toast.success("Updated successfully");
    return response.data;
  } catch (err) {
    setLoading(false);
    toast.error("Something went wrong");
  }
};

export { uploadImageService };
