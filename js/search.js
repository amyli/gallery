function Search(query) {
  var _this = this;

  _this.query = query;

  var searchCb = function() {};

  function onKeyUp(event) {
    if (event.keyCode === 13 && this.value) {
      searchCb(this.value);
    }
  }

  for (var i = 0; i < _this.query.length; i++) {
    if (_this.query[i].type === 'text') {
      _this.query[i].addEventListener('keyup', onKeyUp);
    }
  }

  _this.onSearch = function(cb) {
    searchCb = cb;
  };
}
