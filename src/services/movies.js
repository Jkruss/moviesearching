export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`http://localhost:5000/api/peliculas/search?query=${search}`)
    const movies = await response.json()

    return movies?.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.year,
      image: movie.image
    }))
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
