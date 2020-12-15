'use strict';

const apiKey = "kyctTpPef5HDCWcPI0sYLcBXg8MZISha4fnlzngQ";


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

const searchURL = (stateCode, maxResults) => {
  const params = {
    limit: maxResults
  };
  const queryString = formatQueryParams(params)
  return `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&limit=${maxResults}&api_key=kyctTpPef5HDCWcPI0sYLcBXg8MZISha4fnlzngQ`;
}

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  $('#results-list').empty();
  responseJson.data.forEach((park) => {
    $('#results-list').append(
      `<li><h3>${park.fullName}</h3>
      <p><a href=${park.url}>${park.url}</a></p>
      <p>${park.description}</p>
      </li>`
    )}); 
  $('#results').removeClass('hidden');
};

function getParks(query, maxResults=10) {
  const url = searchURL(query, maxResults)
    
  console.log(url);
  
  const options = {
    headers: new Headers({
      "x-rapidapi-key": apiKey})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      
      }
      console.log("Error");
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);
