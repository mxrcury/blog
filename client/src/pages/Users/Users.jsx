import { Input, UsersList, UserItem, UserContainer, UserLink } from './styles'
import React, { useEffect, useState } from 'react'
import useInput from './../../hooks/useInput';
import UserService from '../../services/userService';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUsers } from '../../redux/slices/user';
import { Button, Pagination } from '@mui/material';

const Users = () => {
    const dispatch = useDispatch()
    const {users} = useSelector(({user})=>user)
    const [pagination,setPagination] = useState({currentPage:1})
    const { value:{search}, onChange } = useInput('search')
  
    useEffect(()=>{
        async function fetchUsers(){
            const response = await UserService.getUsers(pagination.currentPage)
            console.log(response);
            setPagination({...pagination,totalPages:response.totalCounts})
            dispatch(setUsers({...response}))
        }
        fetchUsers()
    },[pagination.currentPage])

    const handlePaginationChange = (e,value) =>{
        setPagination({...pagination,currentPage:value})

    }


  return (
      <UserContainer>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
              <Input id="outlined-multiline-static"
                  name='search' type='text' value={search.value} onChange={onChange} placeholder='Search a user' />
                  <Button sx={{marginLeft:'10px'}} variant='contained'>Search</Button>
          </div>
          <UsersList>
                {/* REFACTOR DUDE DIVIDE ON COMPONENTS */}
              {users.results && users.results.filter(user => user.username.toLowerCase().includes(search.value.toLowerCase())).map(user => <UserLink to={`/users/${user.id}`} ><UserItem elevation={4} >
                  {user.username}
              </UserItem>
              </UserLink>)}
          </UsersList>
          {/* REFACTOR */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }} >
              <Pagination  count={Math.floor(pagination.totalPages / 3) - 1} page={pagination.currentPage} color="primary" onChange={handlePaginationChange}/>
          </div>
      </UserContainer>
  )
}

export default Users
