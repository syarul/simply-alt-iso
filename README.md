[![Build Status](https://travis-ci.org/syarul/simply-alt-iso.svg)](https://travis-ci.org/syarul/simply-alt-iso) [![Coverage Status](https://coveralls.io/repos/syarul/simply-alt-iso/badge.svg?branch=master&service=github)](https://coveralls.io/github/syarul/simply-alt-iso?branch=master)

# simply-alt-iso
A working copy of [coodoo](https://github.com/coodoo/react-alt-isomorphic-example) sample alt though with slight modification. I simplify the API call by removing the Utility method. The sample page use a firebase api and a simple counter. It seems by not having react-router there's less headache in figuring the routing and much more opaque, you can shape the routing in anyway you like. 

#installation
```
clone repo
npm install && npm run postinstall
```
For route testing
```
gulp test
```
visit [http://localhost:8080/](http://localhost:8080/)

#deployment to Redhat OpenShift

[Deployed Sample](http://iso-klofx.rhcloud.com/)

This is a short guide how to get this run on Openshift and to take advantage running nodejs gear with Babel which allow ES6 and JSX transpiling on the fly. Replace 'myapp' with your preferred application name.

```
rhc app create myapp nodejs-0.10 --from-code=git://github.com/syarul/simply-alt-iso.git

```

few notes:
this two setting in package.json  are important for this set up to work 
```
...
"scripts": {
	"start": "./node_modules/.bin/babel-node server.js"
},
"main": "server.js",
...
```
in .openshift/markers folder, create an empty file name with 'use_npm', this is to disable nodejs supervisor which the default app-deployment execution.

Finally in .openshift/action_hooks create a file name 'pre_start_nodejs' and add this line. 
```
export HOME=${OPENSHIFT_REPO_DIR}
```
Basically this will allow you to refer the repo directory instead of the deployed directory. By default Openshift bootstrap your repo directory into another deployment directory which has bare minimum to run a client side application. So for isomorphic application you want every part of your repo to be intact. With it you can do sort of thing that you do on local development like running test suite, gulp/grunt, transpiling ect.

All in all if you create your Openshift app from this repo git code it's already has the pre-setup to make it work with has been said above.

#todo

Add login and blog boilerplate.
