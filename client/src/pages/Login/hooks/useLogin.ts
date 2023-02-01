import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "../../../redux";
import { setUser } from "../../../redux/slices/user";
import authService from "../../../services/authService";
import { saveToStorage } from "../../../utils/localStorage";


interface IUseLogin {
  handleLogin: (username: string, email: string, password: string) => void
  error: { message: string } | {}
  isAuth: boolean
}

export const useLogin = (): IUseLogin => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<{ message: string } | {}>({});
  const { user: userData } = useSelector((state) => state);

  const handleLogin = async (username: string, email: string, password: string): Promise<void> => {
    const { user, accessToken, error } = await authService.login(username, email, password);
    if (!user) {
      setError({ message: error.message });
    }
    dispatch(setUser({ ...user, token: accessToken }));

    const userDataToStorage = {
      ...user,
    };
    saveToStorage("userInfo", userDataToStorage);
    saveToStorage("accessToken", accessToken);

    if (!!accessToken) {
      // const post = await PostService.getPosts();
      // dispatch(setPosts(post));
      navigate("/home");
    }
  };
  return { error, isAuth: !!userData.isAuth, handleLogin }
} 
