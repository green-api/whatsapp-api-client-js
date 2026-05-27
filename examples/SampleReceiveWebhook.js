import express from 'express';
import bodyParser from 'body-parser';

(async () => {
  try {

    const app = express();
    const port = 80;

    app.use(bodyParser.json());
    app.post('/', (req, res) => {
      console.log(req.body);
      res.status(200).send('');
    });
    
    
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
      console.error(error);
      process.exit(1);
  }
})();