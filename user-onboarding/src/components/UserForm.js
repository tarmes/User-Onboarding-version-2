import React from 'react'

export default function UserForm(props) {

    const { values, update, submit, errors, disabled } = props

    const onChange = evt => {
        const { name, value, type, checked } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        update(name, valueToUse)
    }

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='errors'>
                <div>{errors.first_name}</div>
                <div>{errors.email}</div>
                <div>{errors.last_name}</div>
                <div>{errors.tos}</div>
                <div>{errors.password}</div>
             </div>
            <div className='form-group inputs'>
                <label>First Name
                    <input 
                        type='text'
                        name='first_name'
                        onChange={onChange}
                        value={values.first_name}
                        placeholder='enter your first name'
                        maxLength='30'
                    />
                </label>
                <label>
                    <input 
                        type='text'
                        name='last_name'
                        onChange={onChange}
                        value={values.last_name}
                        placeholder='enter your last name'
                        maxLength='30'
                     />
                </label>
                <label>
                    <input 
                        type='email'
                        name='email'
                        onChange={onChange}
                        value={values.email}
                        placeholder='enter a valid e-mail'
                    />
                </label>
                <label>
                    <input 
                        type='password'
                        name='password'
                        onChange={onChange}
                        value={values.password}
                        placeholder='enter password: min of 5 characters'
                        minLength='5'
                    />
                </label>
                <label>Terms of Service
                    <input 
                        type='checkbox'
                        name='tos'
                        checked={values.tos}
                        onChange={onChange}
                    />
                </label>
                <div className='submit'>
                    <button disabled={disabled}>Submit</button>
                </div>
            </div>

        </form>
    )
}