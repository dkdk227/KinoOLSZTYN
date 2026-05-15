// переменные
let inputSrc = document.getElementById("searchInput")
let buttonSrc = document.getElementById("searchBtn")
let cinemaInf = document.getElementById("inf")
let name = document.getElementById("name")
let yearElement = document.getElementById("year")
let rating = document.getElementById("rating")
let poster = document.getElementById("poster")
let trim = document.getElementById("trim")
let genre = document.getElementById("genre")
let plot = document.getElementById("plot")
let actors = document.getElementById("actors")
let searchResults = document.getElementById("searchResults")
let crews = document.getElementById("crew")
let currentPage = 1
let currentGenreId = null
let genresList = {}
let nameYearOrGenre = document.getElementById("nameYearOrGenre")
let typeEl = document.getElementById("type")
let durationEl = document.getElementById("duration")
let blokLink = document.getElementById("treiler")
let countryEl = document.getElementById("country")
let btnFavorite = document.getElementById("btnFavorite")
let btnWatchLater = document.getElementById("btnWatchLater")
let currentMovieData = null
let tabFavorite = document.getElementById("tabFavorite")
let tabWatchLater = document.getElementById("tabWatchLater")
let originalName = document.getElementById("originalName")

// Кнопки вверх вниз
document.getElementById("scrollUp").addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: "smooth" })
})

document.getElementById("scrollDown").addEventListener('click', function(){
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
})

// проверяем клик был НЕ на бургере и НЕ внутри дропдауна
document.addEventListener('click', function(event) {
    if (!burgerGenres.contains(event.target) && !genreDropdown.contains(event.target)) {
        if (genreDropdown.style.display === "flex") {
            genreDropdown.style.opacity = "0"
            genreDropdown.style.transform = "translateY(-10px)"
            setTimeout(() => {
                genreDropdown.style.display = "none"
            }, 300)
        }
    }
    if (!burgerYears.contains(event.target) && !yearDropdown.contains(event.target)) {
        if (yearDropdown.style.display === "flex") {
            yearDropdown.style.opacity = "0"
            yearDropdown.style.transform = "translateY(-10px)"
            setTimeout(() => {
                yearDropdown.style.display = "none"
            }, 300)
        }
    }
    if (!burgerFilters.contains(event.target) && !filterDropdown.contains(event.target)) {
        if (filterDropdown.style.display === "block") {
            filterDropdown.style.opacity = "0"
            filterDropdown.style.transform = "translateY(-10px)"
            setTimeout(() => {
                filterDropdown.style.display = "none"
            }, 300)
        }
    }
})

