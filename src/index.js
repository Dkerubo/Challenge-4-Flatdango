//Display the First Movie's Details
document.addEventListener("DOMContentLoaded", () => {
    fetchMovieDetails(1);
  });
  
  function fetchMovieDetails(id) {
    fetch(`http://localhost:3000/films/${id}`)
      .then(response => response.json())
      .then(data => displayMovieDetails(data))
      .catch(error => console.error("Error fetching movie:", error));
  }
  function displayMovieDetails(movie) {
    const poster = document.getElementById('poster');
    const title = document.getElementById('title');
    const runtime = document.getElementById('runtime');
    const showtime = document.getElementById('showtime');
    const availableTickets = document.getElementById('available-tickets');
  
    poster.src = movie.poster;
    title.textContent = movie.title;
    runtime.textContent = `Runtime: ${movie.runtime} minutes`;
    showtime.textContent = `Showtime: ${movie.showtime}`;
    availableTickets.textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`;
  }
  function fetchAllMovies() {
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(movies => displayMoviesMenu(movies))
      .catch(error => console.error("Error fetching movies:", error));
  }
  
  function displayMoviesMenu(movies) {
    const filmsMenu = document.getElementById('films');
    filmsMenu.innerHTML = '';  // Clear any placeholder content
  
    movies.forEach(movie => {
      const li = document.createElement('li');
      li.classList.add('film', 'item');
      li.textContent = movie.title;
  
      li.addEventListener('click', () => {
        fetchMovieDetails(movie.id);
      });
  
      filmsMenu.appendChild(li);
    });
  }
  //fetch movies
  document.addEventListener("DOMContentLoaded", () => {
    fetchMovieDetails(1);  // Fetch the first movie
    fetchAllMovies();      // Fetch all movies for the menu
  });
//buy ticket
  document.getElementById('buy-ticket').addEventListener('click', () => {
    let availableTicketsElement = document.getElementById('available-tickets');
    let availableTickets = parseInt(availableTicketsElement.textContent.split(': ')[1]);
  
    if (availableTickets > 0) {
      availableTickets--;
      availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
    } else {
      alert('Sorry, no more tickets available!');
    }
  });
  if (availableTickets === 0) {
    document.getElementById('buy-ticket').textContent = 'Sold Out';
    li.classList.add('sold-out');
  }
  function updateTicketsSold(movieId, newTicketsSold) {
    fetch(`http://localhost:3000/films/${movieId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tickets_sold: newTicketsSold }),
    })
      .then(response => response.json())
      .then(updatedMovie => console.log('Updated tickets sold:', updatedMovie))
      .catch(error => console.error('Error updating tickets sold:', error));
  }
    