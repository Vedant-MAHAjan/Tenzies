## DEPLOY REACT APP ON GITHUB

#1 npm install gh-pages --save-dev

#2 create a new repo on github

#3 git remote add origin "url_of_repo"

#4 in package.json, below private, add "homepage": "http://Vedant-MAHAjan.github.io/{write repo name here without braces}"

#5 in scripts part, add "predeploy": "npm run build" and "deploy": "gh-pages -d build"

#6 npm run deploy will publish the app

#7 check URL added in homepage for the published app
