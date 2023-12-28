import { useAddSuperHeroData, useSuperHeroesData } from '../hooks/useSuperHeroesData'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const onSuccess = (data) => {
    console.log('Perform side effect after fetching', data)
  }

  const onError = (error) => {
    console.log('Perform side effect after throwing error', error)
  }

  const { isLoading, data, isError, refetch } = useSuperHeroesData(onSuccess, onError)

  /* useMutation fnction */
  const { mutate: addHero } = useAddSuperHeroData()

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo })
    const hero = { name, alterEgo }
    addHero(hero)
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>Something went wrong</h2>
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={e => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch</button>
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>
      })} */}
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            {/* sends heroId param to route in App.js, renders 'SuperHeroPage' */}
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        )
      })}
    </>
  )
}
