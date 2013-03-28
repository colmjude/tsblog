(function($) {
	var $content, posttmpl, 
		fetching_posts = false,
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

	function getPosts( current_index, callback ) {
		var current_index = current_index || 0,
			url = "tiddlers?select=tag:post;sort=-modified;limit=" + current_index + ",10;render=1";

		if( !fetching_posts ) {
			fetching_posts = true;
			$.getJSON( url, function(resp) {
				if(resp.length) {
					callback( resp );
					$(".loadmore").data("current-index", current_index + resp.length);
				}
			}).always(function() {
				fetching_posts = false;
			});
		}
	}

	function fetchMorePosts(callback) {
		var current_index = $(".loadmore").data("current-index");
		getPosts( current_index, callback );
	}

	function triggerLazyLoad() {
		var trigger_point = 500,
			doc_height = $( document ).height(),
			scroll_pos = $( document ).scrollTop();

		if(doc_height - scroll_pos < trigger_point) {
			fetchMorePosts( renderPosts );
		}
	}

	$(function() {
		$content = $("#content");
		posttmpl = Handlebars.compile(posttmplsource);

		// get the initial set of posts
		getPosts( 0, renderPosts );

		// add handler to load more post on click
		$(".loadmore").on("click", function(e) {
			var $this = $(e.target);
			fetchMorePosts( renderPosts );
			return false;
		});

		$( document ).on("scroll", function(e) {
			triggerLazyLoad();
		});
	});

}(jQuery));
