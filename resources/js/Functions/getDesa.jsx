import axios from "axios"

const getDesa = async (districtCode) => {
    try {
        const response = await axios.post(
            route('get-desa', { districtCode }))
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getDesa