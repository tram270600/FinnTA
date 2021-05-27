import axios from 'axios'

const talker = axios.create({
    baseURL:'http://localhost:27017',
    timeout: 10000,
    headers: {'Content-Type':'application/json'},
    withCredentials: true
})

async function auth(){
    if (localStorage.getItem("jwt") == "")
        return "Not logged in"
    let res = await talker.post('/user', JSON.stringify({"jwt": localStorage.getItem("jwt")}))
    return res
}

async function login(data: {}){
    type response = {
        jwt: string
    }
    let res = await talker.post<response>('/user/login', JSON.stringify(data))
    localStorage.setItem("jwt", res.data.jwt)
}
export default {auth, login}