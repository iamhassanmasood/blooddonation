import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ButtonAppBar from "./Components/UserAppBar";
import * as firebase from "firebase";
import "./firebase-config";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  button: {
    display: "block",
    marginTop: theme.spacing.unit * 4
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
    align: "center"
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      bloodgroup: "",
      city: "",
      newArray: [],
      filterArray: [],
      open: false,
      openItem: null
    };
  }

  handleOpen = (item) => {
    this.setState({ open: true, openItem: item});  
  }


  handleClose = () => {
    this.setState({ open: false, openItem: null }); }

  componentDidMount() {
    this.getData();
  }  

  getData = () => {
    firebase
      .database()
      .ref("users")
      .once("value")
      .then(snapshot => {
        const data = snapshot.val();
        const array = [];
        for (let key in data) {
          array.push(data[key]);
        }

        this.setState({
          newArray: array,
        });
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleClick = () => {
    const { newArray, bloodgroup, city } = this.state;
    const filter = newArray.filter(
      arr =>
        (bloodgroup === "" || arr.bloodgroup === bloodgroup) &&
        (city === "" || arr.city === city)
    );

    this.setState({
      filterArray: filter
    });
  };

  render() {
    const { classes } = this.props;
    const { filterArray, bloodgroup, city, openItem } = this.state;

    return (
      <Paper>
        <ButtonAppBar />
        <div className="Dropdown">
          <div>
          <div
              style={{
              width: 800,
              margin: "auto"
            }}>
            <form autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Bloodgroup
                </InputLabel>
                <Select
                  value={bloodgroup}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "bloodgroup",
                    id: "demo-controlled-open-select"
                  }}
                >
                  <MenuItem value={"A+"}>A+</MenuItem>
                  <MenuItem value={"A-"}>A-</MenuItem>
                  <MenuItem value={"B+"}>B+</MenuItem>
                  <MenuItem value={"B-"}>B-</MenuItem>
                  <MenuItem value={"O+"}>O+</MenuItem>
                  <MenuItem value={"O-"}>O-</MenuItem>
                  <MenuItem value={"AB+"}>AB+</MenuItem>
                  <MenuItem value={"AB-"}>AB-</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="demo-controlled-open-select">
                  City
                </InputLabel>
                <Select
                  value={city}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "city",
                    id: "demo-controlled-open-select"
                  }}
                >
                  <MenuItem value={"Islamabad"}>Islamabad</MenuItem>
                  <MenuItem value={"Karachi"}>Karachi</MenuItem>
                  <MenuItem value={"Lahore"}>Lahore</MenuItem>
                  <MenuItem value={"Quetta"}>Quetta</MenuItem>
                  <MenuItem value={"Mianwali"}>Mianwali</MenuItem>
                  <MenuItem value={"Multan"}>Multan</MenuItem>
                  <MenuItem value={"Peshawar"}>Peshawar</MenuItem>
                </Select>
              </FormControl>
              <Button
                style={{
                  margin: 16,
                  color: "white",
                  padding: "5px 10px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  borderRadius: "10%",
                  marginLeft: "40px",
                  backgroundColor: "#3f51b5"
                }}
                onClick={this.handleClick}
              >
                Search
              </Button>
            </form>
            </div>
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell align="center" style={{
            backgroundColor: '#4857bb',
          }}> UserName </CustomTableCell>
              <CustomTableCell align="center" style={{
            backgroundColor: '#4857bb',
          }}> Contact </CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterArray.map((item, index) => (
              <TableRow key={index}>
                <CustomTableCell align="center">
                  {item.firstname} {item.lastname}
                </CustomTableCell>
                <CustomTableCell align="center">
                  <Button
                    style={{
                      margin: 16,
                      color: "white",
                      padding: "5px 10px",
                      textAlign: "center",
                      textDecoration: "none",
                      display: "inline-block",
                      borderRadius: "10%",
                      marginLeft: "40px",
                      backgroundColor: "#3f51b5"
                    }}
                    onClick={() => this.handleOpen(item)}
                  >
                    Contact
                  </Button>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div >
          {this.state.open ?
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div align="center" style={getModalStyle()} className={classes.paper}>
              <Typography variant="h3" id="modal-title">
               {openItem.firstname} {openItem.lastname}
              </Typography>
              <br/>
              <Typography variant="h6" id="simple-modal-description">
              <TableHead>
              <CustomTableCell style={{
            backgroundColor: '#4857bb',
          }}> Contact </CustomTableCell>
              </TableHead>
            <TableRow>
              <CustomTableCell>{openItem.mobileno} </CustomTableCell>
            </TableRow>
              </Typography>
              <Typography variant="h6" id="simple-modal-description">
              <TableHead>
              <CustomTableCell style={{
            backgroundColor: '#4857bb',
          }}> Age </CustomTableCell>
              </TableHead>
            <TableRow>
              <CustomTableCell>{openItem.age}</CustomTableCell>
            </TableRow>
              </Typography>
              <Typography variant="h6" id="simple-modal-description">
              <TableHead>
              <CustomTableCell style={{
            backgroundColor: '#4857bb',
          }}> Gender </CustomTableCell>
              </TableHead>
            <TableRow>
              <CustomTableCell>{openItem.gender}</CustomTableCell>
            </TableRow>
              </Typography>
            </div>
          </Modal>
          : null}
        </div>
      </Paper>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Dashboard);