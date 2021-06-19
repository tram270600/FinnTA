import React, { useState } from 'react'
import 'styles/Chat.scss'
import Search from 'images/search.svg'
import ChatItem from './ChatItem'
import avatar from 'images/avatar.png'
import file from 'images/file.svg'
import more from 'images/more.svg'
import add from 'images/add.svg'
import emoji from 'images/emoji.svg'
import send from 'images/send.svg'
import { Grid } from '@material-ui/core'
import OtherMessage from './OtherMessage'
import MyMessage from './MyMessage'

const Chat = () => {

    const [search, setSearch] = useState("")
    const [mss, setMss] = useState("")

    const chatList = []
    const mssList = []
    for (let i = 0; i <= 10; i++) {
        chatList.push(
            <Grid item>
                <ChatItem
                    src={avatar}
                    name="Mario Nguyen"
                    time="1 mininute ago"
                    mss="Most of its text is made up from sections 1.10.32–3 of Cicero's De finibus bonorum et malorum"
                />
            </Grid>
        )
    }
    for (let i = 0; i <= 10; i++) {
        mssList.push(
            <Grid item >
                <OtherMessage
                    content="Hello! Finally found the time to write to you I need your help in creating interactive animations for my mobile."
                />
            </Grid>
        );
        mssList.push(
            <Grid item>
                <MyMessage
                    content="Hello! Finally found the time to write to you I need your help in creating interactive animations for my mobile."
                />
            </Grid>
        )
    }
    return (
        <div className='chat-container'>
            <div className='chat-list'>
                <div className='chat-head'>
                    <div className='title'>
                        <span className='span1'>Chats</span>
                        <span className='span2'>Recent Chats</span>
                    </div>
                    <div className='button'>
                        <button>+ Create New Chat</button>
                    </div>
                </div>
                <div className='chat-search'>
                    <img src={Search} alt='Search' />
                    <input value={search} type='text' placeholder='Search' onChange={event => setSearch(event.target.value)} />
                </div>
                <div className='chat-grid'>
                    <Grid container spacing={4}>
                        {chatList}
                    </Grid>
                </div>
            </div>
            <div className='chat-view'>
                <div className='chat-view-title'>
                    <div className='infor'>
                        <img src={avatar} alt='avt' />
                        <span>Mario Nguyen</span>
                    </div>
                    <div className='choice'>
                        <img src={file} alt='file' />
                        <img src={more} alt='more' />
                    </div>
                </div>
                <div className='chat-view-content'>
                    <Grid container spacing={2}>
                        {mssList}
                    </Grid>
                </div>
                <div className='chat-view-box'>
                    <img className='add' src={add} alt='add' />
                    <input
                        value={mss}
                        type='text'
                        placeholder='Type a message here'
                        onChange={(event) => setMss(event.target.value)}
                    />
                    <img className='emoji' src={emoji} alt='emoji' />
                    <img className='send' src={send} alt='send' />
                </div>
            </div>
        </div>
    )
}
export default Chat