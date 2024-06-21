import inquirer from 'inquirer';
import sleep from './utils/sleep';

import encryptFiles from './functions/encrypt';
import ex from './functions/ex';
import { error, info } from './utils/console';

const key = 'your_key_here';

const main = async () => {
    console.clear();
    info('Welcome to the file encryption tool!');
    sleep(1000);

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                { name: 'Encrypt files (slim .tsea)', value: 'encrypt' },
                { name: 'Execute encrypt files', value: 'execute' },
                { name: 'Decrypt files', value: 'decrypt' },
            ],
        },
    ]);

    console.clear();
    switch (answers.action) {
        case 'encrypt':
            await encryptFiles(key);
            break;
        case 'execute':
            await ex(key);
            break;
        case 'decrypt':
            // Implement decrypt method
            break;
        default:
            error('Invalid action');
            break;
    }
};

main().catch(err => console.error(err));
