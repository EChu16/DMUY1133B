/*
  Erich Chu
  Use NYTimes Article Search API and display results
*/

var API_KEY_CODE = "ed088f9c7d394b1b8c328753b27bbefb";
var API_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var search_terms = ['basketball', 'volleyball', 'handball', 'football', 'soccer'];
var idx = 0;
var mouseCounter = 0;
var resultsLoaded = false;
var allResults = [];

function storeResults(searchResults) {
  allResults.push(searchResults);
  resultsLoaded = true;
}

function generateURLQuery(query) {
  return API_URL + '?' + $.param({
    'api-key': API_KEY_CODE,
    'q': query,
    'page': 1
  });
}

function loadDataForTerm() {
  if(idx >= search_terms.length) {
    return
  }
  loadJSON(generateURLQuery(search_terms[idx]), storeResults)
  idx+=1;
}

function retrieveSearchTermData() {
  setInterval(loadDataForTerm, 2000);
}

function setup() {
  createCanvas(1650, 800);
  retrieveSearchTermData();
}

function showResultsForSection() {
  var searchTerm = search_terms[mouseCounter];
  var sectionResults = allResults[mouseCounter].response['docs'];
  var x = 25;
  var y = 25;
  text("Search Term: " + searchTerm, x, y);
  for (a = 0; a < sectionResults.length; a++) {
    y += 25;
    text(sectionResults[a].headline.main, x, y)
    y += 15;
    text(sectionResults[a].web_url, x, y);
  }
}

function mouseClicked() {
  mouseCounter++;
  if (mouseCounter >= search_terms.length) {
    mouseCounter = 0;
  }
}

function draw() {
  background(255);
  if(resultsLoaded) {
    showResultsForSection(mouseCounter);
  }
}