// App.js
import React from "react";
// Add Redirect component
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { setCurrentUser } from "./redux/user/user.actions";

import "./App.css";

import Header from "./components/header/header.component";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // Returns back the function that can close subscription
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // If user is authenticated try to get data from database and
      // store it in our state
      if (userAuth) {
        // Get link to the existed document in our database
        // or create a new document
        const userRef = await createUserProfileDocument(userAuth);

        // Modify our state each time data in database changes
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        // If user is not authenticated userAuth is null
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                // If the user is logged in show homepage instead of sign-in-and-sign-up-page
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // Now we have access to this.props.currentUser
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  // setCurrentUser on the left side is just the name
  // of the prop to pass to App - it is a function that
  // takes user object and writed data to Store

  // setCurrentUser in the dispatch is a function from user.actions.js
  // that creates user object according to the correct format
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

// We don't need first function to get data so we pass null
// We need second function to set data
export default connect(mapStateToProps, mapDispatchToProps)(App);
