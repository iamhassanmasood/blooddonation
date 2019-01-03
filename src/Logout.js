import React from 'react'
import {Button} from '@material-ui/core';
import * as firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

  firebase.auth().signOut()
  .then((docRef) =>{
      console.log("Document written with ID: ", docRef);
      this.props.history.push('/');
    })

  .catch(function(error) {
    
  });

class Logout extends React.Component{


    reander(){
        return(
            <div>
                    <Button
                    type="logout"
                    className="logout"
                    variant="contained"
                    color="white" 
                    className={this.props.classes.button}
                    >
                    Logout
                    </Button>
            </div>
        );
    }
}
export default withStyles(styles) (Logout);