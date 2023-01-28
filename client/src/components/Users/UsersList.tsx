import { Link } from "@mui/material";
import React, { memo } from "react";
import { Link as RouterLink } from "react-router-dom"
import { useSelector } from "../../redux";
import { User } from "../../redux/slices/user.interface";
import { UserItem, UserLink, ListContainer } from "./styles";

interface UsersListProp {
  users: User[];
}

const UsersList = memo(({ users }: UsersListProp): JSX.Element => {
  return (
    <ListContainer>
      {users.map((user) => (
        <Link key={user.id} to={`/users/${user.id}`} component={RouterLink} >
          <UserItem elevation={4}>{user.username}</UserItem>
        </Link>
      ))}
    </ListContainer >
  );
});

/*to={`/users/${user.id}`} */
export { UsersList };
