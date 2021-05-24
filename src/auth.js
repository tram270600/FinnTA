import React, {useState, useEffect} from 'react';

function Auth(){
    const [value, setValue] = useState('');
    useEffect(()=>{
        (async()=>{
            const respone = await fetch('http://localhost:27017/user',{
                headers: {'Content-Type':'application/json'},
                credentials: 'include',
            });
            const content = await respone.json();
            console.log(content);
            setValue(content.Email);
        })();
    },[]);

    return(
        <div>{value ? 'Hi ' + value : "ur not logged in"}</div>
    )
}

export default Auth;