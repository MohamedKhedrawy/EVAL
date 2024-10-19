import { useContext, createContext, useState, Children } from "react";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const authProvider = ({Children}) => {

    const [isAuth, setIsAuth] = useState(false);
}