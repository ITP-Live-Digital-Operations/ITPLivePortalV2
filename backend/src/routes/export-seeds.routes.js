const router = require('express').Router();
const path = require('path');

const { spawn } = require('child_process');

router.get('/export-seeds', async (req, res) => {

    const childProcess = spawn('node', [path.join(__dirname, '..', '..', 'export-seeds', 'export.js')]);
    
    childProcess.stdout.on('data', (data) => {
        console.log(`Script output: ${data}`);
      });
    
      childProcess.stderr.on('data', (data) => {
        console.error(`Script error: ${data}`);
      });

      childProcess.on('close', (code) => {
        console.log(`Script exited with code ${code}`);
        if (code === 0) {
          return res.status(200).send({ message: 'Script executed successfully!' });
        } else {
          return res.status(500).send({ message: 'Internal Server Error' });
        }
      });
    
});


module.exports = router;