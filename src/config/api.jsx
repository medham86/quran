import axios from 'axios'

const Api = axios.create(
    {
        baseURL : 'https://mp3quran.net/api/v3',
        headers : {
            "content-type" : "application/json"
        },
        mode: 'cors',
        withCredentials : false
    }
        
)

export default Api