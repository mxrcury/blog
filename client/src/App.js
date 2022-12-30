import { Navigate } from "react-router";
import { Navigation } from "./components";
import Routes from "./routers/routes";
import { useSelector } from 'react-redux';


function App() {
  const { isAuth } = useSelector(({user})=>({user}))

    return (
      <>
        <Navigation/>
        <Routes />
      </>
    );
}

export default App;
