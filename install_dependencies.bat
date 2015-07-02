@echo off
echo Installing Node modules...
call npm install
cd app
echo Installing Bower components...
node ..\node_modules\bower\bin\bower install
cd ..
