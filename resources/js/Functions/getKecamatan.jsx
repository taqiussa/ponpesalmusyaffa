import axios from "axios"

const getKecamatan = async (cityCode) => {
    try {
        const response = await axios.post(
            route('get-kecamatan', { cityCode }))
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getKecamatan