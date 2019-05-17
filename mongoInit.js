/* eslint-disable */
db.runCommand({
  createUser: 'developer',
  pwd: 'password',
  roles: [
    {
      role: 'dbOwner',
      db: 'catalog',
    },
  ],
});
