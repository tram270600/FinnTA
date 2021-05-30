import axios from 'axios'

const talker = axios.create({
    baseURL: 'http://localhost:27017',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

type accountData = {
    Email: string,
    Password: string,
    Name: string,
    Avatar: string,
    DoB: string, // Date.toISOString()
    D_id: string,
    Bio: string,
    Role: string //T.A or Student
}

async function auth() {
    if (localStorage.getItem("jwt") === "")
        return "Not logged in"
    let res = await talker.post('/user', JSON.stringify({
        "jwt": localStorage.getItem("jwt")
    }))
    return res
}

async function login(data: {}) {
    type response = {
        jwt: string
    }
    let res = await talker.post<response>('/user/login', JSON.stringify(data))
    localStorage.setItem("jwt", res.data.jwt)
}

async function register(data: accountData, Avatar: File) {
    getBase64(Avatar, (result: string) => {
        data.Avatar = result
    })
    await talker.post('/user/register', JSON.stringify(data))
}

async function logout() {
    await talker.get('/user/logout')
}

async function getAccount(data: { ID: string }) {
    let res = await talker.post('/user', JSON.stringify(data))
    return res
}

async function updateAccount(data: {}) {
    await talker.put('/user', JSON.stringify(data))
}

async function createRoom(data: { ID: string }) {
    let res = await talker.post('/chat/createRoom', JSON.stringify(data))
    return res
}

async function sendMsg(data: { RoomID: string, Msg: string }) {
    await talker.put('/chat', JSON.stringify(data))
}

// Convert file to base64
function getBase64(file: File, cb: Function) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

export default {
    auth,
    login,
    register
}