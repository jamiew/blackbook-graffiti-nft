const Contract = artifacts.require("./BlackbookToken");

before(() =>
  Contract.deployed().then(inst => {
    global.instance = inst;
  })
);
