import { Router } from 'express';
import multer from 'multer';
import pythonShell from 'python-shell'
import fs from 'fs';

const upload = multer({ dest: 'pic/' });
const uploadRouter = new Router();



uploadRouter.post('/', upload.array('photo'), (req, res, next) => {
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

  console.log(req.files);

  const stream = fs.createWriteStream("pic/tasks.txt");
  req.files.forEach((file) => {
    console.log(file.filename);
    stream.write(`${file.filename}\n`);
  });

  stream.end();

  console.log('extracting...');
  pythonShell.run(`${extractPath}/extract_features.py`, extract_options, (err, result) => {
    if (err) console.log(err);
    console.log('results: %j', result);
    
    console.log('predicting...');
    pythonShell.run('predict_on_images.py', predict_options, (err, result) => {
      if (err) console.log(err);
      console.log('results: %j', result);

      fs.readFile('pic/result_struct.json', (err, data) => {
        if (err) console.log(err);
        res.json({
          result: JSON.parse(data)
        });
        res.end();
      });
    });
  });
  
  
  
  
  
  
});

// python python_features/extract_features.py --model_def python_features/deploy_features.prototxt --model python_features/VGG_ILSVRC_16_layers.caffemodel --file ../pic/tasks.txt 
// python predict_on_images.py cv/model_checkpoint_coco_visionlab43.stanford.edu_lstm_11.14.p -r example_images/
export default uploadRouter;
