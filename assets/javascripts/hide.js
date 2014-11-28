(function () {
    Discourse.Markdown.whiteListTag('span', 'class', '*');

    Discourse.Dialect.inlineBetween({
        start: "[hide]",
        stop:  "[/hide]",
        rawContents: false,
        emitter: function(contents) {
            return ['details', ['summary', ['b', 'NSFW']]].concat(contents);
        }
    });

    Discourse.Dialect.inlineBetween({
        start: "[nsfw=]",
        stop:  "[/nsfw]",
        rawContents: true,
        emitter: function(contents) {
            var matches = contents.match(/(.+)]([\s\S]*)/);
            if (matches) return ['details', ['summary', ['b', matches[1]]]].concat(this.processInline(matches[2]));
        }
    });

}).call(this);
