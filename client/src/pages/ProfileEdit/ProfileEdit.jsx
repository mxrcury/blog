import React from "react";
import { useSelector } from "react-redux";

import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Container } from "@mui/material";

import { BackLink, FieldItem, FieldContainer } from "./styles";
import { parseCamelCase } from "../../utils/textParsers";
import useInput from "./../../hooks/useInput";
import UserService from "../../services/userService";
import { useDispatch } from "react-redux";
import { editProfileInfo } from "../../redux/slices/user";
import { getFromStorage, saveToStorage } from "../../utils/localStorage";

const ProfileEdit = () => {
    const dispatch = useDispatch();
    const { value, onChange, clearInputs } = useInput("username", "companyName", "email", "jobPosition", "skills", "age");

    const {
        user: { userInfo },
    } = useSelector((state) => state);

    const editProfileOptions = async () => {
        // Options can be only object, for array
        let options = {};
        // Loop for changing if any field was changed
        for (const option in userInfo) {
            const isOptionEmpty = value[option].value !== "";
            const isOptionChanged = value[option].value !== userInfo[option];
            if (isOptionEmpty && isOptionChanged) {
                options[option] = { value: value[option].value };
            }
        }

        await UserService.editProfile(options);
        console.log(options);
        dispatch(editProfileInfo(options));
        // options = Object.keys(options).map(option=>({...options, [option]:options[option].value}))
        options = Object.entries(options)
            .map((option) => ({ [option[0]]: option[1].value }))
            .reduce((object, field) => ({ ...object, ...field }), {});
        const userInfoFromStorage = getFromStorage("userInfo");
        const updatedUserInfo = { ...userInfoFromStorage, ...options };
        saveToStorage("userInfo", updatedUserInfo);
        clearInputs();
    };

    return (
        <Container sx={{ marginTop: "30px" }} maxWidth="sm">
            <BackLink to="/profile">
                <Button variant="contained">{`< Back`}</Button>
            </BackLink>
            <>
                {Object.entries(userInfo).map((userOption) => (
                    <FieldContainer>
                        <FieldItem>{parseCamelCase(userOption[0])}:</FieldItem>
                        {/* {console.log(userOption[1])} */}
                        <TextField
                            name={userOption[0]}
                            value={value[userOption[0]].value}
                            onChange={onChange}
                            sx={{ marginBottom: "10px" }}
                            placeholder={userOption[1]}
                            variant="outlined"
                        />
                    </FieldContainer>
                ))}
                <hr style={{ marginTop: "15px", marginBottom: "30px" }} />
            </>
            <Button variant="contained" sx={{ margin: "0 auto", display: "block" }} onClick={editProfileOptions}>
                Save changes
            </Button>
        </Container>
    );
};

export default ProfileEdit;
