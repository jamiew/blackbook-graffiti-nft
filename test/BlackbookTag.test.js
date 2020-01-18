contract("BlackbookToken", accounts => {
  const name = "BlackbookToken";
  const symbol = "000BOOK";
  const admin = accounts[1];
  const user = accounts[2];
  const unregistredUser = accounts[5];

  const details0 = "TestMe0";

  before(() => Promise.all([instance.addAdmin(admin), instance.addUser(user)]));

  it("...should have the right name and symbol", () => {
    return Promise.all([instance.name(), instance.symbol()]).then(
      ([_name, _symbol]) => {
        assert.equal(_name, name);
        assert.equal(_symbol, symbol);
      }
    );
  });

  it("...should create a BlackbookToken by an admin, using 2 recorded users", () => {
    return instance
      .safeMint(admin, user, details0, {from: admin})
      .then(() => instance.getCounter())
      .then(cpt => assert.equal(cpt, 1));
  });

  it("...should fail when a non-admin user tries to create an BlackbookToken", () => {
    return instance
      .safeMint(admin, user, details0, {from: user})
      .then(() => assert.isOk(false, "it should have failed... !"))
      .catch(() => assert.isOk(true));
  });

  it("...should fail when creating a BlackbookToken with an unregistred user as destinator", () => {
    return instance
      .safeMint(admin, unregistredUser, details0)
      .then(() => assert.isOk(false, "it should have failed... !"))
      .catch(() => assert.isOk(true));
  });

  it("...should fail when creating a BlackbookToken with an unregistred user as the first owner", () => {
    return instance
      .safeMint(unregistredUser, admin, details0)
      .then(() => assert.isOk(false, "it should have failed... !"))
      .catch(() => assert.isOk(true));
  });

  it("...should get an owner's balance", () => {
    return instance.balanceOf(admin).then(balance => assert.equal(balance, 1));
  });

  it("...should check if admin is the onwer of the token 0", () => {
    return instance.ownerOf(0).then(owner => assert.equal(owner, admin));
  });

  it("...should get an BlackbookToken with id 0", () => {
    return instance.getBlackbookToken(0, {from: admin}).then(token => {
      assert.equal(admin, token.from);
      assert.equal(user, token.to);
      assert.equal(details0, token.details);
    });
  });

  it("...should fail if a non-admin or non-owner user tries to get a BlackbookToken", () => {
    return instance
      .getBlackbookToken(0, {from: user})
      .then(() => assert.isOk(false, "It should have failed... !"))
      .catch(() => assert.isOk(true));
  });

  it("..should create another BlackbookToken by an admin, using 2 recorded users", () => {
    return instance
      .safeMint(user, admin, details0)
      .then(() => instance.getCounter())
      .then(cpt => assert.equal(cpt, 2));
  });

  it("...should check if user is the onwer of the token 1", () => {
    return instance.ownerOf(1).then(owner => assert.equal(owner, user));
  });

  it("...should get a BlackbookToken if I am the owner", () => {
    return instance
      .getBlackbookToken(0, {from: user})
      .then(() => assert.isOk(true))
      .catch(err => assert.isOk(false));
  });

  it("...should transfer the BlackbookToken 0 from admin to user", () => {
    return instance
      .passToken(user, 0, {from: admin})
      .then(() => instance.ownerOf(0))
      .then(owner => {
        assert.equal(owner, user);
        return Promise.all([
          instance.balanceOf(user),
          instance.balanceOf(admin)
        ]);
      })
      .then(([cptUser, cptAdmin]) => {
        assert.equal(cptAdmin, 0);
        assert.equal(cptUser, 2);
      });
  });

  it("...should burn the BlackbookToken 0", () => {
    return instance
      .burn(0, {from: admin})
      .then(() => instance.getCounter())
      .then(cpt => {
        assert.equal(cpt, 1);
        return instance.balanceOf(user);
      })
      .then(cpt => assert.equal(cpt, 1));
  });
});
