import { useEffect,lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
// import HomePage from "./pages/HomePage/HomePage";
// import RegisterPage from "./pages/RegisterPage/RegisterPage";
// import LoginPage from "./pages/LoginPage/LoginPage";
// import ContactsPage from "./pages/ContactsPage/ContactsPage";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"; 
import PrivateRoute from "./routes/PrivateRoute";
import RestrictedRoute from "./routes/RestrictedRoute";
import CircularProgress from "@mui/material/CircularProgress";

const HomePage = lazy(()=> import('./pages/HomePage/HomePage'));
const RegisterPage = lazy(()=> import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy (()=> import('./pages/LoginPage/LoginPage'));
const NotFoundPage = lazy (()=> import ('./pages/NotFoundPage/NotFoundPage'));
const ContactsPage = lazy (()=> import('./pages/ContactsPage/ContactsPage'));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser()); 
  }, [dispatch]);

  return isRefreshing ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="register"
            element={
              <RestrictedRoute>
                <RegisterPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </Layout>
  );
};

export default App;