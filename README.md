# gallery

Photo search and lightbox feature, courtesy of the [Flickr API](https://www.flickr.com/services/api/).

__Demo:__ http://amyyli.com/gallery/

### Usage

All you need is a web server that can understand relative paths and serve static files. Fork the repo and create a `js/config.js` file with the following line of code:

```javascript
flickr.setKey('YOUR_FLICKR_API_KEY');
```

Enter a search query into the search box and have fun exploring photography!

### Future implementations

- UI tweaking (mobile support)
- JSONP instead of XHR
- Unit tests
- Keypress events for keyboard navigation.
- Bundle assets into build script (e.g. Gulp, Grunt, Webpack)
