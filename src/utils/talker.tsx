import axios from 'axios'
import {
    accountData,
    feed,
    resAccount,
    chat
} from 'global/dataType'
// import {
//     toBase64
// } from './converter'

export const Talker = axios.create({
    baseURL: 'http://localhost:27017',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    },
    withCredentials: true,
})

// Account
async function register(data: accountData) {
    let res = await Talker.post('/user/register', JSON.stringify(data))
    if (res.status !== 200)
        return "Error occurred during the registration."
}

async function getAccount(data: { ID: string }) {
    let res = await Talker.get<resAccount>('/user', { params: { id: data.ID } })
    if (res.status !== 200)
        return "Error occurred when getting Account."
    return res.data
}

//TA
async function getSortTA(_sort: string, _by: string, _page: string) {
    let res = await Talker.get<resAccount[]>('/user/TA', { params: { sort: _sort, by: _by, page: _page } })
    if (res.status !== 200)
        return "Error occurred when getting T.A."
    return res.data
}

// Chat

async function sendMsg(data: { RoomID: string, Msg: string }) {
    type response = {
        ID: string
    }
    let res = await Talker.put<response>('/chat', JSON.stringify(data))
    if (res.status !== 200)
        return "Error occurred when sending msg."
    return res.data.ID
}

async function getMsg(RoomID: string, page: number) {
    let res = await Talker.get<chat>('/chat', { params: { room: RoomID, page: page } })
    if (res.status !== 200)
        return "Error occurred when getting msg."
    return res.data
}

// Feed
async function createFeed(data: { Detail: string }) {
    type response = {
        ID: string
    }
    let res = await Talker.put<response>('/feed', JSON.stringify(data))
    return res.data.ID
}

async function getFeed(_page: number) {
    let res = await Talker.get<feed[]>('/feed', { params: { page: _page } })
    return res.data
}

const Account = {
    register,
    getAccount,
}

const TA = {
    getSortTA
}

const Chat = {
    sendMsg,
    getMsg
}

export default {
    Account,
    TA,
    Chat
}