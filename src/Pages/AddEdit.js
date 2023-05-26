import React,  { useState} from 'react';
import { useNavigate,Link} from 'react-router-dom';
import './AddEdit.css';
import axios from 'axios';
import {toast} from 'react-toastify'

const AddUser = () => {
    const initialState = {
        name: '',
        email: '',
        mobile: ''
    }
    const [state, setState] = useState(initialState)
    const {name, email, mobile} =state;
    const navigate =useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault()
        if (!name || !email || !mobile) {
            toast.error("Please provide value into each input field")
        } else {
            axios
            .post("http://localhost:8000/api/post", {
                name,
                email,
                mobile
            })
            .then ( ()=> {
                setState({name: '', email: '', mobile: ''});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success(" User Added successfully")
            setTimeout (()=> navigate('/'), 500)
        }
    }
    const handleInputChange = (event) =>{
        console.log(event.target.name, event.target.value);
        console.log(state);
        const { name, value } = event.target;
        setState({...state, [name]: value})
    }
    return (
        <div style={{marginTop: '100px'}}>
            <form style={{
                margin:'auto',
                padding:'15px',
                maxWidth:'400px',
                alignContent: 'center'
            }}
            onSubmit={handleSubmit} >
                <label htmlFor='name'>Name </label>
                <input type='text' name='name'  onChange={handleInputChange}/>
                <label htmlFor='email'>Email </label>
                <input type='email' name='email'  onChange={handleInputChange}/>
                <label htmlFor='mobile'>Mobile Number </label>
                <input type='number' name='mobile' onChange={handleInputChange}/>
                <input type='submit' value="Save" />
                <Link to ='/'>
                    <input type='button' value= 'Go Back'/>
                </Link>
            </form>
        </div>
    );
}

export default AddUser;