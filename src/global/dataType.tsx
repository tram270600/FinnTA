// type SignUpAccountData = {
//     Password: string,
//     _id?: string,
//     Email: string,
//     Name: string,
//     Avatar?: string,
//     DoB?: string, // Date.toISOString() let myDob = new Date(DoB) \ myDob.toISOString()
//     D_id: string,
//     Bio?: string,
//     Role: string //T.A or Student
// }

type updatableData = {
    Password?: string,
    Name?: string,
    Avatar?: string,
    DoB?: string,
    d_id?: string,
    Bio?: string,
    Phone?: string,
    GPA?: string,
}

type SignUpAccountData = {
    Email: string,
    Role: string,
} & updatableData

type resAccount = {
    _id: string,
    isOnline: boolean,
    updated_at: string
    listSubject?: string[],
    Rate: number,
    // Email: string,
    // Name: string,
    // Avatar: string,
    // DoB: string,
    // d_id: string,
    // Bio: string,
    // Role: string,
    // Phone: string,
    // GPA: number,
} & SignUpAccountData

type loginData = {
    Email: string,
    Password: string,
}

type room = {
    _id?: string,
    uid: string[],
    last_msg: {
        sender: string,
        msg: string
    }
}

type chat = {
    _id?: string,
    room_id: string,
    sender: string,
    receiver: string,
    msg: string,
    updated_at: string
}

type department = {
    _id: string,
    name: string,
    courses: { [_id: string]: string }
}

type feed = {
    _id?: string,
    uid: string,
    detail: string,
    updated_at: string
}

type classroom = {
    _id?: string,
    uid: string,
    courseID: string,
    price: number,
    startDate: string,
    GPA: number,
    description: string,
    available: boolean,
}

type schedule = {

}

export type {
    SignUpAccountData, resAccount, loginData, updatableData,
    room, chat,
    department,
    feed,
    classroom, schedule,
}