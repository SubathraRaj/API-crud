import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import './AddEdit.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditUser = () => {
  const { id } = useParams();
  const initialState = {
    name: '',
    email: '',
    mobile: '',
  };
  const [state, setState] = useState(initialState);
  const { name, email, mobile } = state;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user data for editing
    axios
      .get(`http://localhost:8000/api/get/${id}`)
      .then((response) => {
        const { name, email, mobile } = response.data[0];
        setState({ name, email, mobile });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !mobile) {
      toast.error('Please provide a value for each input field');
    } else {
      // Update user data
      axios
        .put(`http://localhost:8000/api/update`,id, state)
        .then(() => {
          toast.success('User updated successfully');
          setTimeout(() => navigate('/'), 500);
        })
        .catch((error) => {
          console.error(error);
          toast.error('Error updating user');
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' value={state.name} onChange={handleInputChange} />
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' value={state.email} onChange={handleInputChange} />
        <label htmlFor='mobile'>Mobile Number</label>
        <input type='number' name='mobile' value={state.mobile} onChange={handleInputChange} />
        <input type='submit' value='Update' />
        <Link to='/'>
          <input type='button' value='Go Back' />
        </Link>
      </form>
    </div>
  );
};

export default EditUser;
