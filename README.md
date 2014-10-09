# Elastic Tabstops JavaScript Implementation


## Usage

```js
var etab = new ElasticTabstops
etab.processLines(document.querySelectorAll('.code-line'))
```

## Examples

Here is the [https://github.com/hax/etab/blob/master/src/github.js](user script for supporting elastic tabstops on github)(note currently only tested under [http://tampermonkey.net/](tempermonkey)).
After [https://github.com/hax/etab/raw/master/dist/github.user.js](installing it), you could try some samples in your browser:

 * https://github.com/hax/etab/blob/master/src/index.js
 * https://github.com/hax/etab/blob/master/src/github-head.js
 * https://github.com/hax/haojing/blob/elastic-tabstops/htdocs/index.php
 * https://github.com/hax/etab/blob/master/example/hanging-punc.js