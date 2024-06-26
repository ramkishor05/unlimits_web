// imports the React Javascript Library
import React from "react";

import defaultImg from '../../assets/images/product/no-image.svg'

//Tabs
import { withStyles } from "@material-ui/styles";
import { UploadFileOutlined } from "@material-ui/icons";
import config from "../../config";

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  input: {
    display: "none"
  },
  vedio: {
    width: '200',
    margin: "0",
    maxWidth: "200",
    position: 'relative'
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

class VedioUploadCard extends React.Component {
  state = {
    mainState: "initial", // initial
    imageUploaded: 0,
    bytes: '',
    selectedFile: this.props.value,
    btn: true
  };

  handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
        this.setState({
          selectedFile: reader.result
        },this.props.setVedio({fileContent: reader.result, fileName: file.name, fileType: file.type, folderName: this.props.container }));
    }.bind(this);
     // Would see a path?

    this.setState({
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1
    });
    
  };

  srcUrl=(selectedFile)=>{
    if(selectedFile && selectedFile!=="" && defaultImg!==selectedFile){
      return config.resourseUrl(selectedFile);
    }
    return defaultImg;
  }

  renderInitialState() {
    const { classes, height, width } = this.props;
    return (
     <>
       
      <video width={width}
              src={this.srcUrl(this.state.selectedFile)} 
              height={height} controls>
            <source  src={this.srcUrl(this.state.selectedFile)}  />
            Your browser does not support the video tag.
          </video>
     
     
      {this.state.btn &&
      <label htmlFor="button-file">
        <span className={classes.btn} 
            onMouseOut={()=> this.setState({btn: true})}>
          <UploadFileOutlined></UploadFileOutlined>
          <input
            accept="vedio/*"
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
    const { classes, height, width } = this.props;

    return (
      <>
        
      <video width={width} 
              src={this.state.selectedFile}
              height={height} controls>
            <source  src={this.state.selectedFile}/>
            Your browser does not support the video tag.
          </video>
     
      {this.state.btn &&
      <label htmlFor="button-file">
        <span className={classes.btn} 
            onMouseOut={()=> this.setState({btn: true})}>
          <UploadFileOutlined fullWidth></UploadFileOutlined>
          <input
            accept="vedio/*"
            className={classes.input}
            id="button-file"
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

export default withStyles(styles, { withTheme: true })(VedioUploadCard);
