import React, { useState, useEffect, useCallback } from 'react';
import AddMovie from './components/AddMovie'
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  //With Using Async Await
  const fetchMoviesHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true)
    try {
      const response = await fetch('https://react-http-373d1-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json');

      if (!response.ok) {
        setError('Something Went Wrong!')
        throw new Error("Something went wrong...")
      }

      const data = await response.json();

      const loadedMovies=[];

      for(const key in data)
      {
        loadedMovies.push({
            id:key,
            title:data[key].title,
            openingText:data[key].openingText,
            releaseDate:data[key].releaseDate
        })
      }

      setMovies(loadedMovies)
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  }, [])

  // useEffect(() => { fetchMoviesHandler() }, [fetchMoviesHandler])

  const addMovieHandler = async (movie) => {
    const response =await fetch('https://react-http-373d1-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: { 'Content-Type': 'application/json' }
    })

    const data=response.json();
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>

      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No Movies Found!!</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading movies...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;





// NOTES

//Without Using Async Await

  // function fetchMoviesHandler() {
  //   fetch('https://swapi.dev/api/films')
  //     .then(res => res.json())
  //     .then(data =>
  //       setMovies(data.results),
  //       // console.log(movies)
  //     )
  //     .catch(err => console.log(err))
  // }