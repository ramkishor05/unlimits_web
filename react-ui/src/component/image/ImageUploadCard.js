// imports the React Javascript Library
import React from "react";
//Card
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

//Tabs
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  root: {
    width: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  input: {
    display: "none"
  },
  img: {
    width: 200,
    height: 256,
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

class ImageUploadCard extends React.Component {
  state = {
    mainState: "initial", // initial
    imageUploaded: 0,
    bytes: '',
    selectedFile: this.props.value
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
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <img
            width="100%"
            className={classes.img}
            src={this.state.selectedFile}
          />
        </Grid>
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            Select Image
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.handleUploadClick}
            />
          </Button>
        </label>
      </Grid>
    );
  }

  renderUploadedState() {
    const { classes, theme } = this.props;

    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <img
            width="100%"
            className={classes.img}
            src={this.state.selectedFile}
          />
        </Grid>
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            Select Image
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.handleUploadClick}
            />
          </Button>
        </label>
      </Grid>
    );
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <Card className={this.props.cardName}>
          {(this.state.mainState == "initial" && this.renderInitialState()) ||
            (this.state.mainState == "uploaded" && this.renderUploadedState())}
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);
