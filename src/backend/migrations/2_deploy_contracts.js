const SetupBlockchain = artifacts.require("SetupBlockchain");
const Registration = artifacts.require("Registration");
const Election = artifacts.require("Election");
const Results = artifacts.require("Results");

module.exports = function(deployer) {
  deployer.deploy(SetupBlockchain,{gas: 6720000, overwrite: false});
  deployer.deploy(Registration,{gas: 6720000, overwrite: false});
  deployer.deploy(Election,{gas: 6720000, overwrite: false});
  deployer.deploy(Results,{gas: 6720000, overwrite: false});
  //deployer.deploy(SetupBlockchain);
  //deployer.deploy(Registration);
  //deployer.deploy(Election);
  //deployer.deploy(Results);
};
