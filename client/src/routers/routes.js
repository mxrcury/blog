import { Routes, Route } from "react-router"
import { ROUTES } from "./data"

const routes = () => {
    return (
        <>
         <Routes>
            {ROUTES.map(route=><Route path={route.path} element={<route.element />} />)}
         </Routes>
        </>
    )
}

export default routes