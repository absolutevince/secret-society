# SECRET SOCIETY

_not really secret sociecty, more like a "on-click = a member" society._

**A community app where a user can join/create clubs and filled it with beautiful conversations with other club members**

## Features

- Authentication
- Create/Delete own Clubs
- Create/Delete own Posts (from a club)
- Admin privileges
  - allowed to delete the club
  - allowed to delete other member's posts
  - more to be added...
- Member privileges and restrictions
  - allowed to post
  - club members names are not hidden
  - not allowed to delete other member's posts
  - not allowed to delete the club
  - more to be added...
- Non-member restriction
  - club members names are hidden
  - not allowed to post
  - more to be added...

## How to run locally

### Requirements

- Posgresql
- You should have already set-up posgresql and created a role

### Steps

```bash
git clone https://github.com/absolutevince/secret-society.git &&
cd secret-society
```

create a .env on the root folder with the format:

```c
DB = "socsec" // this should be the name
DB_PW = <password> // your role password
ROLE_NAME = <role_name> // your role name
SESSION_SECRET = <secret> // a secret word/string for database's security

```

run the following:

_download the dependencies_

```bash
npm init
```

_initialize database and creates the necessary tables with additional session table from `connect-pg-simple` to store session_

```bash
npm init-db
```

_run the server_

```c
npm run serve // runs node app.js --watch
npm run serve-nodemon // runs nodemon app.js  (nodemon required)
```

**_Miscellaneous:_**

_to reset the database from scratch (deletes everything)_

```bash
npm reset-db
```
