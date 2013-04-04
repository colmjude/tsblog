tsblog
===
A tiddlyspace SPA used for the [tiddlyspace blog](http://blog.tiddlyspace.com)

###Dependencies
Requires:

* [grunt 0.4+](http://gruntjs.com/) for the build
* [sass](http://sass-lang.com/) and [compass](http://compass-style.org/) for the stylesheets.
* [tsapp](https://github.com/cdent/tsapp) for running locally

###Running
Firstly, from the home directory run:

	npm install
	
Then to setup run (default grunt task):

	grunt
	
To run app locally run:

	grunt ts-serve
	
To update locally and run use:

	grunt update-dev
	
###Deploy
To deploy you need to first authenticate. Do this by running:

	tsapp auth <username>
	
Then you can run:

	grunt ts-deploy
	
to deploy latest code.

###Who

Colm Britton aka [colmjude](http://colmjude.com)
