import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions";

function CheckAuth(OrginalComponent) {
    class NewComponent extends Component {
        componentDidMount() {
            this.props.verifyToken();
        }

        render() {
            let renderComponent = <></>;
            if (this.props.isAuthChecked) {
                if (this.props.isAuthenticated) {
                    renderComponent = <OrginalComponent {...this.props} />;
                } else {
                    renderComponent = <Navigate to="/" />
                }
            }

            return (
                <>
                    {renderComponent}
                </>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.isAuthenticated,
            isAuthChecked: state.isAuthChecked,
        };
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            onSetAuthTrue: (username) => {
                dispatch(actions.setAuthTrue(username));
            },
            verifyToken: () => {
                dispatch(actions.verifyToken());
            },
        };
    };
    return connect(mapStateToProps, mapDispatchToProps)(NewComponent);
}

export default CheckAuth;