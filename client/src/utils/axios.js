import axios from "axios";

BASE_URL="http://localhost:5216";

const axiosService=axios.create({baseURL:BASE_URL});

export default axiosService;