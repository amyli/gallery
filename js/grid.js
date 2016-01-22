function Grid(el) {
  var _this = this;

  _this.el = el;
  _this.photos = [];

  // PRIVATE FUNCTION
  function render(photos, offset) {
    return photos.reduce(function(html, item, i) {
      return html += '<a class="grid-box" style="background-image: url(' +
        item.small + ');" data-index="' + (i + (offset || 0)) + '"></a>';
    }, '');
  }

  // PUBLIC FUNCTIONS
  _this.setToGrid = function(photos) {
    _this.photos = photos;
    _this.el.innerHTML = render(_this.photos);
  };

  _this.appendToGrid = function(photos) {
    _this.el.innerHTML += render(photos, _this.photos.length);
    _this.photos = _this.photos.concat(photos);
  };

}
