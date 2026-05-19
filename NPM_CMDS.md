### Some npm publishing commands
```
npm login      
npm whoami  

or 
npm config set //registry.npmjs.org/:_authToken=NEW_TOKEN //bypass 2FA
npm whoami

npm publish --tag beta --access public //for beta
or 
npm publish --access public //for official version

//for set to latest
npm dist-tag add robot-toast@1.0.1-beta-0 latest

npm version patch
npm version minor
npm version major
npm version 1.0.1
```
