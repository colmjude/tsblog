/*
 * Provide some useful TiddlySpace helper functions
 */
(function(exports, $) {
	"use strict";

	/*
	 * Turn a TiddlyWeb date into a date object
	 */
	function toDate(date) {
		return new Date(Date.UTC(
			parseInt(date.substr(0, 4), 10),
			parseInt(date.substr(4, 2), 10) - 1,
			parseInt(date.substr(6, 2), 10),
			parseInt(date.substr(8, 2), 10),
			parseInt(date.substr(10, 2), 10),
			parseInt(date.substr(12, 2) || "0", 10),
			parseInt(date.substr(14, 3) || "0", 10)
		));
	}

	/*
	 * Return the CSRF token stored in a cookie
	 */
	function getCSRFToken() {
		// XXX: should not use RegEx - cf.
		// http://www.quirksmode.org/js/cookies.html
		// https://github.com/TiddlySpace/tiddlyspace/commit/5f4adbe009ed4bda3ce39058a3fb07de1420358d
		var regex = /^(?:.*; )?csrf_token=([^(;|$)]*)(?:;|$)/;
		var match = regex.exec(document.cookie);
		var csrf_token = null;
		if (match && (match.length === 2)) {
			csrf_token = match[1];
		}
		return csrf_token;
	}

	/*
	 * returns url of the SiteIcon to use
	 */
	function getSiteIconURL(username) {
		if (!username || username === 'GUEST') {
			return 'http://tiddlyspace.com/SiteIcon';
		}
		return 'http://tiddlyspace.com/bags/' + username +
		'_public/tiddlers/SiteIcon';
	}

	/*
	 * Get user details from status.js (or server)
	 */
	function getUserDetails(callback) {
		if (window.tiddlyweb && tiddlyweb.status) {
			callback(tiddlyweb.status);
		} else {
			$.getJSON('/status.js', callback);
		}
	}

	/*
	 * checks if string is an acceptable space name
	 * returns boolean
	 */
	function isValidSpaceName(name) {
		return name.match(/^[a-z][0-9a-z\-]*[0-9a-z]$/) ? true : false;
	}

	/*
	 * turn string of tags back into tag array
	 */
	function stringToTags(tagString) {
		var brackets = /^\s*\[\[([^\]\]]+)\]\](\s*.*)/,
			whitespace = /^\s*([^\s]+)(\s*.*)/,
			match,
			rest = tagString,
			tags = [];

		match = brackets.exec(rest) || whitespace.exec(rest);
		while (match) {
			tags.push(match[1]);
			rest = match[2];
			match = brackets.exec(rest) || whitespace.exec(rest);
		}

		return tags;
	}

	/*
	 * turn tags array into a string
	 */
	function tagsToString(tags) {
		if (tags == null) { tags = []; }

		var tagString = '';
		tags.forEach(function(tag) {
			if (/( |\t|\n|\r|\[|\])/.test(tag)) {
				tagString += '[[' + tag + ']] ';
			} else {
				tagString += tag + ' ';
			}
		});

		return tagString.slice(0, tagString.length - 1);
	}

	// export _ts object with all available funcs
	exports._ts = {
		toDate: toDate,
		getSiteIconURL: getSiteIconURL,
		getUserDetails: getUserDetails,
		isValidSpaceName: isValidSpaceName,
		stringToTags: stringToTags,
		tagsToString: tagsToString
	};

}(window, jQuery));
