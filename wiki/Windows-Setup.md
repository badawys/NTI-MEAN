# Windows Environment Setup

These instructions target Windows 10/11 with PowerShell. Use an account allowed to install software.

## 1. Install the tools

1. Install **Git for Windows** from <https://git-scm.com/download/win>. Keep “Git from the command line” enabled.
2. Install **Node.js 24 LTS** from <https://nodejs.org/>. The installer includes npm.
3. Install **MongoDB Community Server 8.0** from <https://www.mongodb.com/try/download/community>. Choose the MSI, select “Complete,” and install MongoDB as a Windows service.
4. Install **MongoDB Shell (`mongosh`)** if the server installer did not include it.
5. Optional but recommended: install Visual Studio Code from <https://code.visualstudio.com/>.

Restart PowerShell, then verify:

```powershell
node --version
npm --version
mongod --version
mongosh --version
```

Node should be at least `22.22.3`; this course uses `24.15.0`.

## 2. Allow npm commands if PowerShell blocks them

Only when PowerShell reports that `npm.ps1` or `ng.ps1` cannot run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Read the prompt, confirm the CurrentUser scope, then reopen PowerShell.

## 3. Install Angular 22 CLI

```powershell
npm install --global @angular/cli@22.0.7
ng version
```

The output must show Angular CLI 22 and a supported Node version.

## 4. Prepare the repository

```powershell
git clone <repository-url> codes-training-center
cd codes-training-center
Copy-Item server\.env.example server\.env
npm install
```

If the folder was provided as a ZIP, extract it and start at `cd`.

## 5. Start MongoDB

The MSI normally creates a running service. Check it:

```powershell
Get-Service MongoDB
Start-Service MongoDB
```

If you chose not to install a service, create a data directory and start it in a separate terminal:

```powershell
New-Item -ItemType Directory -Force C:\data\db
mongod --dbpath C:\data\db
```

## 6. Seed and run

```powershell
npm run seed
npm run dev
```

Open <http://localhost:4200>. Leave the terminal open. Press `Ctrl+C` once to stop both development servers.

## Windows checks

- <http://localhost:3000/api/health> returns JSON with `"status":"ok"`.
- The Angular page loads at <http://localhost:4200>.
- `mongosh "mongodb://127.0.0.1:27017/codes_training_center"` connects.

See [Troubleshooting](Troubleshooting.md) if a port, script policy, or MongoDB service check fails.
