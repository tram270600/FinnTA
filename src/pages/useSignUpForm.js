import { useState } from 'react';
import talker from 'utils/talker';

const useSignUpForm = () => {
    const [values, setValues] = useState({
        Name: '',
        Email: '',
        Phone: '',
        Password: '',
        Password2: '',
        d_id: '',
        Role: 'Student'
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    const [redirect, setRedirect] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { Password2, ...data } = values
        // if(data.Password !== Password2)
        //     setErrors("")
        try {
            await talker.Account.register({ ...data })
            setRedirect(true)
        } catch (err) {
            console.log("Error:", err.response.data)
            alert(err.response.data.msg)
        }

    }

    return { handleChange, handleSubmit, values, errors, redirect };

};

export default useSignUpForm;