# 2dmap

[![NPM version](https://badge.fury.io/js/2dmap.svg)](http://badge.fury.io/js/2dmap)
[![Build Status](https://travis-ci.org/jeffcarp/2dmap.svg?branch=master)](https://travis-ci.org/jeffcarp/2dmap)

A simple coordinate map for use in 2d games. Extracted from [vida](https://github.com/jeffcarp/vida).

## On the server

```bash
npm install 2dmap
```

## In the browser

```html
<script src="http://cdn.partywavejs.org/2dmap"></script>
<script>
var Map = require('2dmap');
var gameMap = new Map({
  height: 10,
  width: 10
});
</script>
```
