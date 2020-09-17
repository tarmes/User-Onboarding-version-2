import React, { useEffect, useState } from 'react';
import './App.css';
import UserForm from './components/UserForm'
import User from './components/User'
import axios from 'axios';
import schema from './validation/formSchema'
import * as yup from 'yup'

const initialUserList = [];

const initialFormValues = {
  // username: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  tos: false,
}

const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
}

const initialDisabled = true

function App() {  

  const [users, setUsers] = useState(initialUserList)

  const [formValues, setFormValues] = useState(initialFormValues)

  const [formErrors, setFormErrors] = useState(initialFormErrors)

  const [disabled, setDisabled] = useState(initialDisabled)



  // const getUsers = () => {
  //   // 🔥 STEP 5- IMPLEMENT! ON SUCCESS PUT FRIENDS IN STATE
  //   //    helper to [GET] all friends from `http://localhost:4000/friends`
  //   axios.get('https://reqres.in/api/users')
  //     .then(res => {
  //       setUsers(res.data)
  //       console.log(res.data)
  //     })
  //     .catch(err => {
  //       debugger 
  //       console.log(err)
  //     })
  // }
  
  const validate = (name, value) => {
    // let's validate this specific key/value
    // yup.reach will allow us to "reach" into the schema and test only one part.
    // We give reach the schema as the first argument, and the key we want to test as the second.
    yup
      .reach(schema, name)
      // we can then run validate using the value
      .validate(value)
      // if the validation is successful, we can clear the error message
      .then(valid => { // eslint-disable-line
        setFormErrors({
          ...formErrors,
          [name]: ""
        })
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
  }


  const postNewUser = newUser => {
      axios.post('https://reqres.in/api/users', newUser)
        .then(res => {
          setUsers([ ...users, newUser])
          setFormValues(initialFormValues)
        })
        .catch(err => {
          debugger
        })
  }

  const updateForm = (name, value) => {
    validate(name, value)
    setFormValues({ ...formValues, [name] : value})
}

  const submitForm = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: formValues.tos,
    }
    postNewUser(newUser)
  }


  // useEffect(() => {
  //   getUsers()
  // }, [])

  useEffect(() => {
    schema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])

  return (
    <div className="App">
      <h1>Users</h1>
      <UserForm 
        values={formValues}
        update={updateForm}
        submit={submitForm}
        errors={formErrors}
        disabled={disabled}
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
