import { Router } from 'express';
import multer from 'multer';
import pythonShell from 'python-shell'
import fs from 'fs';
import http from 'https';

const upload = multer({ dest: 'pic/' });
const uploadRouter = new Router();

function download(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  const request = http.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', (err) => { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

function runPyScript() {
  const extractPath = 'neuraltalk/python_features'
  const extract_options = {
    mode: 'text',
    args: [`--model_def`, `${extractPath}/deploy_features.prototxt`, 
      `--model`, `${extractPath}/VGG_ILSVRC_16_layers.caffemodel`, `--file`, `pic/tasks.txt`]
  };

  const predict_options = {
    mode: 'text',
    scriptPath: 'neuraltalk',
    args: ['neuraltalk/cv/model_checkpoint_coco_visionlab43.stanford.edu_lstm_11.14.p', '-r', 'pic/']
  };

  console.log('extracting...');
  return new Promise((resolve, reject) => {
    pythonShell.run(`${extractPath}/extract_features.py`, extract_options, (err, result) => {
      if (err) console.log(err);
      console.log('results: %j', result);
      
      console.log('predicting...');
      pythonShell.run('predict_on_images.py', predict_options, (err, result) => {
        if (err) console.log(err);
        console.log('results: %j', result);

        fs.readFile('pic/result_struct.json', (err, data) => {
          if (err) console.log(err);
          resolve({result: JSON.parse(data)});
        });
      });
    });
  });
};


uploadRouter.post('/', (req, res, next) => {
  console.log(req.body);
  if (req.body[0].photoUrl !== undefined) {
    const stream = fs.createWriteStream("pic/tasks.txt");
    const photos = req.body;
    photos.forEach(p => {
      const id = p.id;
      const url = p.photoUrl;
      const dest = `pic/${id}`;
      stream.write(`${id}\n`);
      download(url, dest, (err) => {
        if (err) console.log(err);
      });
    });
    stream.end();
    runPyScript()
    .then(result => {
      res.json(result);
      res.end();
    });
  } else {
    next();
  }
});

uploadRouter.post('/', upload.array('photo'), (req, res, next) => {
  console.log(req.files);

  const stream = fs.createWriteStream("pic/tasks.txt");
  req.files.forEach((file) => {
    console.log(file.filename);
    stream.write(`${file.filename}\n`);
  });

  stream.end();

  runPyScript()
  .then(result => {
    res.json(result);
    res.end();
  })
  
});

// python python_features/extract_features.py --model_def python_features/deploy_features.prototxt --model python_features/VGG_ILSVRC_16_layers.caffemodel --file ../pic/tasks.txt 
// python predict_on_images.py cv/model_checkpoint_coco_visionlab43.stanford.edu_lstm_11.14.p -r example_images/
export default uploadRouter;