// Gatunki
fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=8210631f276e7f9626a0176b1e2c786b&language=pl`)
    .then(response => response.json())
    .then(data => {
        data.genres.forEach(g => {
            genresList[g.id] = g.name
        })

        Object.entries(genresList).forEach(([id, genreName])=> {
            let genreBtn = document.createElement("button")
            genreBtn.textContent = genreName

            genreBtn.addEventListener('click', function(){
                searchResults.innerHTML = ""
                currentPage = 1
                currentGenreId = id
                loadGenreMovies()
                nameYearOrGenre.textContent = genreName
            })

            genreDropdown.appendChild(genreBtn)
        })
    })

// Wyszukiwanie
buttonSrc.addEventListener('click', function(){
    cinemaInfo()
    nameYearOrGenre.textContent = ""
    if (yearDropdown.style.display === "flex"){
        yearDropdown.style.opacity = "0"
        yearDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            yearDropdown.style.display = "none"
        }, 10)
    }
    if (genreDropdown.style.display === "flex") {
        genreDropdown.style.opacity = "0"
        genreDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            genreDropdown.style.display = "none"
        }, 10)
    }
})

inputSrc.addEventListener('keydown', function(event){
    if (event.key === "Enter") {
        cinemaInfo()
        nameYearOrGenre.textContent = ""
        if (yearDropdown.style.display === "flex"){
            yearDropdown.style.opacity = "0"
            yearDropdown.style.transform = "translateY(-10px)"
            setTimeout(() => {
                yearDropdown.style.display = "none"
            }, 10)
        }
        if (genreDropdown.style.display === "flex") {
            genreDropdown.style.opacity = "0"
            genreDropdown.style.transform = "translateY(-10px)"
            setTimeout(() => {
                genreDropdown.style.display = "none"
            }, 10)
        }
    }
})

// Burger gatunków
let burgerGenres = document.getElementById("burgerGenres")
let genreDropdown = document.getElementById("genreDropdown")

burgerGenres.addEventListener('click', function(){
    if (genreDropdown.style.display === "none") {
        genreDropdown.style.display = "flex"
        genreDropdown.style.opacity = "0"
        genreDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            genreDropdown.style.opacity = "1"
            genreDropdown.style.transform = "translateY(0)"
        }, 10)
    } else {
        genreDropdown.style.opacity = "0"
        genreDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            genreDropdown.style.display = "none"
        }, 300)
    }
    if (yearDropdown.style.display === "flex"){
        yearDropdown.style.opacity = "0"
        yearDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            yearDropdown.style.display = "none"
        }, 10)
    }
})

// Burger lat
let burgerYears = document.getElementById("burgerYears")
let yearDropdown = document.getElementById("yearDropdown")

burgerYears.addEventListener('click', function(){
    if (yearDropdown.style.display === "none") {
        yearDropdown.style.display = "flex"
        yearDropdown.style.opacity = "0"
        yearDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            yearDropdown.style.opacity = "1"
            yearDropdown.style.transform = "translateY(0)"
        }, 10)
    } else {
        yearDropdown.style.opacity = "0"
        yearDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            yearDropdown.style.display = "none"
        }, 300)
    }

    if (genreDropdown.style.display === "flex") {
        genreDropdown.style.opacity = "0"
        genreDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            genreDropdown.style.display = "none"
        }, 10)
    }
})
createYears()

// Burger filtrów
let burgerFilters = document.getElementById("burgerFilters")
let filterDropdown = document.getElementById("filterDropdown")

burgerFilters.addEventListener('click', function(){
    if (filterDropdown.style.display === "none") {
        filterDropdown.style.display = "block"
        filterDropdown.style.opacity = "0"
        filterDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            filterDropdown.style.opacity = "1"
            filterDropdown.style.transform = "translateY(0)"
        }, 10)
    } else {
        filterDropdown.style.opacity = "0"
        filterDropdown.style.transform = "translateY(-10px)"
        setTimeout(() => {
            filterDropdown.style.display = "none"
        }, 300)
    }
})

// Przyciski filtrów
let filterAll = document.getElementById("filterAll")
let filterMovies = document.getElementById("filterMovies")
let filterTV = document.getElementById("filterTV")

// Pokaż wszystko
filterAll.addEventListener('click', function(){
    document.querySelectorAll("#searchResults .movieCard").forEach(card => {
        card.style.display = "block"
    })
    document.querySelectorAll("#searchResults #loadMoreBtn").forEach(btn => {
        btn.style.display = "block"
    })
})

// Tylko filmy
filterMovies.addEventListener('click', function(){
    let visible = document.querySelectorAll("#searchResults .movieCard[data-type='movie']")
    if (visible.length === 0) {
        trim.innerHTML = `<em><p style="color: rgba(128, 128, 128, 0.978);">Nic nie znaleziono</p></em>`
        return
    }
    trim.innerHTML = ""
    document.querySelectorAll("#searchResults .movieCard").forEach(card => {
        if (card.dataset.type === "movie" || card.dataset.type === "loadmore") {
            card.style.display = "block"
        } else {
            card.style.display = "none"
        }
    })
})

// Tylko seriale
filterTV.addEventListener('click', function(){
    let visible = document.querySelectorAll("#searchResults .movieCard[data-type='tv']")
    if (visible.length === 0) {
        trim.innerHTML = `<em><p style="color: rgba(128, 128, 128, 0.978);">Nic nie znaleziono</p></em>`
        return
    }
    trim.innerHTML = ""
    document.querySelectorAll("#searchResults .movieCard").forEach(card => {
        if (card.dataset.type === "tv" || card.dataset.type === "loadmore") {
            card.style.display = "block"
        } else {
            card.style.display = "none"
        }
    })
})

// Zakładka ulubione
tabFavorite.addEventListener('click', function(){
    nameYearOrGenre.textContent = "Ulubione"
    let favorites = JSON.parse(localStorage.getItem("favorites")) ?? []
    searchResults.innerHTML = ""
    if (favorites.length === 0) {
        searchResults.innerHTML = `<em><p style="color: rgba(128, 128, 128, 0.978);">Nic nie znaleziono</p></em>`
        return
    }
    favorites.forEach(movie => {
        let card = document.createElement("div")
        card.classList.add("movieCard")
        card.dataset.type = movie.type
        let img = document.createElement("img")
        img.src = `https://image.tmdb.org/t/p/w200${movie.poster}`

        let title = document.createElement("p")
        title.textContent = `${movie.title} (${movie.date})`

        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = "❌"
        deleteBtn.classList.add("deleteBtn")

        card.appendChild(img)
        card.appendChild(title)
        card.appendChild(deleteBtn)

        deleteBtn.addEventListener('click', function(){
            event.stopPropagation()
            favorites = favorites.filter(m => m.id !== movie.id)
            localStorage.setItem("favorites", JSON.stringify(favorites))
            tabFavorite.click()
        })
        card.addEventListener('click', function(){
            fetch(`https://api.themoviedb.org/3/${movie.type}/${movie.id}?api_key=8210631f276e7f9626a0176b1e2c786b&language=pl`)
                .then(response => response.json())
                .then(data => {
                    showDetails(data, movie.type)
                    loadCredits(movie.id, movie.type)
                })
        })
        searchResults.appendChild(card)
    })
})

