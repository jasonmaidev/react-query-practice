import { useQuery } from "react-query"
import axios from "axios"

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`)
}
// returns { "id": "vishwas@example.com","channelId": "codevolution"}

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const DependantQueriesPage = ({ email }) => {
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
    // user = { "id": "vishwas@example.com","channelId": "codevolution"}
  )

  // when you have the dependant id variable from user
  const channelId = user?.data.channelId // codevolution

  const { data: courses } = useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId // only if channelId is present
    }
  )

  return (
    <div>
      {courses?.data?.courses?.map((course, index) => (
        <div key={index}>
          <ul>
            <li>{course}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}
