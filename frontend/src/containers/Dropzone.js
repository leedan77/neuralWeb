import React from 'react';
import Dropzone from 'react-dropzone';
// import axios from 'axios';
import request from 'superagent';

class DropzoneDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };
    // this.onDrop = this.onDrop.bind(this);
  }
  onDrop = (files) => {
    this.setState({ files });
    console.log(files);
    const req = request.post('http://localhost:3000/upload');
    files.forEach((file) => {
      req.attach('photo', file);
    });
    req.end((err, res) => {
      if (err) console.log(err);
      console.log(res);
    });
    /*
    files.forEach((file) => {
      axios.post('http://localhost:3000/upload', file,
        {
          headers: {
            'Content-Type': 'multipart/form-data;',
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    */
  }
  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        {<div>
          <div>{this.state.files.map((file, i) =>
            <img key={i} src={file.preview} alt={file.name} />)}</div>
        </div>}
      </div>
    );
  }
}

export default DropzoneDemo;
