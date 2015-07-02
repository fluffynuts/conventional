1) install Node.js on your machine...

2) install the required dependencies
> install_dependencies.bat

(this just runs npm install in the root of the repo source and bower_install in 
    the app folder)

3) To see it in action, in the source folder, do:
> gulp serve
(you must have this site served over http as browsers will get stuck on loading
views from the filesystem)

4) to run tests, in the source folder do:
> karma start

5) the gulpfile and dependencies are taken from Web Starter Kit, so you can
> gulp
to build a minified version of your site in the dist folder
