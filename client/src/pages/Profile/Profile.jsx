import React from "react";
import { useSelector } from "react-redux";
import { Button, ButtonsContainer, EditLink, LogOutButton } from "./styles";
import authService from "../../services/authService";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux";
import { Navigate } from "react-router";
import { parseCamelCase, removeFromStorage } from "../../utils/localStorage";
import { Container } from "@mui/material";
import { ProfileInfo } from "../../components";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    user: { isAuth, userInfo },
  } = useSelector((state) => state);

  const handleLogOut = async () => {
    await authService.logout();
    dispatch(clearUser());
    removeFromStorage("userInfo");
    removeFromStorage("accessToken");
  };

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth={"sm"} sx={{ marginTop: "27px" }}>
      <p>
        You {isAuth
          ? (<> are authorizate as <label style={{ fontWeight: "600" }}> {userInfo.username}</label></>)
          : ("are not authorizate")
        }
      </p>
      <ProfileInfo />
      <ButtonsContainer>
        <LogOutButton onClick={handleLogOut} variant="contained">
          Log Out
        </LogOutButton>
        <EditLink to='/profile/edit' >
          <Button variant="contained">
            Edit profile
          </Button>
        </EditLink>
      </ButtonsContainer>
    </Container>
  );
};

export default Profile;
