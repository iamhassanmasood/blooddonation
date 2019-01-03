import React, { Component } from "react";
import Background from "./logo.png";
import * as firebase from "firebase";
import "./firebase-config";
import "./App.css";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});
class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  handleRegister = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(success => {
        console.log("success", success);
        this.props.history.push("/home");
      })
      .catch(function(error) {
        console.log("error", error);
      });
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${Background})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: "500px",
            alt: "Donate Blood Save A Life"
          }}
        >
          <div
            style={{
              border: "60px",
              boxSizing: "30px",
              width: 400,
              margin: "auto"
            }}
          >
            <form onSubmit={this.handleRegister}>
              <h1>LogIn</h1>
              <br />
              <br />
              <b>Email</b>
              <br />

              <input
                type="text"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Enter your Email here"
                required
              />
              <br />

              <b>Password</b>
              <br />

              <input
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Enter your password here"
                required
              />
              <br />
              <br />
              <Button
                type="submit"
                className="registerbtn"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Signin);