// Zakładka obejrzyj później
tabWatchLater.addEventListener('click', function(){
    nameYearOrGenre.textContent = "Obejrzyj później"
    let watchLater = JSON.parse(localStorage.getItem("watchLater")) ?? []
    searchResults.innerHTML = ""
    if (watchLater.length === 0) {
        searchResults.innerHTML = `<em><p style="color: rgba(128, 128, 128, 0.978);">Nic nie znaleziono</p></em>`
        return
    }
    watchLater.forEach(movie => {
        let card = document.createElement("div")
        card.classList.add("movieCard")
        card.dataset.type = movie.type

        let img = document.createElement("img")
        img.src = `https://image.tmdb.org/t/p/w200${movie.poster}`

        let title = document.createElement("p")
        title.textContent = `${movie.title} (${movie.date})`

        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = "❌"
        deleteBtn.classList.add("deleteBtn")

        card.appendChild(img)
        card.appendChild(title)
        card.appendChild(deleteBtn)

        deleteBtn.addEventListener('click', function(){
            event.stopPropagation()
            watchLater = watchLater.filter(m => m.id !== movie.id)
            localStorage.setItem("watchLater", JSON.stringify(watchLater))
            tabWatchLater.click()
        })
        card.addEventListener('click', function(){
            fetch(`https://api.themoviedb.org/3/${movie.type}/${movie.id}?api_key=8210631f276e7f9626a0176b1e2c786b&language=pl`)
                .then(response => response.json())
                .then(data => {
                    showDetails(data, movie.type)
                    loadCredits(movie.id, movie.type)
                })
        })
        searchResults.appendChild(card)
    })
})

// Przycisk ulubione
btnFavorite.addEventListener('click', function(){
    let favorites = JSON.parse(localStorage.getItem("favorites")) ?? []
    favorites.push(currentMovieData)
    localStorage.setItem("favorites", JSON.stringify(favorites))
    btnFavorite.textContent = "❤️ Dodano!"
})

// Przycisk obejrzyj później
btnWatchLater.addEventListener('click', function(){
    let watchLater = JSON.parse(localStorage.getItem("watchLater")) ?? []
    watchLater.push(currentMovieData)
    localStorage.setItem("watchLater", JSON.stringify(watchLater))
    btnWatchLater.textContent = "🕐 Dodano!"
})

// Funkcje -----------------------------------------------------------------------

