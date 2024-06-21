# File Encryption and Decryption Tool

This documentation provides an overview and guide for the File Encryption and Decryption Tool, which consists of several TypeScript files designed to encrypt and decrypt JavaScript files as well as execute decrypted scripts.

## Table of Contents

1. [Overview](#overview)
2. [Project Purpose](#project-purpose)
3. [File Descriptions](#file-descriptions)
   - [encrypt.ts](#encryptts)
   - [decrypt.ts](#decryptts)
   - [ex.ts](#exts)
   - [index.ts](#indexts)
4. [Utility Functions](#utility-functions)
5. [Getting Started](#getting-started)
   - [Installation](#installation)
   - [Usage](#usage)
6. [Command Line Interface](#command-line-interface)
7. [Notes](#notes)

## Overview

The File Encryption and Decryption Tool is designed to provide a simple way to encrypt JavaScript files into `.tsea` files, decrypt `.tsea` files back into JavaScript, and execute decrypted scripts. It uses `crypto-js` for encryption and decryption and provides a command-line interface for ease of use.

## Project Purpose

This project is an educational project intended to explain and demonstrate a simple way of executing theoretically compiled code via files of one extension or another. It is not designed to be free from vulnerabilities and is not intended for production use, as it is unstable and does not account for function import/export between files.

## File Descriptions

### encrypt.ts

This file handles the encryption of JavaScript files. It reads files from a base directory, encrypts their contents using a provided key, and writes the encrypted content to an output directory.

### decrypt.ts

This file handles the decryption of `.tsea` files. It reads files from an encrypted directory, decrypts their contents using a provided key, and writes the decrypted content to an output directory as JavaScript files.

### ex.ts

This file decrypts encrypted `.tsea` files and executes their content. It reads files from an encrypted directory, decrypts their contents using a provided key, and evaluates the decrypted JavaScript code.

### index.ts

This file provides a command-line interface (CLI) to interact with the tool. It uses `inquirer` to prompt the user for actions (encrypt, decrypt, or execute) and calls the corresponding functions.

## Utility Functions

- **console.ts**: Utility functions for console logging, such as `info`, `success`, `error`, `startProcess`, and `stopProcess`.
- **sleep.ts**: Utility function to introduce delays using `sleep`.

## Getting Started

### Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using npm:

```bash
npm install
```

### Usage

1. Ensure you have your JavaScript files in the `files/base` directory.
2. Build the project:

```bash
npm run build
```

3. Run the tool:

```bash
npm start
```

4. Follow the prompts to encrypt, decrypt, or execute files.

## Command Line Interface

The CLI provided by `index.ts` will prompt you to choose an action:

- **Encrypt files**: Encrypts all JavaScript files in the `files/base` directory and outputs `.tsea` files to the `files/encrypt` directory.
- **Execute encrypt files**: Decrypts and executes the content of `.tsea` files in the `files/encrypt` directory.
- **Decrypt files**: Decrypts `.tsea` files back to JavaScript files in the `files/decrypt` directory.

## Notes

- Ensure the key used for encryption and decryption is the same.
- Handle sensitive data and encryption keys securely.
- The `eval` function in `ex.ts` can execute arbitrary code, so use it cautiously.
