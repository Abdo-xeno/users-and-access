import React from 'react';

import axios from 'axios';

class UserService{

  backEndUrl = "http://localhost:3300/";

  getUsers() {
    axios.get(this.backEndUrl + 'users')
      .then(res => {
        console.log(res)
      })
  }
  getUserById(userId){
    axios.get(this.backEndUrl + 'users/' + userId)
    .then(res => {
      console.log(res)
    })
  }

  addUser(firstName,lastName,email){
    axios.post(this.backEndUrl + 'users', {firstName: firstName, lastName: lastName, email: email})
    .then(res => {
      console.log(res)
    })

  }

  updateUser(userId, firstName, lastName, email){
    axios.put(this.backEndUrl + 'users/' + userId, {firstName: firstName, lastName: lastName, email: email})
    .then(res => {
      console.log(res)
    })

  }

  deleteUser(userId){
    axios.delete(this.backEndUrl + 'users/' + userId)
    .then(res => {
      console.log(res)
    })

  }
  test(){
    console.log('test')
  }


}


export default UserService;
