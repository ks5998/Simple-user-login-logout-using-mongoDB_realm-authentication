import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Contexts/user.context";
import Login from './Pages/Login.page';
import Signup from './Pages/Signup.page';
import PrivateRoute from './Pages/PrivateRoute.page';
import Home from './Pages/Home.page';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />

          {/* We are protecting our Home Page from unauthenticated users by wrapping it with PrivateRoute here. */}
          <Route element={<PrivateRoute />}>
            <Route exact path='/' element={<Home />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
