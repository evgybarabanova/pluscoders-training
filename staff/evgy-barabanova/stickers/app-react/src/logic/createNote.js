import axios from 'axios'

export default function createNote(token, text) {
  // TODO validate inputs
  if (typeof token !== 'string') throw new Error('token is not a string')

  else if (!token.trim().length) throw new Error('token is empty or blank')

  else if (typeof text !== 'string')
    throw new Error('text is not a string')

  else if (text.trim().length === 0)
    throw new Error('text is empty or blank')


  // TODO call api via ajax

  return axios
    .post(`${process.env.REACT_APP_API_URL}/notes`, {
      token,
      text,
    })
    .then(response => {
      const { token } = response.data

      return token
    })
    .catch(error => {
      const message = error.response.data.error

      throw new Error(message)
    })
}
