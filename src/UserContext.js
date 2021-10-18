import React, {useState} from 'react';

const UserContext = React.createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState();
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentList, setCurrentList] = useState();

    return (
        <UserContext.Provider value={{user: user, setUser: setUser, loggedIn: loggedIn, setLoggedIn: setLoggedIn, currentList: currentList, setCurrentList: setCurrentList}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
export {UserProvider};