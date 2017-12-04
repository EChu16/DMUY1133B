/*
  Erich Chu
  Mosaic Maker
  Creative Coding Final
*/

// Constants
var all_colors = [];
var img_color_map = [[]];
var current_img_mosaic = [[]];
var mosaic_img;
var marilyn_img;
var apple_img;
var egg_img;
var gudetama_img;
var img_search;
var PIXEL_WIDTH = 10;
var PIXEL_HEIGHT = 10;
var flickrSearchEngine;
var searchKeyword = "girl"; //default
var initialLoadFinished = false;
var DEFAULT_IMGS = {
  'blue': 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG',
  'pink': 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Rose-pink.jpg',
  'teal': 'http://s3-us-west-1.amazonaws.com/admissions-prod-storage.cloud.caltech.edu/styles/grid_7/s3/dark_teal.jpg',
  'white': 'https://www.schusterman.org/sites/default/files/White%20Background.jpg',
  'brown': 'https://i.pinimg.com/originals/a1/8d/1b/a18d1bba69f031319d1238a2a287c3ee.jpg',
  'black': 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Black_from_a_camera.jpg',
  'green': 'https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/252466/green.jpg',
  'orange': 'https://static1.squarespace.com/static/58cffa90d2b857fcab4f2ab3/t/591d501db3db2b5fb9b79b53/1495093284736/background+-+orange.jpg',
  'purple': 'https://vignette.wikia.nocookie.net/phobia/images/1/1b/Purple.jpg/revision/latest?cb=20161109231115',
  'red': 'http://www.tascsoftware.co.uk/wiki/PARS/images/5/5a/Red.jpg',
  'yellow': 'https://upload.wikimedia.org/wikipedia/commons/4/44/WO_Yellow.jpg',
  'gray': 'https://nikolaosvrv.files.wordpress.com/2011/12/dsc3368.jpg'
}
var imageLoaded = 'marilynmonroe.jpg'
function preload() {
  marilyn_img = loadImage('marilynmonroe.jpg');
  apple_img = loadImage('apple.jpg');
  egg_img = loadImage('egg.png');
  gudetama_img = loadImage('gudetama.jpg');
}

function colorInArray(pixel_color, all_colors) {
  var hasColor = all_colors.some(function(c) {
    return c == pixel_color;
  })
  return hasColor;
}

function colorToHex(c) {
  const hexVal = c.toString(16);
  return hexVal.length == 1 ? "0" + hexVal : hexVal;
}

function rgbToHexColor(pixel_color) {
  const r = pixel_color[0];
  const g = pixel_color[1];
  const b = pixel_color[2];
  return "#" + colorToHex(r) + colorToHex(g) + colorToHex(b)
}

function roundHexComponentUp(hex_val) {
  var dec_val_1 = parseInt(hex_val[0], 16);
  var dec_val_2 = parseInt(hex_val[1], 16);
  var rounded_hex = "";
  if (dec_val_2 > 8) {
    dec_val_1 += 1;
    if (dec_val_1 == 16) {
      rounded_hex += "F0";
    } else {
      rounded_hex += dec_val_1.toString(16) + "0";
    }
  }
  else {
    rounded_hex += dec_val_1.toString(16) + "0";
  }
  return rounded_hex;
}

function roundHexUp(hex_color) {
  var rounded_hex = "";
  for(i = 1; i < hex_color.length; i += 2) {
    rounded_hex += roundHexComponentUp(hex_color.substring(i, i+2));
  }
  return rounded_hex;
}

function roundHexToFlickrColor(hex_color) {
  const rounded_color = roundHexUp(hex_color).toLowerCase();
  return flickr_colors[rounded_color]
}

function preloadImageColors() {
  var pixel_color;
  var pixel_hex_color;
  var pixel_googl_color;

  mosaic_img.resize(600, 600);
  for (var x = 0; x < mosaic_img.width; x += PIXEL_WIDTH) {
    img_color_map[x] = [];
    for (var y = 0; y < mosaic_img.height; y += PIXEL_HEIGHT) {
      pixel_color = mosaic_img.get(x, y);
      pixel_hex_color = rgbToHexColor(pixel_color);
      pixel_flickr_color = roundHexToFlickrColor(pixel_hex_color);

      if(!pixel_flickr_color) {
        console.log(pixel_color);
        console.log(pixel_hex_color);
        console.log(roundHexUp(pixel_hex_color));
        pixel_flickr_color = "white";
      }
      img_color_map[x][y] = pixel_flickr_color;
      if (!colorInArray(pixel_flickr_color, all_colors)) {
        all_colors.push(pixel_flickr_color);
      }
    }
  }
}

function setupFlickrSearchEngine() {
  flickrSearchEngine = new FlickrSearchEngine();
  if(localStorage.getItem('mosaicMaker') === null) {
    localStorage.setItem('mosaicMaker', '{}');
  }
  var mosaicMakerStorage = JSON.parse(localStorage.getItem('mosaicMaker'));
  if (!(imageLoaded in mosaicMakerStorage)) {
    mosaicMakerStorage[imageLoaded] = {};
    localStorage.setItem('mosaicMaker', JSON.stringify(mosaicMakerStorage));
  }
}

function searchForImgsByColor() {
  for (i = 0; i < all_colors.length; i++) {
    flickrSearchEngine.searchAndCacheForImgs(imageLoaded, all_colors[i] + " " + searchKeyword);
  }
}

