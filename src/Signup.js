import React, { Component } from "react";
import * as firebase from "firebase";
import "./firebase-config";
import Background from "./logo.png";
import { Button } from "@material-ui/core";
import "./App.css";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      reppassword: ""
    };
  }
  handleRegister = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(success => {
        const userId = success.user.uid;
        this.props.history.push("/profile/" + userId);
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
            opacity:'500px',
            alt:'Donate Blood Save A Life'
          }}
        >
          {/* <img src={Background} alt="Donate Blood Save a Life"></img> */}
          <div
            style={{
              border: "60px",
              boxSizing: "30px",
              width: 400,
              margin: "auto"
            }}
          >
            <h1>SignUp</h1>
            <br />
            <form onSubmit={this.handleRegister}>
              <label>
                <b>Email: </b>
              </label>
              <input
                type="text"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Enter your Email here"
                required
              />
              <br />

              <label>
                <b>Password: </b>
              </label>

              <input
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Enter your Password here"
                required
              />
              <br />

              <label>
                <b>Retype Password: </b>
              </label>

              <input
                type="password"
                id="reppassword"
                value={this.state.reppassword}
                onChange={this.handleChange}
                placeholder="Enter your password again"
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
                Signup
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Signup);
