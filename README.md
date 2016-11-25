# backbone-abort-pending

Backbone.sync wrapper for preventing request race conditions.

Loose fork of [backbone-safesync](https://github.com/amccloud/backbone-safesync).

[![npm Version][npm-badge]][npm]
[![Build Status][build-badge]][build-status]
[![Dependency Status][dep-badge]][dep-status]

## Installation

Install using npm:

    $ npm install backbone-abort-pending

## Usage

```js
var Backbone = require('backbone');
var abortPending = require('backbone-abort-pending');

// Wrap Backbone.sync with new functionality:
abortPending(Backbone);

// Then call models/collections with abortPending option:
myCollection.fetch();
myCollection.fetch({ abortPending: true });  // In-flight request aborted
```

## Motivation

This Backbone plugin aims to solve race conditions surrounding the order of
requests being issued versus the order in which they resolve. Imagine an
auto-complete input field that is powered by a collection fetch under the hood.
If the user types "cat", waits long enough for any throttle/debounce to end,
and then replaces the input with "dog" before the first request finishes, the
displayed search result view should never finalize with the results of "cat",
regardless of whether the request for "cat" or "dog" finished last. This plugin
attempts to solve such race conditions by aborting in-flight requests, so that
the last request made wins.

## API

#### `abortPending(Backbone)`

Main export. Takes a given Backbone instance and decorates `Backbone.sync` to
provide new functionality. Returns the modified Backbone instance.

#### `abortPending` (as a `$.ajax` option)

Triggers the plugin to kick in. If a request is in flight that has the same URL
and method as the current request, the original request is aborted. This will
naturally cause an `error` event to be emitted by the given model/collection.
Handle accordingly.

## License

MIT

[build-badge]: https://img.shields.io/travis/jimf/backbone-abort-pending/master.svg
[build-status]: https://travis-ci.org/jimf/backbone-abort-pending
[npm-badge]: https://img.shields.io/npm/v/backbone-abort-pending.svg
[npm]: https://www.npmjs.org/package/backbone-abort-pending
[dep-badge]: https://img.shields.io/david/jimf/backbone-abort-pending.svg
[dep-status]: https://david-dm.org/jimf/backbone-abort-pending
