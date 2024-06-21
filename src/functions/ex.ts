import fs from 'fs';
import path from 'path';
import crypto from 'crypto-js';
import { info, success, startProcess, stopProcess } from '../utils/console';
import sleep from '../utils/sleep';
import chalk from 'chalk';

const baseDir = path.join(__dirname, '../../files/encrypt');
const scripts: string[] = [];

export default async function encrypt(key: string) {
    const files = fs.readdirSync(baseDir);
    info(`Found ${files.length} encrypted...`);
    await sleep(1000);

    for(const file of files) {
        const consoleInfo = startProcess(`Decrypting ${file} content...`);
        await sleep(1000);

        const filePath = path.join(baseDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const encrypted = fileContent.toString();
        const decryptedContent = crypto.AES.decrypt(encrypted, key).toString(crypto.enc.Utf8);


        scripts.push(decryptedContent);
        stopProcess(consoleInfo);
    }
    success('All files decrypted successfully!');
    await sleep(1000);

    const prepare = startProcess('Executing decrypted content...');
    await sleep(1000);
    stopProcess(prepare);
    console.log('   ');
    console.log('   ');
    console.log(chalk.ansi256(208)('----------------Output----------------'));
    
    for(const script of scripts) {
        eval(script);
    }
}  