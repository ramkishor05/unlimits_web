import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Form from "react-jsonschema-form-material-ui"

const schema = {
    "title":"",
    "type": "object",
    "required": [
      "name",
      "description"
    ],
    "properties": {
      "name": {
        "type": "string",
        "title": "Name"
      },
      "description": {
        "type": "string",
        "title": "Description"
      },
      "typeId": {
        "type": "string",
        "title": "Type"
      }
    }
  };
  
  const uiSchema= {
    "name": {
      "ui:widget": "text"
    },
    "description": {
      "ui:widget": "text",
    },
    "typeId": {
      "ui:widget": "text"
    }
  }

export default class DynamicForm extends React.Component {
  
  render() {
    const { title, type, fields, formData } = this.props;
    return (
        <Dialog
        open={this.props.openAction}
        onClose={this.props.closeAction}
        aria-labelledby="form-dialog-title"
      >
       <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                {this.props.openAction &&
                <Form
                schema={schema}
                uiSchema= {uiSchema}
                formData = {formData}
                onSubmit={(event)=>this.props.action(type, event)}
                onCancel= {this.props.closeAction}
            >
        <div />
        </Form>
         }
         
        </Dialog>
    );
  }
}