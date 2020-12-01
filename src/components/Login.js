import React, { useEffect, useState } from "react";
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Navbar, NavbarBrand } from "reactstrap";

import Welcome from "./Welcome";

const Login = () => {
    const [user, setUser] = useState("");
    const [authState, setAuthState] = useState("");

    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

    return authState === AuthState.SignedIn && user ? (
        <div>
            <Welcome user={user} />
        </div>
    ) : (
            <div>
                <Navbar color="dark">
                    <NavbarBrand className="text-white">Smart Gallery</NavbarBrand>
                </Navbar>
                <AmplifyAuthenticator style={{ textAlign: "center" }} />
            </div>
        );
}

export default Login;

