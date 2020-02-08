const baseUrl="https://api.github.com";

function formListener() {
$('form').submit(event=> {
    event.preventDefault();
    $('.js-results').empty();
    const searchQuery = $('#user-search').val().toLowerCase().trim();
    getSearchResults(searchQuery);
});
}

function getSearchResults(searchQuery) {
    console.log(searchQuery);
    fetch(`${baseUrl}/users/${searchQuery}/repos`)
            .then(response => {
            if (response.ok) {
                return response.json();
            } 
            throw new Error(response.statusText);
        }) 
        .then(responseJson =>displayResults(responseJson))
            .catch(error=> { 
                $('.js-results').html(`<p>Something went wrong ${error.message}.</p>`);
            });
    }
function displayResults(responseJson) {
    if(responseJson.length === 0){
        $('.js-results').text('It looks like this user does not have any repositories');
    } else {
        responseJson.forEach(repo => $('.js-results').append(`<p><a href="https://www.github.com/${repo.full_name}" target="_blank">${repo.name}</a></p>`));
        /* $('.js-results').text(responseJson); */
    }

}

$(formListener);
