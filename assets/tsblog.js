(function($) {
	var $content, posttmpl,
		posttmplsource = [
			'<article class="post">',
				'<header>',
					'<h2>{{title}}</h2>',
					'<span class="date">{{date}}</span>',
				'</header>',
				'<div class="post-content"></div>',
				'<footer class="tags">',
					'<p>tags:',
						'{{#each tags}}',
						'<a href="#">{{this}}</a>',
						'{{/each}}',
					'</p>',
				'</footer>',
			'</article>'
			].join("\n");

	function renderPosts( posts ) {
		// requires forEach
		posts.forEach(function(item, ind, arr) {
			var date = _ts.toDate(item.modified);
			var postdata = {
				title: item.title,
				date: moment(date).format('LLLL'),
				tags: item.tags
			};
			var article = posttmpl(postdata);
			
			$(article)
				.find(".post-content")
					.append(item.render)
					.end()
				.insertBefore( ".loadmore", $content );
		});
	}

	$(function() {
		$content = $("#content");
		posttmpl = Handlebars.compile(posttmplsource);

		$.getJSON("tiddlers?select=tag:post;sort=-modified;limit=10;render=1", function(resp) {
			if(resp.length) {
				renderPosts( resp );
			}
		});

	});

}(jQuery));