// Szczegóły filmu
function showDetails(movie, type) {
    cinemaInf.scrollIntoView({ behavior: "smooth" })

    let title = type === "tv" ? movie.name : movie.title
    let date = type === "tv" ? movie.first_air_date : movie.release_date
    let originalTitle = type === "tv" ? movie.original_name : movie.original_title
    let safeDate = date ?? "nieznany"
    let displayDate = safeDate !== "nieznany" ? safeDate.slice(0, 4) : "nieznany"

    let movieData = {
        id: movie.id,
        title: title,
        date: displayDate,
        type: type,
        poster: movie.poster_path
    }
    currentMovieData = movieData

    btnFavorite.textContent = "❤️ Ulubione"
    btnWatchLater.textContent = "🕐 Obejrzyj później"
    btnFavorite.style.display = "block"
    btnWatchLater.style.display = "block"
    name.textContent = title
    originalName.textContent = originalTitle
    yearElement.innerHTML = `<strong>Rok premiery:</strong> ${displayDate}`
    let average = movie.vote_average.toFixed(1)
    rating.innerHTML = `<strong>Ocena:</strong> ${average}/10`
    plot.textContent = movie.overview
    poster.innerHTML = movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w300${movie.poster_path}">` : `<img src="nofoto.webp">`
    let genreNames = movie.genre_ids
        ? movie.genre_ids.map(id => genresList[id]).filter(g => g).join(", ")
        : movie.genres.map(g => g.name).join(", ")
    genre.innerHTML = `<strong>Gatunek: </strong> ${genreNames}`

    // Helper - linki do kin
    function createCinemaLinks(title) {
        let scheduleDiv = document.createElement("div")
        scheduleDiv.style.cssText = "margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap;"

        let btnStyle = "padding: 6px 14px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 20px; text-decoration: none; font-size: 14px; transition: all 0.2s ease; display: inline-block;"

        let heliosLink = document.createElement("a")
        heliosLink.textContent = "🎬 Helios"
        heliosLink.href = "https://helios.pl/repertuar"
        heliosLink.target = "_blank"
        heliosLink.style.cssText = btnStyle
        heliosLink.onmouseover = () => heliosLink.style.background = "rgba(255,255,255,0.25)"
        heliosLink.onmouseout = () => heliosLink.style.background = "rgba(255,255,255,0.1)"

        let multikinoLink = document.createElement("a")
        multikinoLink.textContent = "🎥 Multikino"
        multikinoLink.href = "https://multikino.pl/repertuar"
        multikinoLink.target = "_blank"
        multikinoLink.style.cssText = btnStyle
        multikinoLink.onmouseover = () => multikinoLink.style.background = "rgba(255,255,255,0.25)"
        multikinoLink.onmouseout = () => multikinoLink.style.background = "rgba(255,255,255,0.1)"

        let googleLink = document.createElement("a")
        googleLink.textContent = "🔍 Szukaj seansów"
        googleLink.href = `https://www.google.com/search?q=${encodeURIComponent(title + " repertuar kino Olsztyn")}`
        googleLink.target = "_blank"
        googleLink.style.cssText = btnStyle
        googleLink.onmouseover = () => googleLink.style.background = "rgba(255,255,255,0.25)"
        googleLink.onmouseout = () => googleLink.style.background = "rgba(255,255,255,0.1)"

        scheduleDiv.appendChild(heliosLink)
        scheduleDiv.appendChild(multikinoLink)
        scheduleDiv.appendChild(googleLink)
        return scheduleDiv
    }

    if (type === "tv") {
        fetch(`https://api.themoviedb.org/3/tv/${movie.id}?api_key=8210631f276e7f9626a0176b1e2c786b&language=pl`)
            .then(response => response.json())
            .then(data => {
                typeEl.innerHTML = `<i style="color: rgb(193, 193, 193);">Serial</i>`
                durationEl.textContent = `${data.number_of_seasons} ${declension(data.number_of_seasons, "sezon", "sezony", "sezonów")} / ${data.number_of_episodes} odcinków`

                let countries = data.production_countries.map(c => c.name).join(", ")
                countryEl.innerHTML = `<strong>Kraj: </strong> ${countries}`
            })

        fetch(`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=8210631f276e7f9626a0176b1e2c786b&language=pl`)
            .then(response => response.json())
            .then(data => {
                blokLink.innerHTML = ""
                data.results.forEach(video => {
                    let link = document.createElement("a")
                    link.textContent = "Zwiastun "
                    link.href = `https://www.youtube.com/watch?v=${video.key}`
                    link.target = "_blank"
                    blokLink.appendChild(link)
                })
                blokLink.appendChild(createCinemaLinks(title))
            })
    } else {
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=8210631f276e7f9626a0176b1e2c786b&language=pl`)
            .then(response => response.json())
            .then(data => {
                let hours = Math.floor(data.runtime / 60)
                let minutes = data.runtime % 60

                typeEl.innerHTML = `<i style="color: rgb(193, 193, 193);">Film</i>`
                durationEl.textContent = `${hours} ${declension(hours, "godzina", "godziny", "godzin")} ${minutes} ${declension(minutes, "minuta", "minuty", "minut")}`

                let countries = data.production_countries.map(c => c.name).join(", ")
                countryEl.innerHTML = `<strong>Kraj: </strong> ${countries}`
            })

        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=8210631f276e7f9626a0176b1e2c786b&language=pl`)
            .then(response => response.json())
            .then(data => {
                blokLink.innerHTML = ""
                data.results.forEach(video => {
                    let link = document.createElement("a")
                    link.textContent = "Zwiastun "
                    link.href = `https://www.youtube.com/watch?v=${video.key}`
                    link.target = "_blank"
                    blokLink.appendChild(link)
                })
                blokLink.appendChild(createCinemaLinks(title))
            })
    }
}

