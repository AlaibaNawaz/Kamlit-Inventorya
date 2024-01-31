import { Route, Routes } from "react-router-dom";
import Inventory from "./inventory";
import Products from "./products";
import Home from "./home";
import Login from "./login";
import Logout from "./logout";
import ProductionManagement from "./productIionManage"
import OrderDetails from "./orderDetails"
import { connect } from "react-redux";
import React, { Component } from "react";



class Routing extends Component {
  render () {
    return (
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/home" exact element={<Home abc={"abc"} />} />
        { this.props.username !== 'clerk' ? 
          <Route path="/orderDetail" exact element={<OrderDetails />} /> : <></>
        }
        <Route path="/products" exact element={<Products />} />
        <Route path="/logout" exact element={<Logout />} />
        <Route path="/inventory" exact element={<Inventory />} />
        <Route path="/productionManagement" exact element={<ProductionManagement />} />
      </Routes>
  
    );
  }
}


const mapStateToProps = (state) => {
  return {
      username: state.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Routing);