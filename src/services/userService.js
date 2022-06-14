import axios from 'axios';

const backEndUrl = "http://localhost:3300/";

const getUsers = () => {
  return(
    axios.get(backEndUrl + 'users')
    .then(res => {
      return(res.data)
    }).catch(err => {
      return(err.response)
    })
  )  
}

const getUserById = (userId) => {
  return(
    axios.get(backEndUrl + 'users/' + userId)
    .then(res => {
      return(res)
    }).catch(err => {
      return(err.response)
    })
  )
}

const addUser = (firstName, lastName, email) => {
  return(
    axios.post(backEndUrl + 'users', { firstName: firstName, lastName: lastName, email: email })
    .then(res => {
      return(res)
    }).catch(err => {
      return(err.response)
    })
  )
}

const updateUser = (userId, firstName, lastName, email) => {
  return(
    axios.put(backEndUrl + 'users/' + userId, { firstName: firstName, lastName: lastName, email: email })
    .then(res => {
      return(res)
    }).catch(err => {
      return(err.response)
    })
  )
}

const deleteUser = (userId) => {
  return(
    axios.delete(backEndUrl + 'users/' + userId)
    .then(res => {
      return(res)
    }).catch(err => {
      return(err.response)
    })
  )  
}


export const UserServices = {
  addUser, getUsers, getUserById, updateUser, deleteUser
}

