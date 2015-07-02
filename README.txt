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

-----
Development:

Conventional uses a convention-over-configuration concept. Adding a new area
of interest is easy:

1) Edit the app/js/config.js to add a new route, eg:
    'foo'       // if you want a controller with no route parameters
    'foo/:id'   // to have a controller which gets id as a parameter, like
                    the example app/js/controllers/edit.js does
2) Add a controller with that route name as the prefix, ie:
    app/js/controllers/foo.js
    - you can use the app/js/controllers/__shell.js as a starting point or
      look at the existing home.js and edit.js for pointers
3) Add a view under views:
    app/views/foo.html
4) Add a specs file for your controller -- use
    tests/specs/controllers/edit.spec.js as a starting point if you're not
    sure how
5) TDD your controller logic
6) Don't forget to put the relevant stuff in your view!

Some notes:
1) You'll find the Angular documentation (mostly) helpful. But google is still
your friend
2) RequireJS is cool, but may be a bit strange the first time you use it. Look
at the existing examples and remember that a module is defined with a define()
block which first has an array of dependencies and then the actual modul
function. Dependencies provide whatever they return out of the module
function.
3) "gulp serve" is magick. The good kind!
4) You can use gulp to minify, but I'd only really bother with this if you
were about to deploy to a webserver somewhere. You could take this further and
learn about RequireJS' r.js to bundle your modules. YMMV, but I'm ok with
keeping my Javascript unbundled -- Require loads dependencies asynchronously
and in parallel, so this is good enough for a lot of use cases.
5) Karma is great -- but do watch your test count. I've had instances where
karma picks up a file change and then "forgets" about the tests in that file.
If you get that or no failure when you've just written a test before code,
simply add whitespace onto your test somewhere and re-save.
6) I chose npm for the build system module provision and bower for the client
modules. Bower is more directed at client libraries, but node could have
provided those too. I'm not married to the choice -- it was a "six of one,
half-a-dozen of the other" thing. I think that Bower is a little lighter with
what is left in each module's folder, but I could be wrong. At any rate, the
two systems work quite similarly and this setup doesn't require copying
libraries out to a lib folder in the app. Documentation for bower is easy to
find through The Google.
7) This starter kit is very bare-bones. ON PURPOSE. One might extend this with
Web Starter Kit or Bootstrap or something similar, were One inclined.
