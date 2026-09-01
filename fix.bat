@echo off
echo Starting update...
npm update > npm_update.log 2>&1
echo Done npm update
npm install > npm_install.log 2>&1
echo Done npm install
echo Finished > fix_done.txt
