  import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import About from "./components/About";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import Cart from "./components/Cart";
import Detail from "./components/Detail";
import Ops from "./components/Ops";
import "./App.css";
import { loadCategories, loadSamples, loadTests, loadOrders } from "./reducer";
import {
  getCategories,
  getOrders,
  getSamples,
  getTests,
  getCovidTests
} from "./utils/request";
import TestList from "./containers/TestList";
import Quoter from "./components/Quoter";
import Results from "./components/Results";
import Payments from "./components/Payments";
import User from "./components/User";
import Footer from "./components/Footer";
import CovidTests from "./containers/CovidTests";
import Appointment from "./components/UserRoutes/Appointment"
import Orders from "./components/UserRoutes/Orders"
import Profile from "./components/UserRoutes/Profile"
import Reviews from "./components/UserRoutes/Reviews"
import UserResults from "./components/UserRoutes/UserResults"


export default function App() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.sessionId?.token);
  const usuario = useSelector((state) => state.sessionId?.name)


  getTests((tests) => dispatch(loadTests(tests)));
  getCovidTests((tests) => dispatch(loadTests(tests)));
  getSamples((samples) => dispatch(loadSamples(samples)));
  getCategories((categories) => dispatch(loadCategories(categories)));

  if (token) {
    getOrders((orders) => dispatch(loadOrders(orders)), token);
  }
  // function requireAuth(nextState, replace) {
  //   if (token !== "undefined") {
  //     replace({
  //       pathname: '/home',
  //       state: { nextPathname: nextState.location.pathname }
  //     })
  //   }
  // }
// console.log(usuario.toString())

  return (
    <div className="App">
      <NavBar />
      <div className="route">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tests" element={<TestList />} />
          <Route path="/covid" element={<CovidTests />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/*" element={<Ops />} />
          <Route path="/quoter" element={<Quoter />} />
          <Route path="/results" element={<Results />} />
          <Route path="/payments" element={<Payments />} />
          {/* <Route path="/user" element={<User />}  onEnter={requireAuth}  /> */}
          {/* pregunta si hay algo en el token al momento de buscar la url user si no tiene nada manda al componente de error */ }
          {/* modifica la url con el nombre del usuario (`/user/${usuario}`) */ }
          <Route path={`/user`} element={!token ? <Navigate to="/*" /> : <User />}>
            <Route path="profile" element={<Profile/>} />
            <Route path="orders" element={<Orders/>} />
            <Route path="result&payment" element={<UserResults/>} />
            <Route path="appointment" element={<Appointment/>} />
            <Route path="reviews" element={<Reviews/>} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
