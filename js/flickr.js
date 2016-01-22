'use strict';

function Flickr() {

  var _this = this;

  // the current query
  _this.currentSearch = '';
  // current page of results
  _this.currentPage = 1;

  var apiKey = '';
  var baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=30&format=json&nojsoncallback=1&api_key='

  // sets your personal Flickr API key
  _this.setKey = function(apiKey) {
    apiKey = key;
  }

  _this.retrievePhotos = function(query, cb) {
    _this.currentSearch = query.search || _this.currentSearch;
    var page = query.page || _this.currentPage;

    makeRequest(baseUrl + apiKey + '&tags=' + _this.currentSearch + '&page=' + _this.currentPage, function(err, data) {
      if (err) {
        return cb(err);
      }

      // sometimes a search result won't turn up any photos...
      if (!data.photos) {
        return cb(null, []);
      }

      var photos = data.photos.photo.map(function(img) {
        return {
          title: img.title,
          small: createImageURL(img, '_n'),
          large: createImageURL(img, '_b')
        };
      });

      return cb(null, photos);
    });
  };

  // retrieve next page of results
  _this.next = function(cb) {
    _this.retrievePhotos({
      search: _this.currentSearch,
      page: _this.currentPage++
    }, cb);
  };

  // put together Flickr image url
  function createImageURL(img, size) {
    return 'https://farm' + img.farm + '.staticflickr.com/' + img.server + '/' + img.id + '_' + img.secret + size + '.jpg'
  }

  // all the cool xhr stuff here
  function makeRequest(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      // on error
      if(xhr.status !== 200) {
        return cb({
          error: 'Could not retrieve photos. :(',
          statusCode: xhr.status
        });
      }
      // otherwise, return parsed JSON
      return cb(null, JSON.parse(xhr.response));
    };

    xhr.onerror = function() {
      return cb({
        error: 'Could not retrieve photos. :(',
        statusCode: xhr.status
      });
    };

    xhr.send();
  }

}
