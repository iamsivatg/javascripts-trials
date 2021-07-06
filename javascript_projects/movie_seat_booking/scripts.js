const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
let ticketPrice = +movieSelect.value


populateUI()

//save selected movie index

function setMovieData(movieindex, movieprice) {
    localStorage.setItem("selectedMovieIndex", movieindex);
    localStorage.setItem("selectedMovieprice", movieprice)
}


//updated total and count

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected")
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}


// get dat from local storage

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if (selectedSeats !== null && selectedSeats.length > 0 ) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }
    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'))

    if (selectedMovieIndex !== null && selectedMovieIndex.length > 0) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
}


// MOvie select event 
movieSelect.addEventListener("change", e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex,e.target.value)
    updateSelectedCount()
})


// Seats click event 
container.addEventListener('click', e => {
    if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle("selected")
        updateSelectedCount();
    }
})


//initial count and total 

updateSelectedCount()