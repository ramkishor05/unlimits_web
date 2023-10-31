// imports the React Javascript Library
import React from "react";
//Card
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

//Tabs
import { withStyles } from "@material-ui/styles";
import { UploadFileOutlined } from "@material-ui/icons";

const styles = (theme) => ({
  root: {
    width: 200
  },
  input: {
    display: "none"
  },
  img: {
    width: 200,
    height: 200,
    margin: "0",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  btn : {
    position: "absolute",
    transform: 'translate( -125%,70%)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    fontSize: '16px',
    padding: '7px 57px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '20px',
    textAlign: 'center'
  }
});

class ImageUploadCard extends React.Component {
  state = {
    mainState: "initial", // initial
    imageUploaded: 0,
    bytes: '',
    selectedFile: this.props.value,
    btn: false
  };

  handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        selectedFile: [reader.result]
      },this.props.setUserProfileImge(reader.result));
    }.bind(this);
     // Would see a path?

    this.setState({
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1
    });
    
  };

  renderInitialState() {
    const { classes, theme } = this.props;
    const { value } = this.state;

    return (
     <>
        <img
          width="100%"
          className={classes.img}
          src={this.state.selectedFile}
          onMouseOver={()=> this.setState({btn: true})}
        />
     
      {this.state.btn &&
      <label htmlFor="button-file">
        <span className={classes.btn} 
            onMouseOut={()=> this.setState({btn: true})}>
          <UploadFileOutlined fullWidth></UploadFileOutlined>
          <input
            accept="image/*"
            className={classes.input}
            id="button-file"
            multiple
            type="file"
            onChange={this.handleUploadClick}
          />
        </span>
      </label>
      }
     </>
    );
  }

  renderUploadedState() {
    const { classes, theme } = this.props;

    return (
      <>
        <img
          width="100%"
          className={classes.img}
          src={this.state.selectedFile}
          onMouseOver={()=> this.setState({btn: true})}
        />
     
      {this.state.btn &&
      <label htmlFor="button-file">
        <span className={classes.btn} 
            onMouseOut={()=> this.setState({btn: true})}>
          <UploadFileOutlined fullWidth></UploadFileOutlined>
          <input
            accept="image/*"
            className={classes.input}
            id="button-file"
            multiple
            type="file"
            onChange={this.handleUploadClick}
          />
        </span>
      </label>
      }
     </>
    );
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
          {(this.state.mainState == "initial" && this.renderInitialState()) ||
            (this.state.mainState == "uploaded" && this.renderUploadedState())}
        
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);
