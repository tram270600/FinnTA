import {useState, useEffect} from 'react';

const useSignUpForm = () => {
    const [values, setValues] = useState({
        fullname: '',
        email: '',
        phonenumber: '',
        password:'',
        password2: '',
    });
    const [errors, setErrors] = useState({});
    const handleChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    const handleSubmit = e => {
        e.preventDefault();
    }

    return {handleChange, values};

};

export default useSignUpForm;