import React from 'react'

export default function UserForm(props) {

    const { values, update, submit } = props

    const onChange = evt => {
        const { name, value } = evt.target
        update(name, value)
    }

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
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
                <div className='submit'>
                    <button>Submit</button>
                </div>
            </div>

        </form>
    )
}