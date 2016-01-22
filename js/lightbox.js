function Lightbox(el) {
  var _this = this;

  _this.el = el;
  _this.photos = [];

  var currentIndex = 0;
  var lightboxPhoto = _this.el.getElementsByClassName('lightbox-photo')[0];
  var lightboxPhotoSrc = _this.el.getElementsByClassName('lightbox-photo-src')[0];
  var lightboxTitle = _this.el.getElementsByClassName('lightbox-title')[0];
  var lightboxOff = _this.el.getElementsByClassName('lightbox-off')[0];
  var prevCtrl = _this.el.getElementsByClassName('lightbox-ctrl-prev')[0];
  var nextCtrl = _this.el.getElementsByClassName('lightbox-ctrl-next')[0];
  var lastPhotoCb = function() {};

  // PRIVATE FUNCTIONS
  function loadPhoto(url, cb) {
    var tmpPhoto = new Image();
    tmpPhoto.src = url;
    if(cb) {
      tmpPhoto.onload = cb;
    }
  }

  function setCurrent(index, cb) {
    // make sure we have an image to set!
    if(!_this.photos[index]) {
      return;
    }

    // pull up the loading overlay
    lightboxPhoto.classList.add('lightbox-photo-loading');
    lightboxTitle.innerHTML = '';

    loadPhoto(_this.photos[index].large, function() {
      lightboxPhotoSrc.src = _this.photos[index].large;
      lightboxPhoto.style.backgroundImage = 'url(' + _this.photos[index].large + ')';
      lightboxPhoto.classList.remove('lightbox-photo-loading');
      lightboxTitle.innerHTML = _this.photos[index].title;

      if(cb) {
        return cb();
      }
    });
  }

  function setPrevPhoto(index) {
    if(_this.photos[index]) {
      prevCtrl.classList.remove('lightbox-ctrl-disable');
      loadPhoto(_this.photos[index].large);
    } else {
      prevCtrl.classList.add('lightbox-ctrl-disable');
    }
  }

  function setNextPhoto(index) {
    if(_this.photos[index]) {
      nextCtrl.classList.remove('lightbox-ctrl-disable');
      loadPhoto(_this.photos[index].large);
    } else {
      nextCtrl.classList.add('lightbox-ctrl-disable');
    }
  }

  function setPhotos(index) {
    setCurrent(index);
    setPrevPhoto(index - 1);
    setNextPhoto(index + 1);
  }

  // PUBLIC FUNCTIONS
  _this.set = function(photos, cb) {
    _this.photos = photos || [];

    // do nothing if there are no photos
    if(!_this.photos.length) {
      return cb(null, []);
    }

    currentIndex = 0;
    setCurrent(currentIndex, cb);
    setPrevPhoto(null);
    setNextPhoto(currentIndex + 1);
  };

  _this.append = function(photos) {
    _this.photos = _this.photos.concat(photos);
    setNextPhoto(currentIndex);
  };

  _this.previous = function() {
    setPhotos(currentIndex--);
  };

  _this.next = function() {
    setPhotos(currentIndex++);
    if(currentIndex >= _this.photos.length - 1) {
      lastPhotoCb();
    }
  };

  _this.onLastPhoto = function(cb) {
    lastPhotoCb = cb;
  };

  _this.show = function(index) {
    if(typeof index === 'number') {
      currentIndex = index;
      setCurrent(index, function() {
        _this.el.classList.remove('lightbox-hide');
      });
      setPrevPhoto(index - 1);
      setNextPhoto(index + 1);

      // if we're at the last photo, callback should be triggered
      if(currentIndex >= _this.photos.length - 1) {
        lastPhotoCb();
      }
    } else {
      _this.el.classList.remove('lightbox-hide');
    }
  };

  _this.hide = function() {
    _this.el.classList.add('lightbox-hide');
  };

  // event listeners
  prevCtrl.addEventListener('click', _this.previous);
  nextCtrl.addEventListener('click', _this.next);
  lightboxOff.addEventListener('click', _this.hide);

}
