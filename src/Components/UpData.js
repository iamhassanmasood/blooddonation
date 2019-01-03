import React from "react";
import classNames from "classnames";
import Background from "../logo.png";
import * as firebase from "firebase";
import "../firebase-config";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
const gender = [
  {
    value: "Male",
    label: "Male"
  },

  {
    value: "Female",
    label: "Female"
  }
];

const bloodgroups = [
  {
    value: "A+",
    label: "A+"
  },
  {
    value: "B+",
    label: "B+"
  },
  {
    value: "AB+",
    label: "AB+"
  },
  {
    value: "AB-",
    label: "AB-"
  },
  {
    value: "A-",
    label: "A-"
  },
  {
    value: "B-",
    label: "B-"
  },
  {
    value: "O+",
    label: "O+"
  },
  {
    value: "O-",
    label: "O-"
  }
];

const cities = [
  {
    value: "Islamabad",
    label: "Islamabad"
  },
  {
    value: "Karachi",
    label: "Karachi"
  },
  {
    value: "Lahore",
    label: "Lahore"
  },
  {
    value: "Quetta",
    label: "Quetta"
  },
  {
    value: "Multan",
    label: "Multan"
  },
  {
    value: "Peshawar",
    label: "Peshawar"
  },
  {
    value: "Mianwali",
    label: "Mianwali"
  }
];

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200
  }
});

class UpData extends React.Component {
  constructor(props) {
    super();
    this.state = {
      bloodgroup: "",
      city: "",
      sex: "",
      firstname: "",
      lastname: "",
      mobileno: "",
      age: ""
    };
  }
  componentDidMount() {}
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleChangeb = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleChangec = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleChanges = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  SaveData = ev => {
    ev.preventDefault();

    var data = {
      gender: this.state.sex,
      bloodgroup: this.state.bloodgroup,
      city: this.state.city,
      age: this.state.age,
      mobileno: this.state.mobileno,
      lastname: this.state.lastname,
      firstname: this.state.firstname
    };
    this.props.history.push("/home");
    const id = this.props.match.params.id;
    firebase
      .database()
      .ref("users/" + id)
      .set(data);
    this.setState({
      firstname: "",
      lastname: "",
      mobileno: "",
      age: "",
      sex: "",
      bloodgroup: "",
      city: ""
    });
  };
  render() {
    const { classes } = this.props;
    console.log(this.states);
    return (
      <div
        style={{
          backgroundImage: `url(${Background})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "500px",
          alt: "Donate Blood Save A Life"
        }}
      >
        <div className="TextField">
          <div className={classes.root}>
            <div className="center">
              <div className="row">
                <div className="col-md-2">
                  <div className="col-md-12">
                    <TextField
                      label="First Name"
                      id="firstname"
                      value={this.state.firstname}
                      onChange={this.handleChange}
                      className={classNames(classes.margin, classes.textField)}
                    />
                  </div>

                  <div className="col-md-12">
                    <TextField
                      label="Last Name"
                      id="lastname"
                      value={this.state.lastname}
                      onChange={this.handleChange}
                      className={classNames(classes.margin, classes.textField)}
                    />
                  </div>
                  <div className="col-md-12">
                    <TextField
                      label="Age"
                      type="number"
                      name="myage"
                      id="age"
                      value={this.state.age}
                      onChange={this.handleChange}
                      className={classNames(classes.margin, classes.textField)}
                    />
                  </div>
                  <div className="col-md-12">
                    <TextField
                      label="mobileno"
                      value={this.state.mobileno}
                      onChange={this.handleChange}
                      id="mobileno"
                      className={classNames(classes.margin, classes.textField)}
                    />
                  </div>

                  <div>
                    <TextField
                      id="bloodgroup"
                      select
                      label="Select"
                      className={classes.textField}
                      value={this.state.bloodgroup}
                      onChange={this.handleChangeb("bloodgroup")}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      helperText="Please select your Bloodgroup"
                      margin="normal"
                      variant="filled"
                    >
                      {bloodgroups.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div>
                    <TextField
                      id="filled-select-city"
                      select
                      label="Select"
                      className={classes.textField}
                      value={this.state.city}
                      onChange={this.handleChangec("city")}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      helperText="Please select your Current City"
                      margin="normal"
                      variant="filled"
                    >
                      {cities.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div>
                    <TextField
                      id="filled-select-sex"
                      select
                      label="Select"
                      className={classes.textField}
                      value={this.state.sex}
                      onChange={this.handleChanges("sex")}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      helperText="Your Gender"
                      margin="normal"
                      variant="filled"
                    >
                      {gender.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="registerbtn"
                      variant="contained"
                      color="primary"
                      onClick={this.SaveData}
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpData.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UpData);
