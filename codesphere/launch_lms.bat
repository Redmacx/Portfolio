@echo off
echo ========================================================
echo CodeSphere LMS - Local Server
echo ========================================================
echo YouTube requires videos to be run on a web server rather than
echo directly from a file to prevent "Video Unavailable" errors.
echo.
echo Starting local web server on port 8080...
echo Keep this window open while you use the LMS!
echo.
start http://localhost:8080/codesphere-ui-demo.html
python -m http.server 8080
