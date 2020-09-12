# CoE-198
Blockchain Election

# Content Description

Folder Contents and Descriptions
1. migrations - JS Files for migration/deployment for testing framework
2. public - ReactJS Framework
3. src - Source Files for contracts and compiled codes; Front end UI
4. test - JS Files for testing the contract before deployment

Folders for development
1. gethMigration- For Geth migration
2. scripts - for automation

Other Files
1. package.json - Main dependencies
2. package-lock.json - For recreating the project via locking the dependencies of everything
3. truffle-config.js - simple configuration file for truffle


# Frameworks and Libraries used
Front-end
1. Bootstrap - CSS
2. React - For UI Design
3. JQuery - For ease of use

Backend 
1. Truffle - development and testing (compiler)
2. Ganache - Local blockcchain for testing
3. Geth - Node-client for actual implementation
4. Web3.js - Libraries for connecting browser and blockchain
5. Metamask - uses Web3.js to build a wallet software/browser for ease of use

# Programming Languages Required
1. HTML
2. CSS
3. Javascript
4. Solidity
5. Bash and Expect

# How to run the file
1. git clone <link>/fork the project
2. npm install - Install dependencies
3. npm start - start the application through a web interface

# Developer Tools
1. truffle compile - compile the code and produce abis.
2. truffle migrate - compile and migrate the code (Ganache must be opened)
3. truffle console - run the console of truffle

