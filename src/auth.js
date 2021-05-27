import React, {useState, useEffect} from 'react';
import talker from './utils/talker';

function Auth(){
    const [value, setValue] = useState('');
    useEffect(()=>{
        (async()=>{
            let res = await talker.auth()
            console.log(res)
            setValue(res.data.Email);
        })();
    },[]);

    return(
        <div>{value ? 'Hi ' + value : "ur not logged in"}</div>
    )
}

export default Auth;