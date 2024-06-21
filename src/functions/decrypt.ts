import fs from 'fs';
import path from 'path';
import crypto from 'crypto-js';
import {
  info,
  startProcess,
  stopProcess
} from '../utils/console';
import sleep from '../utils/sleep';
import { error } from 'console';

const encryptedDir = path.join(__dirname, '../../files/encrypt');
const outDir = path.join(__dirname, '../../files/decrypt');

export default async function decrypt(key: string) {
  const files = fs.readdirSync(encryptedDir);
  info(`Found ${files.length} files to decrypt...`);
  const outFiles = fs.readdirSync(outDir);
  if(outFiles.length > 0) {
    const deleteAllFiles = startProcess('Deleting all existing files in the output directory...');
    for (const file of outFiles) {
      await fs.unlinkSync(path.join(outDir, file));
    }
    stopProcess(deleteAllFiles);
  }
  await sleep(1000);

  for(const file of files) {
    const consoleInfo = startProcess(`Decrypting ${file}...`);
    await sleep(250);

    const filePath = path.join(encryptedDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    if(path.extname(file) !== '.tsea') {
      stopProcess(consoleInfo);
      error(`File ${file} is not a .tsea file, skipping...`);
      continue;
    }

    const baseName = path.basename(file, path.extname(file));
    const decryptedBytes = crypto.AES.decrypt(fileContent, key);
    const decrypted = decryptedBytes.toString(crypto.enc.Utf8);
    const outPath = path.join(outDir, `${baseName}.js`);
    fs.writeFileSync(outPath, decrypted);
    stopProcess(consoleInfo);
  }
}
