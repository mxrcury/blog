import React from 'react'
import { useSelector } from 'react-redux';
import { Button } from './styles';
import authService from '../../services/authService';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux';
import { Navigate } from 'react-router';
import { removeFromStorage } from '../../utils/localStorage';

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state=>state)

  const handleLogOut = async () => {
    await authService.logout()
    dispatch(clearUser())
    removeFromStorage('username')
    removeFromStorage('accessToken')
  }

  console.log(user);
  
  if(!user.isAuth) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <div style={{marginLeft:'8px'}}>
        <p>Your username: {user.username}</p>
        <p> Are you authorizate {JSON.stringify(user.isAuth)} </p>
      </div>
      {/* <div style={{marginBottom:'30px', width:'200px'}} className="">{user.token}
</div> */}
      <Button onClick={handleLogOut} variant='contained'>
        Log Out
      </Button>
    </>
  )
}

export default Profile
