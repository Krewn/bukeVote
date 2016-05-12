REM "."
REM start myDb.bat
REM start dbShell.bat
set /A "MONGO_URL=mongodb://localhost:27017/meteor meteor"
start met.bat
start "google chrome" http://localhost:3000
meteor shell