// Tworzenie karty filmu
function createCard(movie, type) {
    let title = type === "tv" ? movie.name : movie.title
    let date = type === "tv" ? movie.first_air_date : movie.release_date
    let safeDate = date ? date.slice(0, 4) : "?"

    let card = document.createElement("div")
    card.classList.add("movieCard")
    card.dataset.type = type

    let img = document.createElement("img")
    img.src = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "nofoto.webp"

    let titleEl = document.createElement("p")
    titleEl.textContent = `${title} (${safeDate})`

    card.appendChild(img)
    card.appendChild(titleEl)

    card.addEventListener('click', function(){
        showDetails(movie, type)
        loadCredits(movie.id, type)
    })

    return card
}

// Odmiana słów po polsku
function declension(number, one, two, five) {
    let n = Math.abs(number) % 100
    let n1 = n % 10

    if (n > 10 && n < 20) return five
    if (n1 === 1) return one
    if (n1 >= 2 && n1 <= 4) return two
    return five
}

// Ładowanie obsady
function loadCredits(id, type) {
    let endpoint = type === "tv"
        ? `https://api.themoviedb.org/3/tv/${id}/credits?api_key=8210631f276e7f9626a0176b1e2c786b&language=pl`
        : `https://api.themoviedb.org/3/movie/${id}/credits?api_key=8210631f276e7f9626a0176b1e2c786b&language=pl`

    fetch(endpoint)
        .then(response => response.json())
        .then(credits => {
            let actorsNames = credits.cast.map(actor => actor.name).slice(0, 5).join(", ")
            actors.innerHTML = `<strong>Obsada:</strong> ${actorsNames}`
        })
}

