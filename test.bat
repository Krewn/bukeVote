cd "."
start myDb.bat
start dbShell.bat
setx /M MONGO_URI "mongodb://localhost:27017/common"
start met.bat
start "google chrome" http://localhost:3000