type accountData = {
    Password: string,
    _id: string,
    Email: string,
    Name: string,
    Avatar: string,
    DoB: string, // Date.toISOString() let myDob = new Date(DoB) \ myDob.toISOString()
    D_id: string,
    Bio: string,
    Role: string //T.A or Student
}

type updatableData = {
    Password: string,
    Name: string,
    Avatar: string,
    DoB: string,
    D_id: string,
    Bio: string
}

type resAccount = {
    _id: string,
    Email: string,
    Name: string,
    Avatar: string,
    DoB: string,
    D_id: string,
    Bio: string,
    Role: string,
    isOnline: boolean,
    updated_at: string
}

type loginData = {
    Email: string,
    Password: string
}

type room = {
    _id: string,
    uid: string[],
    last_msg: {
        sender: string,
        msg: string
    }
}

type chat = {
    _id: string,
    sender: string,
    msg: string,
    updated_at: string
}

type department = {
    _id: string,
    name: string,
    courses: {
        _id: string,
        name: string
    }
}

type feed = {
    _id: string,
    uid: string,
    detail: string,
    updated_at: string
}

export type {
    accountData, resAccount, loginData, updatableData,
    room, chat,
    department,
    feed
}