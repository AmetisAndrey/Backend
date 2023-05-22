import axios from "axios";

const Fetcher = (url: string) => {
    return axios.get(url).then(data => {
        return data.data
    })
    
}

export default Fetcher;