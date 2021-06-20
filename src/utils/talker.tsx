import axios from 'axios'
import {
    SignUpAccountData,
    resAccount,
    chat,
    classroom,
    resFeedback,
    resClass,
    resStudentCouse,
    schedule,
    resSchedule
} from 'global/dataType'

export const Conn = axios.create({
    baseURL: 'http://localhost:27017',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    },
    withCredentials: true,
})

// Account
async function register(data: SignUpAccountData) {
    let res = await Conn.post('/user/register', JSON.stringify(data))
    if (res.status !== 200)
        return "Error occurred during the registration."
}

async function getAccount(data: { ID: string }) {
    let res = await Conn.get<resAccount>('/user', { params: { id: data.ID } })
    if (res.status !== 200)
        return "Error occurred when getting Account."
    return res.data
}

//TA
async function getSortTA(_sort: "des" | "asc", _by: "rate" | "name", _page: number, name?: string) {
    type resApi = {
        "TA": resAccount[],
        "Class": { [_id: string]: string[] },
    }
    let res = await Conn.get<resApi>('/user/TA', { params: { sort: _sort, by: _by, page: _page, name: name } })
    if (res.status !== 200) {
        alert("Error occurred when getting T.A.")
        return {} as resApi
    }
    return res.data
}

// Chat
async function sendMsg(data: { RoomID: string, Msg: string }) {
    type response = {
        ID: string
    }
    let res = await Conn.put<response>('/chat', JSON.stringify(data))
    if (res.status !== 200)
        return "Error occurred when sending msg."
    return res.data.ID
}

async function getMsg(RoomID: string, page: number) {
    let res = await Conn.get<chat>('/chat', { params: { room: RoomID, page: page } })
    if (res.status !== 200)
        return "Error occurred when getting msg."
    return res.data
}

// class
async function createClass(data: { day: { [date: string]: boolean } & classroom }) {
    const res = await Conn.put('/class', JSON.stringify(data))
    if (res.status !== 200)
        return "Error occurred when creating course."
    return
}

async function getClassroom(data: { uid?: string, page: number, keyword?: string[], available: boolean }) {
    console.log(data)
    const res = await Conn.post<resClass>('/class/get', JSON.stringify(data))
    return res.data
}

// Feedback
async function getFeedback(sort: "des" | "asc", by: "rate" | "time", page: number, id?: string) {
    let res = await Conn.get<resFeedback>('/feedback', { params: { id: id!, page: page, sort: sort, by: by } })
    return res.data
}

// Schedule
async function getStudentCourse(data: { s_id: string, page: string, available: boolean }) {
    console.log(data)
    let res = await Conn.post<resStudentCouse>("/user/student/get", JSON.stringify(data))
    return res.data
}

async function getSchedule(data: { uid?: string, s_id?: string }) {
    let res = await Conn.get<resSchedule>("/schedule", { params: data })
    return res.data
}

async function createSchedule(data: schedule) {
    let res = await Conn.post("/schedule", JSON.stringify(data))
    return res.data
}

async function confirmSchedule() {
    let res = await Conn.get("/schedule/cf")
    return res.data
}

const Account = {
    register,
    getAccount,
}

const TA = {
    getSortTA,
    getClassroom,
    createClass,
}

const Chat = {
    sendMsg,
    getMsg
}

const Feedback = {
    getFeedback,
}

const Schedule = {
    getStudentCourse,
    getSchedule,
    createSchedule,
    updateSchedule: confirmSchedule,
}

export default {
    Account,
    TA,
    Chat,
    Feedback,
    Schedule,
}