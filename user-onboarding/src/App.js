import React, { useState, useEffect } from 'react';
import './App.css';
import UserForm from './components/UserForm'
import User from './components/User'
import axios from 'axios';

const initialUserList = [];

const initialFormValues = {
  // username: '',
  first_name: '',
  last_name: '',
  // email: '',
}

function App() {  

  const [users, setUsers] = useState(initialUserList)

  const [formValues, setFormValues] = useState(initialFormValues)

  const getUsers = () => {
    // 🔥 STEP 5- IMPLEMENT! ON SUCCESS PUT FRIENDS IN STATE
    //    helper to [GET] all friends from `http://localhost:4000/friends`
    axios.get('https://reqres.in/api/users')
      .then(res => {
        setUsers(res.data)
        console.log(res.data)
      })
      .catch(err => {
        debugger 
        console.log(err)
      })
  }
  
  const updateForm = (inputName, inputValue) => {
      setFormValues({ ...formValues, [inputName] : inputValue})
  }

  const submitForm = () => {
      const newUser = {
        first_name: formValues.first_name.trim(),
        last_name: formValues.last_name.trim(),
      }
      if (!newUser.first_name || !newUser.last_name) {
        return
      }

      axios.post('https://reqres.in/api/users', newUser)
        .then(res => {
          setUsers([ ...users, newUser])
          setFormValues(initialFormValues)
        })
        .catch(err => {
          debugger
        })
  }

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <div className="App">
      <h1>Users</h1>
      <UserForm 
        values={formValues}
        update={updateForm}
        submit={submitForm}
      />
      {
        users.map(user => {
          return (
            <User key={user.id} details={user}/>
          )
        })
      }
    </div>
  );
}

export default App;
