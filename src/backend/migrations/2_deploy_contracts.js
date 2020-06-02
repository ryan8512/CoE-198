const SetupBlockchain = artifacts.require("SetupBlockchain");
const Registration = artifacts.require("Registration");
const Election = artifacts.require("Election");
const Results = artifacts.require("Results");

module.exports = function(deployer) {
  deployer.deploy(SetupBlockchain);
  deployer.deploy(Registration);
  deployer.deploy(Election);
  deployer.deploy(Results);
};
