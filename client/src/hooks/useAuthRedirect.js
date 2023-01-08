import PropTypes from 'prop-types'
import { useState } from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux';

const useAuthRedirect = (authStatus, redirectUrl) => {
  const { user } = useSelector(({ user })=>({user}))
  if(user.isAuth === authStatus ){
    return <Navigate to={redirectUrl} />
  }
}

useAuthRedirect.propTypes = {}

export default useAuthRedirect