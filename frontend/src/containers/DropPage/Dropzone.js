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
    const req = request.post('http://localhost:3000/upload');
    files.forEach((file) => {
      req.attach('photo', file);
    });
    req.end((err, res) => {
      if (err) console.log(err);
      console.log(res);
      const f = this.state.files;
      f.forEach((file, i) => {
        f[i].sentence = res.body.result.imgblobs[i].candidate.text;
      });
      this.setState({ f });
      // console.log(this.state.files);
    });
  }
  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        {<div>
          <div>{this.state.files.map((file, i) =>
            <div key={i}>
              <img src={file.preview} alt={file.name} />
              <span>{file.sentence}</span>
            </div>)}
          </div>
        </div>}
      </div>
    );
  }
}

export default DropzoneDemo;
