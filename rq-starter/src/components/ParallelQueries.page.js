import { useQuery } from "react-query"
import axios from "axios"

const fetchHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends')
}

export const ParallelQueries = () => {
  const { data: superHeroes } = useQuery(['superHeroes'], fetchHeroes)
  const { data: friends } = useQuery(['friends'], fetchFriends)

  return (
    <div>
      <h2>Parellel Queries</h2>
    </div>
  )
}