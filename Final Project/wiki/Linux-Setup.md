# Linux Environment Setup

The examples use Ubuntu 24.04/Debian-compatible commands. For Fedora/Arch, install equivalent packages but keep the same supported versions.

## 1. Install Git and basic tools

```bash
sudo apt update
sudo apt install -y git curl ca-certificates gnupg
```

## 2. Install NVM and Node.js 24

Use the current NVM installation instructions from <https://github.com/nvm-sh/nvm>. After NVM is available:

```bash
nvm install 24.15.0
nvm alias default 24.15.0
nvm use 24.15.0
node --version
npm --version
```

Using NVM avoids `sudo npm install --global` permission problems.

## 3. Install Angular 22 CLI

```bash
npm install --global @angular/cli@22.0.7
ng version
```

## 4. Install MongoDB Community 8.0

Follow MongoDB’s distribution-specific repository steps at <https://www.mongodb.com/docs/v8.0/administration/install-on-linux/>. After package installation:

```bash
sudo systemctl enable --now mongod
sudo systemctl status mongod
mongosh --eval 'db.runCommand({ ping: 1 })'
```

Do not substitute Ubuntu’s unrelated `mongodb` package; use MongoDB’s signed Community packages.

## 5. Prepare and run the project

```bash
git clone <repository-url> codes-training-center
cd codes-training-center
cp server/.env.example server/.env
npm install
npm run seed
npm run dev
```

Open <http://localhost:4200>. The API health endpoint is <http://localhost:3000/api/health>.

## Server/firewall note

For local development, MongoDB listens on loopback and should not be exposed. If you are using a remote Linux VM, use SSH port forwarding or a properly secured deployment; do not open port `27017` publicly.
