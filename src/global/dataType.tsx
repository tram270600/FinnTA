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
    uid?: string,
    c_id: string,
    price: number,
    duration: string,
    GPA: number,
    description: string,
    available: boolean,
}

type feedback = {
    _id?: string,
    s_id?: string,
    class_id: string,
    detail: string,
    Rate: number,
}

type resFeedback = {
    "Feedback": feedback[],
    "User": {
        [_id: string]:
        {
            _id: string,
            Name: string,
            Avatar: string
        }
    },
}

type schedule = {

}

export type {
    SignUpAccountData, resAccount, loginData, updatableData,
    room, chat,
    department,
    feed,
    classroom, schedule,
    feedback, resFeedback
}