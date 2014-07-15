(function () {
    Discourse.Markdown.whiteListTag('span', 'class', '*');

    Discourse.Dialect.inlineBetween({
        start: "[nsfw]",
        stop:  "[/nsfw]",
        rawContents: true,
        emitter: function(contents) {
            return ['details', ['summary', ['b', 'NSFW']]].concat(this.processInline(contents));
        }
    });

    Discourse.Dialect.inlineBetween({
        start: "[hide=",
        stop:  "[/hide]",
        rawContents: true,
        emitter: function(contents) {
            var matches = contents.match(/(.+)](.*)/);
            if (matches)
                return ['details', ['summary', ['b', matches[1]]]].concat(this.processInline(matches[2]));
        }
    });

}).call(this);
