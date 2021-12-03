# Strapi application with NEXT JS frontend

## Features:

1. Authentication.
2. Cart with auth or without auth (cookie cart)
3. Cloudinary based image server
4. Env settings example
5. Cookie cart syncronize with backend (if price change)

## FOR DEVELOP

1. copy to .env all from .env.development and fill the SECRETS (has AUTHENTICATION_DATABASE)
2. yarn
3. yarn develop

## FOR PRODUCTION

1. copy to .env all from .env.production and fill the SECRETS (hasn't AUTHENTICATION_DATABASE)
2. yarn
3. yarn build
4. yarn start

## FIRST CHECK DB CONNECTION

mongo "mongodb+srv://MYCLUSTER.mongodb.net/MYDB" --username MYUSER

## DO THIS ROLES & PERMISSIONS IN STRAPI ADMIN

1. Public

- Dish => find,findone
- Restaurant => find, findone
- Cart => create, findone (Advanced settings Allow to perform this action for: isauthenticated), update (Advanced settings Allow to perform this action for: isauthenticated)
- User-Permissions:
  - User=>me
- Donate => updateToConfirm

2. Authenticated

- Dish => find,findone
- Restaurant => find, findone
- Cart => create, findone, update
- User-Permissions:
  - User=>me, update, getuserorders
- Donate => count, find, findone, createorupdate, findlast
