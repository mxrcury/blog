import { Input, UsersContainer } from "./styles";
import React, { ChangeEvent, useEffect, useState } from "react";
import useInput from "./../../hooks/useInput";
import UserService from "../../services/userService";
import { useDispatch, useSelector } from "../../redux";
import { setUsers } from "../../redux/slices/user";
import { Button, Pagination } from "@mui/material";
import { UsersList } from "../../components/Users/UsersList";

const Users = (): JSX.Element => {
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState<{ currentPage: number; totalPages: number }>({
        currentPage: 1,
        totalPages: 0,
    });
    const {
        value: { search },
        onChange,
    } = useInput("search");

    const { users } = useSelector(({ user }) => user);
    useEffect(() => {
        async function fetchUsers() {
            const response = await UserService.getUsers(pagination.currentPage);
            setPagination({ ...pagination, totalPages: response.totalCounts });
            dispatch(setUsers({ ...response }));
        }
        fetchUsers();
    }, [pagination.currentPage]);

    const handlePaginationChange = (e: ChangeEvent<unknown>, currentPage: number) => {
        setPagination({ ...pagination, currentPage });
    };

    const searchUser = () => {
        // TODO:Here has to be implementation for searching user by input and on button click
        // so it has to be new endpoint on back end
    };
    console.log(users.results);

    return (
        <UsersContainer>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                <Input
                    id="outlined-multiline-static"
                    name="search"
                    type="text"
                    value={search.value}
                    onChange={onChange}
                    placeholder="Search a user"
                />
                <Button sx={{ marginLeft: "10px" }} variant="contained">
                    Search
                </Button>
            </div>
            <UsersList users={users.results} />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
                <Pagination
                    count={Math.floor(pagination.totalPages / 3) - 1}
                    page={pagination.currentPage}
                    color="primary"
                    onChange={handlePaginationChange}
                />
            </div>
        </UsersContainer>
    );
};

export default Users;
