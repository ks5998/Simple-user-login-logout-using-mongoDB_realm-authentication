import React, { useContext } from 'react'
import { UserContext } from '../Contexts/user.context'
import { Button } from '@mui/material'

const Home = () => {

    const { logOutUser } = useContext(UserContext);
    const logOut = async () => {
        try {
            const loggedOut = await logOutUser();

            if (loggedOut) {
                window.location.reload(true);
            }
        } catch (error) {
            alert(error)
        }
    }
  return (
    <>
    <h1>Welcome to Expengo-mongodb</h1>
    <h1>${}</h1>
    <Button variant="contained" onClick={logOut}>Logout</Button>
    </>
  )
}

export default Home