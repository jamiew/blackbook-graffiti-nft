const BlackbookToken = artifacts.require("BlackbookToken");

module.exports = function(deployer) {
  deployer.deploy(BlackbookToken);
};
