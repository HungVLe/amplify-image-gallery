import React, { useEffect, useState } from "react";
import './App.css';

//amplify exports
import Amplify, { Auth, Hub } from "aws-amplify";
import awsExports from "./aws-exports";
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";

//components imports
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import bg from "./components/layout/Welcome.png";

Amplify.configure(awsExports);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    document.body.style.backgroundImage = `url(${bg})`
    document.body.style.backgroundSize = 'cover'
    //finding and setting loggedin User
    let updateUser = async (authState) => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch {
        setUser(null);
      }
    };
    Hub.listen("auth", updateUser); // listen for login/signup events
    updateUser(); // check manually the first time because we won't get a Hub event
    return () => Hub.remove("auth", updateUser); // cleanup
  }, []);
  return (
    <AmplifyAuthenticator style={{ textAlign: "center" }}>
      <div className="App">
        {user ? <Header user={user} /> : null}
        <Footer />
      </div>
    </AmplifyAuthenticator>
  );
}

export default App;