// Wyszukiwanie po nazwie
function cinemaInfo() {
    let inputText = inputSrc.value

    nameYearOrGenre.textContent = ""
    if (inputSrc.value.trim() === "") {
        trim.textContent = "Wpisz tekst"
        setTimeout(() => trim.textContent = "", 2000)
    } else {
        trim.textContent = ""
        searchResults.innerHTML = ""

        fetch(`https://api.themoviedb.org/3/search/movie?query=${inputText}&api_key=8210631f276e7f9626a0176b1e2c786b&language=pl`)
            .then(response => response.json())
            .then(data => {
                data.results.forEach(movie => {
                    let card = createCard(movie, "movie")
                    searchResults.appendChild(card)
                })
            })

        fetch(`https://api.themoviedb.org/3/search/tv?query=${inputText}&api_key=8210631f276e7f9626a0176b1e2c786b&language=pl&page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                data.results.forEach(movie => {
                    let card = createCard(movie, "tv")
                    searchResults.appendChild(card)
                })
            })
    }
    inputSrc.value = ""
}

// Tworzenie listy lat
function createYears() {
    for (let year = 1990; year <= 2026; year++) {
        let yearBtn = document.createElement("button")
        yearBtn.textContent = year
        yearDropdown.appendChild(yearBtn)
        yearBtn.addEventListener('click', function(){
            searchResults.innerHTML = ""
            currentPage = 1
            loadMoviesByYear(year)
            nameYearOrGenre.textContent = year
        })
    }
}

// Filmy według roku
function loadMoviesByYear(year) {
    fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}&api_key=8210631f276e7f9626a0176b1e2c786b&language=pl&page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(movie => {
                let card = createCard(movie, "movie")
                searchResults.appendChild(card)
            })
        })

    fetch(`https://api.themoviedb.org/3/discover/tv?first_air_date_year=${year}&api_key=8210631f276e7f9626a0176b1e2c786b&language=pl&page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(movie => {
                let card = createCard(movie, "tv")
                searchResults.appendChild(card)
            })
            setTimeout(() => {
                let loadMoreBtn = document.createElement("button")
                loadMoreBtn.id = "loadMoreBtn"
                loadMoreBtn.dataset.type = "loadmore"
                loadMoreBtn.textContent = "Załaduj więcej"
                loadMoreBtn.addEventListener('click', function(){
                    currentPage++
                    loadMoviesByYear(year)
                })
                let oldBtn = document.getElementById("loadMoreBtn")
                if (oldBtn) oldBtn.remove()
                searchResults.appendChild(loadMoreBtn)
            }, 100)
        })
}

// Filmy według gatunku
function loadGenreMovies() {
    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${currentGenreId}&api_key=8210631f276e7f9626a0176b1e2c786b&language=pl&page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(movie => {
                let card = createCard(movie, "movie")
                searchResults.appendChild(card)
            })
        })

    fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${currentGenreId}&api_key=8210631f276e7f9626a0176b1e2c786b&language=pl&page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(movie => {
                let card = createCard(movie, "tv")
                searchResults.appendChild(card)
            })
            setTimeout(() => {
                let loadMoreBtn = document.createElement("button")
                loadMoreBtn.id = "loadMoreBtn"
                loadMoreBtn.dataset.type = "loadmore"
                loadMoreBtn.textContent = "Załaduj więcej"
                loadMoreBtn.addEventListener('click', function(){
                    currentPage++
                    loadGenreMovies()
                })
                let oldBtn = document.getElementById("loadMoreBtn")
                if (oldBtn) oldBtn.remove()
                searchResults.appendChild(loadMoreBtn)
            }, 100)
        })
}

// Karuzela "Teraz w kinach"
let carouselMovies = []
let carouselIndex = 0
const VISIBLE = 5

fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=8210631f276e7f9626a0176b1e2c786b&language=pl&region=PL`)
    .then(r => r.json())
    .then(data => {
        carouselMovies = data.results
        renderCarousel()
    })

function renderCarousel() {
    let track = document.getElementById("carouselTrack")
    track.innerHTML = ""

    for (let i = 0; i < VISIBLE; i++) {
        let idx = (carouselIndex + i) % carouselMovies.length
        let movie = carouselMovies[idx]

        let card = document.createElement("div")
        card.classList.add("carouselCard")

        let year = movie.release_date ? movie.release_date.slice(0, 4) : "?"

        card.innerHTML = `
            <img src="${movie.poster_path
                ? 'https://image.tmdb.org/t/p/w200' + movie.poster_path
                : 'nofoto.webp'}">
            <p>${movie.title} (${year})</p>
        `
        card.addEventListener('click', function() {
            showDetails(movie, "movie")
            loadCredits(movie.id, "movie")
        })
        track.appendChild(card)
    }
}

document.getElementById("carouselNext").addEventListener('click', function() {
    carouselIndex = (carouselIndex + 1) % carouselMovies.length
    renderCarousel()
})

document.getElementById("carouselPrev").addEventListener('click', function() {
    carouselIndex = (carouselIndex - 1 + carouselMovies.length) % carouselMovies.length
    renderCarousel()
})