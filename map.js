var Map = module.exports = function(options) {
  // Check this instanceof?
  this.height = options.height;
  this.width = options.width;

  // Not sure if it's the greatest idea
  // to make these public facing
  this.graph = {};
  this.items = {};
};

Map.prototype.at = function(x, y) {
  if (this.graph[x] !== undefined
      && this.graph[x][y] !== undefined) {
    // Graph only stores IDs
    return this.items[this.graph[x][y]];
  }
  else {
    return null;
  }
};

Map.prototype.idAt = function(x, y) {
  return (this.graph[x] && this.graph[x][y]) || null;
};

Map.prototype.place = function(item, x, y) {
  if (!x) {
    if (!item.x) {
      // TODO: Change errors from bools to exceptions
      return false;
    }
    else {
      var x = item.x;
    }
  }
  if (!y) {
    if (!item.y) {
      return false;
    }
    else {
      var y = item.y;
    }
  }
  if (x > this.width || x < -this.width) {
    return false;
  }
  if (y > this.height || y < -this.height) {
    return false;
  }
  if (!isNaN(item.id) && this.vacant(x, y)) {
    item.x = x;
    item.y = y;
    this.graph[x] = this.graph[x] || {};
    this.graph[x][y] = item.id;
    this.items[item.id] = item;
    return true;
  }
  else {
    return false;
  }
};

Map.prototype.vacant = function(x, y) {
  return !Boolean(this.at(x, y));
};

Map.prototype.removeById = function(id) {
  var item = this.items[id];
  if (!item) return false;
  var x = item.x;
  var y = item.y;
  if (!this.vacant(x, y)) {
    delete this.graph[x][y];
    if (Object.keys(this.graph[x]).length === 0) {
      delete this.graph[x];
    }
    delete this.items[id];
    return true;
  }
  else {
    return false;
  }
};

Map.prototype.move = function(from, to) {
  var fromX = from[0];
  var fromY = from[1];
  var toX = to[0];
  var toY = to[1];
  if (toX > this.width || toX < -this.width) {
    return 'X out of bounds';
  }
  if (toY > this.height || toY < -this.height) {
    return 'Y out of bounds';
  }
  if (this.vacant(fromX, fromY)) {
    return 'No item at from coords';
  }
  if (!this.vacant(toX, toY)) {
    return 'To coords occupied';
  }
  var item = this.at(fromX, fromY);
  this.removeById(item.id);
  this.place(item, toX, toY);
  return true;
};
