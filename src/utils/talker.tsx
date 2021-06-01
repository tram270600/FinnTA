import axios from 'axios'
import {
    loginData,
    accountData,
    updatableData,
    feed,
    department,
    resAccount
} from 'global/dataType'
import {
    toBase64
} from './converter'

const talker = axios.create({
    baseURL: 'http://localhost:27017',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

// Account
async function auth() {
    if (localStorage.getItem("jwt") === "")
        return "Not logged in"
    let res = await talker.post('/user', JSON.stringify({
        "jwt": localStorage.getItem("jwt")
    }))
    return res
}

async function login(data: loginData) {
    type response = {
        jwt: string
    }
    let res = await talker.post<response>('/user/login', JSON.stringify(data))
    localStorage.setItem("jwt", res.data.jwt)
}

async function register(data: accountData, Avatar: File) {
    toBase64(Avatar, (result: string) => {
        data.Avatar = result
    })
    await talker.post('/user/register', JSON.stringify(data))
}

async function logout() {
    await talker.get('/user/logout')
    localStorage.setItem("jwt", "")
}

async function getAccount(data: { ID: string }) {
    let res = await talker.post<resAccount>('/user', JSON.stringify(data))
    return res.data
}

async function updateAccount(data: updatableData) {
    await talker.put('/user', JSON.stringify(data))
}

// Chat
async function createRoom(data: { ID: string }) {
    type response = {
        ID: string
    }
    let res = await talker.post<response>('/chat/createRoom', JSON.stringify(data))
    return res.data.ID
}

async function sendMsg(data: { RoomID: string, Msg: string }) {
    type response = {
        ID: string
    }
    let res = await talker.put<response>('/chat', JSON.stringify(data))
    return res.data.ID
}

// Department
async function getAllDepartment() {
    let res = await talker.get<department>('/department')
    return res.data
}

// Feed
async function createFeed(data: { Detail: string }) {
    type response = {
        ID: string
    }
    let res = await talker.put<response>('/feed', JSON.stringify(data))
    return res.data.ID
}

async function getFeed(page: number) {
    type response = feed[]
    let res = await talker.get<response>('/feed' + page)
    return res.data
}

const Account = {
    auth,
    login,
    logout,
    register,
    getAccount,
    updateAccount
}

const Chat = {
    createRoom,
    sendMsg
}

const Department = {
    getAllDepartment
}

const Feed = {
    createFeed,
    getFeed
}

export default {
    Account,
    Chat,
    Department,
    Feed
}