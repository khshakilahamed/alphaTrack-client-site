import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login/Login';
import AuthProvider from './context/AuthProvider';
import Explore from './pages/Explore/Explore';
import Order from './pages/Order/Order';
import NotFound from './pages/NotFound/NotFound';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import UpdateProduct from './pages/Dashboard/UpdateProduct/UpdateProduct';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import ScrollToTop from './ScrollTopTop/ScrollToTop';
import BrandItems from './pages/BrandItems/BrandItems';
import BikeDetails from './pages/BikeDetails/BikeDetails';
import MessengerCustomerChat from 'react-messenger-customer-chat';


function App() {
  return (
    <div className="">
      <MessengerCustomerChat
        pageId="106925892287005"
        appId="883226362718909"
        // htmlRef="<REF_STRING>"
      />
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/explore">
              <Explore></Explore>
            </Route>
            <PrivateRoute path="/order/:id">
              <Order></Order>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/brandItems">
              <BrandItems></BrandItems>
            </Route>
            <Route path="/bikeDetails">
              <BikeDetails></BikeDetails>
            </Route>
            <PrivateRoute path="/updateProduct/:id">
              <UpdateProduct></UpdateProduct>
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
