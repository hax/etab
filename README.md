# Elastic Tabstops JavaScript Implementation for Browsers


## Usage

```js
var etab = new ElasticTabstops
etab.processLines(document.querySelectorAll('.code-line'))
```

## Examples

Here is the [user script for supporting elastic tabstops on github](https://github.com/hax/etab/blob/master/src/github.js) (note currently only tested under [tempermonkey](http://tampermonkey.net/)).
After [installing it](https://github.com/hax/etab/raw/master/dist/github.user.js), you could try some samples in your browser:

 * https://github.com/hax/etab/blob/master/src/index.js
 * https://github.com/hax/etab/blob/master/src/github-head.js
 * https://github.com/hax/haojing/blob/elastic-tabstops/htdocs/index.php
 * https://github.com/hax/etab/blob/master/example/hanging-punc.js


## TODO

### Core
 * [ ] try to utilize CSS tab-size
 * [ ] indent width (normally wide than tab min width for align)
 * [ ] detect tab size of the source
 * [ ] extension of alignment:
	- `auto aligned[TAB]`
	- `[SP]right aligned[TAB]`
	- `left aligned[SP][TAB]`
	- `[SP]center aligned[SP][TAB]`
	- `3.14159 (decimal aligned)[TAB]`

### Github user script
 - [x] test Firefox (with Geasemonkey)
 - [ ] test IE (with ?)
 - [ ] add settings button and dialog
 - [ ] allow change font, tab width and other configurations
 - [x] support diff view
 - [ ] only process the code block that use elastic tabstops
