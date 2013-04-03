(function($) {
	var $content, posttmpl, 
		fetching_posts = false,
		posttmplsource = [
			'<article class="post">',
				'<header>',
					'<h2><a href="/{{encoded_title}}">{{title}}</a></h2>',
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
				encoded_title: encodeURI( item.title ),
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
			limit = 10,
			url = "tiddlers?select=tag:post;sort=-created;limit=" + current_index + "," + limit + ";render=1";

		if( !fetching_posts ) {
			fetching_posts = true;
			$.getJSON( url, function(resp) {
				if(resp.length) {
					callback( resp );
					$(".loadmore").data("current-index", current_index + resp.length);
				}
				// if not enough (limit) posts are returned then have no more
				// so trigger event
				if(resp.length !== limit) {
					$.event.trigger('allpostsreturned');
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
		// is there a better way to do this
		var trigger_point = $( window ).height() + 200,
			doc_height = $( document ).height(),
			scroll_pos = $( document ).scrollTop();

		if(doc_height - scroll_pos < trigger_point) {
			fetchMorePosts( renderPosts );
		}
	}

	$(function() {
		$content = $("#content");
		posttmpl = Handlebars.compile(posttmplsource);

		var $btt = $("#backtotop").hide();

		// display bbt btn when user has scrolled x
		$( window ).scroll(function() {
			if( $(this).scrollTop() > ($("#details").height() - 200) ) {
				$btt.fadeIn();
			} else {
				$btt.fadeOut();
			}
		});

		// attach handler to scroll page back to top
		$btt.on("click", function(e) {
			$('body,html').animate({scrollTop: 0 }, 800);
			return false;
		});

		// get the initial set of posts
		getPosts( 0, renderPosts );

		// add handler to load more post on click
		$(".loadmore").on("click", function(e) {
			var $this = $(e.target);
			fetchMorePosts( renderPosts );
			return false;
		});

		$( document ).on("scroll.lazyloadscroll", function(e) {
			triggerLazyLoad();
		});

		// remove lazyload handler if all posts have already
		// been returned
		$( document ).on('allpostsreturned', function(e) {
			var $this = $(e.target);
			$this.off("scroll.lazyloadscroll");
			$(".loadmore").text("no more posts");
		});
	});

}(jQuery));
