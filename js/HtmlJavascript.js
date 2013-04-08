(function($) {

	$(function() {
		var $context = $("#container"),
			modified = $(".meta-modified:first").text(),
			tags = $(".meta-tag", $context);

		$("#links", $context).hide();

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