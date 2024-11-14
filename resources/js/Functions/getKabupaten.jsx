import axios from "axios"

const getKabupaten = async (provinceCode) => {
        try {
                const response = await axios.post(
                        route('get-kabupaten', { provinceCode }))
                return response.data;
        }
        catch (error) {
                console.log(error)
        }
}

export default getKabupaten