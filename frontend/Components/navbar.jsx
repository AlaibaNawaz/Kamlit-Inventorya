import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'

import { connect } from "react-redux";
import React, { Component } from "react";

class MyNav extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/home">
            <Navbar.Brand>Kamlit Inventorya</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/products">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/inventory">
              <Nav.Link>Inventory</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/productionManagement">
              <Nav.Link>Production Management</Nav.Link>
            </LinkContainer>
            {this.props.username !== 'clerk' ?
              (<LinkContainer to="/orderDetail">
                <Nav.Link>Orders</Nav.Link>
              </LinkContainer>) : <></>
            }

          </Nav>
          <Nav className="ml-auto">

            <LinkContainer to="/logout">
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
          </Nav>

        </Container>
      </Navbar>
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
export default connect(mapStateToProps, mapDispatchToProps)(MyNav);
