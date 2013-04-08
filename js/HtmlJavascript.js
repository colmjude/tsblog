(function($) {
	var detailsHTML = ['<h1>Tiddly Space</h1>',
		'<div>',
			'<p>latest development news, useful links and general happenings from Tiddlyspace</p>',
		'</div>',
		'<div class="links">',
			'<ul>',
				'<li><a href="http://blog.tiddlyspace.com" title="This blog">News</a></li>',
				'<li><a href="https://groups.google.com/forum/?fromgroups#!forum/tiddlyspace" title="TiddlySpace Google Group">Community</a></li>',
				'<li><a href="http://blog.tiddlyspace.com/TiddlySpace%20Blog%20Redesign" title="Post about the redesign">Redesign</a></li>',
			'</ul>',
		'</div>',
		'<div class="sociallinks">',
			'<ul>',
				'<li><a href="https://github.com/TiddlySpace/tiddlyspace" title="TiddlySpace source code at GitHub"><i class="icon-github icon-large"></i></a></li>',
				'<li><a href="https://twitter.com/tiddlyspace" title="TiddlySpace twitter"><i class="icon-twitter icon-large"></i></a></li>',
				'<li><a href="http://blog.tiddlyspace.com/tiddlers.atom?select=tag:post;sort=-modified" title="RSS feed"><i class="icon-rss icon-large"></i></a></li>',
			'</ul>',
		'</div>'].join("\n");

	$(function() {
		var $context = $("#container"),
			modified = $(".meta-modified:first").text(),
			tags = $(".meta-tag", $context);

		$("#links", $context).hide();

		$("<div></div>", {'id':'details'})
			.html(detailsHTML)
			.prependTo("body");

		$("<span></span>", 
			{ 'class': "date", 'text': modified })
			.appendTo("#header", $context);

		var $taglist = $("<p></p>")
				.text("tags: ")
				.addClass("tags");

		tags.each(function(i, el) {
			var item = $(el).html();
			$taglist.append(item);
			if(i === tags.length-1) {
				// last tag
				$taglist.appendTo("#article", $context);
			}
		});

		$(".meta", $context).remove();
	});

}(jQuery));