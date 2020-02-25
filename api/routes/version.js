const { Router } = require('express');

const router = Router();

import { exec } from 'child_process';

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

router.get('/version', async function (req, res, next) {
  let { stdout } = await sh('git describe --always --tags --dirty');

  res.json({
    version: stdout.replace(/\n$/, '')
  })
})
;

module.exports = router;
