import React, { useEffect} from "react";
import bg from "./layout/Index.png";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Login from "./Login";

const Welcome = (props) => {
    useEffect(() => {
        document.body.style.backgroundImage = `url(${bg})`
        document.body.style.backgroundSize = 'cover'
    }, []);
    return (
        <div>
            {props.user ? <Header user={props.user} /> : <Login/>}
            <Footer />
        </div>
    );
}

export default Welcome;