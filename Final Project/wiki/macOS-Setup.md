# macOS Environment Setup

These steps prepare an Apple Silicon or Intel Mac for the project.

## Install Node.js 24 with NVM

Install NVM from <https://github.com/nvm-sh/nvm>, reopen Terminal, then:

```bash
nvm install 24.15.0
nvm alias default 24.15.0
nvm use 24.15.0
npm install --global @angular/cli@22.0.7
ng version
```

## Install MongoDB 8 with Homebrew

```bash
brew tap mongodb/brew
brew trust mongodb/brew
brew install mongodb-community@8.0
brew services start mongodb-community@8.0
mongosh --eval 'db.runCommand({ ping: 1 })'
```

Homebrew versions before tap trust enforcement may not need `brew trust`.

## Prepare and run

```bash
cd /path/to/NTI-MEAN
cp server/.env.example server/.env
npm install
npm run seed
npm run dev
```

Open <http://localhost:4200>. Use `brew services list` to check MongoDB later.
