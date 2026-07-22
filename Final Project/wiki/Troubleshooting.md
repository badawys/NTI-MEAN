# Troubleshooting

## `ng` reports an unsupported Node version

Angular 22 needs Node `22.22.3`, `24.15.0`, or a newer supported version. Run `node --version`, then select the installed course version:

```bash
nvm use 24.15.0
```

If `nvm` is not found, reopen the terminal or reload the shell profile created by the NVM installer.

## API cannot connect to MongoDB

- macOS: `brew services list` then `brew services start mongodb-community@8.0`.
- Linux: `sudo systemctl status mongod` then `sudo systemctl start mongod`.
- Windows: `Get-Service MongoDB` then `Start-Service MongoDB` in an elevated PowerShell.
- Confirm `MONGODB_URI=mongodb://127.0.0.1:27017/codes_training_center`.
- Use `127.0.0.1`, not `localhost`, to avoid local IPv6 surprises.

## Port 3000 or 4200 is busy

Stop the earlier class process with `Ctrl+C`. On macOS/Linux inspect with `lsof -i :3000` or `lsof -i :4200`; on Windows use `Get-NetTCPConnection -LocalPort 3000`.

## Browser shows a CORS error

The development API accepts `localhost:4200`, `127.0.0.1:4200`, and the exact `CLIENT_ORIGIN`. For any other host/port, change `CLIENT_ORIGIN` in `server/.env`, then restart the API.

## Login works but protected requests fail

Clear the local session from browser storage by logging out, run `npm run seed`, and log in again. Tokens signed before a JWT secret change are invalid.

## Tailwind styles are missing

Run `npm install` at the repository root, confirm `client/.postcssrc.json` exists, then restart `npm run dev`. Do not run Angular from a different repository.

## Seed fails with duplicate or connection errors

The script first clears the three project collections and is safe to rerun against the configured sample database. Verify MongoDB is running and that `MONGODB_URI` points to the intended training database.
