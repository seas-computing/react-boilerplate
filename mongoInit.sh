#! /bin/sh
mongo --eval "
  db
  .getSiblingDB('$DB_DATABASE')
  .createUser({
    user: '$DB_USERNAME',
    pwd: '$DB_PASSWORD',
    roles: [
      {
        role: 'dbOwner',
        db: '$DB_DATABASE'
      }
    ],
  });"
