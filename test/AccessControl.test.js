contract("AccessControl", accounts => {
  const deployerAddr = accounts[0];
  const admin0 = accounts[1];
  const admin1 = accounts[2];
  const user0 = accounts[3];
  const user1 = accounts[4];
  const user2 = accounts[5];

  it("...should test if the user that deployed is an admin", () => {
    return instance.isAdmin(deployerAddr).then(isAdmin => {
      assert.equal(isAdmin, true);
    });
  });

  it("...should add an admin", () => {
    return instance
      .addAdmin(admin0)
      .then(() => instance.isAdmin(admin0))
      .then(isAdmin => assert.equal(isAdmin, true));
  });

  it("...should considere an admin as a user", () => {
    return instance.isUser(admin0).then(isUser => assert.equal(isUser, true));
  });

  it("...should autorize an admin to add a user", () => {
    return instance
      .addUser(user0)
      .then(() => instance.isUser.call(user0))
      .then(isUser => assert.equal(isUser, true));
  });

  it("...should autorize an admin to add an admin", () => {
    return instance
      .addAdmin(admin1, {from: admin0})
      .then(() => instance.isAdmin(admin1))
      .then(isAdmin => assert.equal(isAdmin, true));
  });

  it("...should refuse that a user create another user", () => {
    return instance
      .addUser(user1, {from: user0})
      .catch(err => assert.include(err.toString(), "Error"));
  });

  it("...should authorize an admin to remove an user", () => {
    return instance
      .removeUser(user0, {from: admin0})
      .then(() => instance.isUser(user0))
      .then(isUser => assert.equal(isUser, false));
  });

  it("...should authorize an admin to remove another admin", () => {
    return instance
      .removeAdmin(admin1, {from: admin0})
      .then(() => instance.isAdmin(admin1))
      .then(isAdmin => assert.equal(isAdmin, false));
  });

  it("...should unauthorize a user to remove another user", () => {
    return instance
      .addUser(user2)
      .then(() => instance.removeUser(user2, {from: user1}))
      .catch(err => assert.include(err.toString(), "Error"));
  });
});
