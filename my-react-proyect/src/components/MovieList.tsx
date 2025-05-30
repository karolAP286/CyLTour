import { useEffect } from "react";

function MovieList() {
  useEffect(()=> {
    console.log("movielist mounted")
  }, [])
  useEffect(()=> {
    return ()=> console.log("movie list unmounted")
  }, [])

    const movies = ["sdla", "sw", "d"];
    const htmlMovies = movies.map((movie, index)=> {
        return <p key={movie}>{index+1} - {movie}</p>
    })
  return (
    
    <section>
        <h2>Movie</h2>
        {htmlMovies}
    </section>
  )
}

export default MovieList