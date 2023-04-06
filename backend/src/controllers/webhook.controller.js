const { exec } = require('child_process');

exports.updateWebhook = (req, res) => {
  exec('chmod +x ./update_app.sh' , (chmodError) => {
    if (chmodError) {
      console.error(`chmod error: ${chmodError}`);
      return res.status(500).send('Failed to update the application');
    }
    exec('./update_app.sh', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return res.status(500).send('Failed to update the application');
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.status(200).send('Application updated successfully');
      });
}
  )};


