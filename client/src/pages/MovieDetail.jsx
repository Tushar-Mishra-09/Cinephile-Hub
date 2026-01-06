import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Typography, Chip } from '@mui/material'
import { api } from '../services/api'
import { useAppBarExtras } from '../context/AppBarExtrasContext'

export default function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const { setExtras } = useAppBarExtras()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const res = await api.get(`/movies/${id}`)
      if (mounted) setMovie(res.data)
      if (res.data?.imdbId) {
        setExtras(
          <Chip
            label="IMDb"
            color="secondary"
            component="a"
            href={`https://www.imdb.com/title/${res.data.imdbId}/`}
            target="_blank"
            rel="noopener noreferrer"
            clickable
          />
        )
      }
    })()
    return () => { mounted = false; setExtras(null) }
  }, [id, setExtras])

  if (!movie) return <Typography>Loading...</Typography>

  return (
    <Stack spacing={2}>
      <Typography variant="h4">{movie.name}</Typography>
      {movie.posterUrl && (
        <img src={movie.posterUrl} alt={movie.name} style={{ maxWidth: 300, borderRadius: 8 }} />
      )}
      <Typography variant="body1">
        {movie.description && movie.description.trim().length > 0
          ? movie.description
          : 'No description available.'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Rating: {movie.rating ?? 'N/A'} | Duration: {movie.duration ?? 'N/A'} mins
      </Typography>
      {movie.releaseDate && (
        <Typography variant="caption" color="text.secondary">
          Released: {new Date(movie.releaseDate).toLocaleDateString()}
        </Typography>
      )}
    </Stack>
  )
}
