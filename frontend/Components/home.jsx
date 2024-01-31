import React, { Component } from "react";
import MyNav from "./navbar";
import CheckAuth from "./checkAuth";
import picture from "../koolbulb.jpg";


class Home extends Component {
    constructor() {
        super();
        this.state = {
            username: 'dummy',
        };
    }

    render () {
        return (
            <div className="home">
                <MyNav />
                <img className="backimg" src={picture} />
                
                <div style={{ position: "absolute", top: "50%", left: "70%", transform: "translate(-50%, -50%)" }}>
                    <h1 style={{ color: "white", textAlign: "center" , fontSize : "6rem"}}>Welcome To Kamlit Inventorya</h1>
                </div>
            </div>
        );
    }
}

export default CheckAuth(Home);
{/* <div style={{float: 'left', color: 'black' , fontSize: '24px'}}>Welcom to Kamlit Inventorya</div> */}