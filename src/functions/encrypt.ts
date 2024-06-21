import fs from 'fs';
import path from 'path';
import crypto from 'crypto-js';
import {
  info,
  startProcess,
  stopProcess } from '../utils/console';
import sleep from '../utils/sleep';
import { error } from 'console';

const baseDir = path.join(__dirname, '../../files/base');
const outDir = path.join(__dirname, '../../files/encrypt');

export default async function encrypt(key: string) {
  const files = fs.readdirSync(baseDir);
  info(`Found ${files.length} files to encrypt...`);
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
    const consoleInfo = startProcess(`Encrypting ${file}...`);
    await sleep(250);

    const filePath = path.join(baseDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    if(path.extname(file) !== '.js') {
      stopProcess(consoleInfo);
      error(`File ${file} is not a JavaScript file, skipping...`);
      continue;
    }

    const baseName = path.basename(file, path.extname(file))
    const encrypted = crypto.AES.encrypt(fileContent, key).toString();
    const outPath = path.join(outDir, `${baseName}.tsea`);
    fs.writeFileSync(outPath, encrypted);
    stopProcess(consoleInfo);
  }
}