function createMosaicForImg() {
  const mosaicMakerStorage = JSON.parse(localStorage.getItem('mosaicMaker'));
  const imageStorage = mosaicMakerStorage[imageLoaded]
  for(var x = 0; x < img_color_map.length; x+=PIXEL_WIDTH) {
    current_img_mosaic[x] = [];
    for(var y = 0; y < img_color_map[x].length; y+=PIXEL_HEIGHT) {
      const pixel_color = img_color_map[x][y];
      const searchTerm = (pixel_color + " " + searchKeyword).split(" ").join("%20");
      const image = imageStorage[searchTerm][Math.floor(Math.random() * imageStorage[searchTerm].length)];
      if(image) {
        current_img_mosaic[x][y] = createImg(flickrSearchEngine.retrievePhoto(image['farm_id'], image['server_id'], image['photo_id'], image['secret']));
      } else {
        current_img_mosaic[x][y] = createImg(DEFAULT_IMGS[pixel_color]);
      }
      current_img_mosaic[x][y].hide();
    }
  }
  initialLoadFinished = true;
}

function ensureStorageCacheLoaded() {
  return new Promise(function (resolve, reject) {
      waitForStorageCache(resolve);
  });
}

function waitForStorageCache(resolve) {
  const mosaicMakerStorage = JSON.parse(localStorage.getItem('mosaicMaker'));
  const imageStorage = mosaicMakerStorage[imageLoaded];
  const pixel_color = img_color_map[0][0];
  const searchTerm = (pixel_color + " " + searchKeyword).split(" ").join("%20");
  if(imageStorage.hasOwnProperty(searchTerm)) {
    return resolve();
  } else {
    setTimeout(waitForStorageCache, 30);
  }
}

function setup() {
  var canvas = createCanvas(600, 600);
  canvas.parent(document.getElementById('sketch-canvas'))
  mosaic_img = marilyn_img;
  preloadImageColors();
  setupFlickrSearchEngine();
  searchForImgsByColor();
  ensureStorageCacheLoaded().then(createMosaicForImg);
}

function draw() {
  background(230, 230, 230);
  noStroke()
  if(initialLoadFinished) {
    for(var x = 0; x < current_img_mosaic.length; x+=PIXEL_WIDTH) {
      for(var y = 0; y < current_img_mosaic[x].length; y+=PIXEL_HEIGHT) {
        image(current_img_mosaic[x][y], x, y, PIXEL_WIDTH, PIXEL_HEIGHT);
      }
    }
  } else {
    text("Generating new mosaic", 50, 50);
  }
}

function setNewImgChoice(imgChoice) {
  switch(imgChoice) {
    case "marilynmonroe.jpg":
      mosaic_img = marilyn_img;
      break;
    case "apple.jpg":
      mosaic_img = apple_img
      break;
    case "egg.png":
      mosaic_img = egg_img
      break;
    case "gudetama.jpg":
      mosaic_img = gudetama_img
      break;
    default:
        mosaic_img = marilyn_img;
}
}

function generateNewMosaic() {
  const imgChoice = $('#image-choice').val();
  var newSearchWord = $('#keyword').val();
  if(newSearchWord == "") {
    searchKeyword = "color";
  }
  if(imgChoice != imageLoaded || searchKeyword != newSearchWord) {
    initialLoadFinished = false;
    setNewImgChoice(imgChoice);
    imageLoaded = imgChoice;
    searchKeyword = newSearchWord;

    preloadImageColors();
    searchForImgsByColor();
    ensureStorageCacheLoaded().then(createMosaicForImg);
    $('#orig-img').attr("src",imgChoice);
  }
}

function FlickrSearchEngine() {
  this.original_image;
  this.image_tag;

  // Manually placing flickrKey into localStorage so anon Github users can't abuse key
  this.base_url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + localStorage.getItem('flickrKey') + "&safe_search=1&content_type=4&format=json&nojsoncallback=1&per_page=20&tags="

  this.retrievePhoto = function(farm_id, server_id, photo_id, secret) {
    // Flickr short url's require base58 encryption
    return "https://farm" + farm_id + ".staticflickr.com/" + server_id + "/" + photo_id + "_" + secret + "_m.jpg";
  }

  this.cacheImagesByTag = function(image_results, original_image, image_tag) {
    const all_photos = image_results.photos['photo'];

    var mosaicMakerStorage = JSON.parse(localStorage.getItem('mosaicMaker'));
    if (!mosaicMakerStorage[original_image]) {
      mosaicMakerStorage[original_image] = {};
    }
    if(!mosaicMakerStorage[original_image][image_tag]) {
      mosaicMakerStorage[original_image][image_tag] = [];
      for (i = 0; i < all_photos.length; i++) {
        const photo = all_photos[i];
        const photoInfo = {
          'photo_id': photo.id,
          'server_id': photo.server,
          'farm_id': photo.farm,
          'secret': photo.secret
        }
        mosaicMakerStorage[original_image][image_tag].push(photoInfo);
      }
    localStorage.setItem('mosaicMaker', JSON.stringify(mosaicMakerStorage));
    }
  }

  this.searchAndCacheForImgs = function(original_image, image_query) {
    var self = this;
    const image_tag = image_query.split(" ").join("%20");
    $.getJSON(this.base_url + image_tag, function(image_results) {
      self.cacheImagesByTag(image_results, original_image, image_tag);
    });
  }
}