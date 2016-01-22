var flickr = new Flickr();
var grid = new Grid(document.querySelector('.grid'));
var lightbox = new Lightbox(document.querySelector('.lightbox'));
var search = new Search(document.querySelectorAll('.search'));

var moreResults = document.querySelector('.show-more');
var loadingEl = document.querySelector('.loading');
var errorEl = document.querySelector('.error');

function loading(isLoading) {
  if (isLoading) {
    loadingEl.classList.add('active');
    error(false);
  } else {
    loadingEl.classList.remove('active');
  }
}

function error(isError) {
  if (isError) {
    errorEl.classList.add('active');
  } else {
    errorEl.classList.remove('active');
  }
}

document.querySelector('.grid').addEventListener('click', function(event) {
  if (event.target !== event.currentTarget) {
    lightbox.show(+event.target.dataset.index);
  }
});

search.onSearch(function(query) {
  loading(true);

  flickr.retrievePhotos({ search: query, page: 1 }, function(err, data) {
    if (err) {
      error(true);
      return;
    }

    lightbox.set(data, function() {
      window.scrollTo(0,0);
      loading(false);
    });

    grid.setToGrid(data);

    moreResults.classList.remove('btn-hidden');
  });
});

lightbox.onLastPhoto(function() {
  flickr.next(function(err, data) {
    if(err) {
      error(true);
      return;
    }
    lightbox.append(data);
    grid.appendToGrid(data);
  });
});

moreResults.addEventListener('click', function(event) {
  moreResults.classList.add('btn-loading');
  flickr.next(function(err, data) {
    if(!err) {
      lightbox.append(data);
      grid.appendToGrid(data);

      moreResults.classList.remove('btn-loading');
    } else {
      moreResults.classList.add('btn-error');
    }
  });
});
