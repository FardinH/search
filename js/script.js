const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

searchForm.addEventListener('submit', apiSearch);

function apiSearch(event)
{
    event.preventDefault();
    
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=8bd56097452ad23d25e3bd85f61effc5&language=ru&query=' + searchText;
    requestApi('GET', server);
}


function requestApi(method, url)
{

    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();

    request.addEventListener("readystatechange", function() 
    {
        if (request.readyState !== 4) return;
        if (request.status !== 200)
        {
            console.log("error: " + request.status);
            return;
        }

        const output = JSON.parse(request.responseText);
        let inner = '';

        output.results.forEach(function(item)
        {  
            console.log(item)
            
            let nameItem = item.original_name || item.original_title;
            let dateItem = item.release_date || item.first_air_date;
            let imageItem = item.poster_path;
            let overviewItem = item.overview;
            let rangeItem = item.vote_average;
            inner += inner + 
            `
                <div class="card mb-3" style="max-width: 100%;">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img style="max-width: 50%; padding: 20px; border-radius: 30px;" src="https://image.tmdb.org/t/p/w500${imageItem}" class="card-img" alt="...">
                            </div>
                                <div class="col-md-8">
                                <div class="card-body">
                                <h5 class="card-title">${nameItem}</h5>
                                <p class="card-text">${overviewItem}</p>
                                <p class="card-text"><small class="text-muted">Дата выхода: ${dateItem} Рейтинг: ${rangeItem}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;  
        });
        movie.innerHTML = inner;
    });
}

