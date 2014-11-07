# Wraith for Image Comparison

## What it is

[Wraith](https://github.com/BBC-News/wraith) is an Image Comparison tool for web applications.
It allows you to capture images of web pages and compare them to reference images.
This potentially allows us to capture a set of images which we consider as our base/reference images.
When changes are made to the codebase, we run Wraith against our application with our changes in place.
Wraith will generate an image gallery with differences between the reference image and the current/latest illustrated in a visual diff.

## What it does
Wraith interfaces with [Phantom JS](http://phantomjs.org/), a headless WebKit browser implementation to visit and render pages on the website.
When rendered, Wraith invokes [ImageMagick](http://www.imagemagick.org/) to capture an image/screenshot of the page.

Wraith has two modes of operation.
In 'History mode', Wraith will compare images of the web application under test with a set of baseline images.
In 'Standard mode', Wraith will compare images of the web application under test with screenshots taken of another domain.
This may be useful for taking screenshots of the application running in another environment, production for example.

Additionally there exists a Wraith wrapper called [Wraith Donk](https://github.com/guardian/wraith-donk).
This provides a webserver wrap around with Wraith tool, and adds email functionality to it.

## What's good about that
Wraith with Wraith Donk is potentially useful in a CI environment, especially one where we operate a pull request model.
Wraith Donk could run against an incoming pull request and provide email feedback on visual changes which the pull request has created.

## What's not so good
### Dependencies
Phantom JS hase a number of issues around support for webfonts.
This means that our beautiful Font Awesome icons render as square boxes with a crab-looking icon in them.
Our default typeface Source Code Pro, is also subsituted for Arial in the captured images.
It's not clear when the next version of Phantom JS will be released, but it's probably reasonable to assume webfont support will be added.

## What we'll need to build
Using Wraith for our application will require us to build a few components:

 - Gulp or other task to sync local (development) reference images, with a central set of reference images used by CI.
 - Docker or other image to run in CI to get consistent builds and save having to rely on Travis to support our binary dependencies.

