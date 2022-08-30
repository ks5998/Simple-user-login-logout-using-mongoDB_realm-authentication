import { Button, TextField } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Contexts/user.context';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const onFormInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

     // This function will redirect the user to the appropriate page once the authentication is done.
    const redirectNow = () => {
        const redirectTo = location.search.replace('?redirectTo=', '');
        navigate(redirectTo ? redirectTo : '/');
    }

    const loadUser = async () => {
        if (!user) {
            const fetchedUser = await fetchUser();
            if (fetchedUser) {
                redirectNow();
            }
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        try {
            const user = await emailPasswordLogin(form.email, form.password);

            if (user) {
                redirectNow();
            }
        } catch (error) {
            if (error.statusCode === 401) {
                alert("Invalid username/password. Try again!");
            } else {
                alert(error);
            }
        }
    }

  return (
    <form 
      style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto' }}>
        <h1>Login</h1>
        <TextField
          label="Email"
          type="email"
          variant='outlined'
          name="email"
          value={form.email}
          onChange={onFormInputChange}
          style={{ marginBottom: '1rem' }}
        />

        <TextField
          label="Password"
          type="password"
          variant='outlined'
          name="password"
          value={form.password}
          onChange={onFormInputChange}
          style={{ marginBottom: '1rem' }}
        />

        <Button variant='contained' color='primary' onClick={onSubmit}> Login </Button>
        <p>Don't have an account? <Link to='/signup'>Signup</Link> </p>
    </form>
  )
}

export default Login