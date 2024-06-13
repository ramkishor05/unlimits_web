// imports the React Javascript Library
import React from "react";

import defaultImg from '../../assets/images/product/no-image.svg'

//Tabs
import { withStyles } from "@material-ui/styles";
import { UploadFileOutlined } from "@material-ui/icons";
import GlobalResourceService from "../../services/GlobalResourceService";
import config from "../../config";

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  input: {
    display: "none"
  },
  img: {
    width: '100%',
    margin: "0",
    maxWidth: "100%",
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
      /*GlobalResourceService.add(this.props.container+"/"+file.name, reader.result).then(url=>{
       
        this.setState({
          selectedFile: url
        },this.props.setUserProfileImge(url));
        
      });*/
      this.setState({
        selectedFile: reader.result
      },this.props.setImage({fileContent: reader.result, fileName: file.name, fileType: file.type, folderName: this.props.container }));
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
    const { classes, height } = this.props;
    return (
     <>
        <img
          width="100%"
          height={height}
          style={{position: 'relative'}}
          className={classes.img}
          src={this.srcUrl(this.state.selectedFile)}
          onMouseOver={()=> this.setState({btn: true})}
        />
     
      {this.state.btn &&
      <label htmlFor="button-file">
        <span className={classes.btn} 
            onMouseOut={()=> this.setState({btn: true})}>
          <UploadFileOutlined></UploadFileOutlined>
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
    const { classes, height } = this.props;

    return (
      <>
        <img
          width="100%"
          maxHeight={height}
          style={{position: 'relative'}}
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
