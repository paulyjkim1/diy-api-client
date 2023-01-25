import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function NewPost() {
    // state that holds the values that the user has typed
    const [form, setForm] = useState({
        // initialize all of the values as empty strings
        name: '',
        title: '',
        content: ''
    })

    //invoke the useNavigate hook to get a navigate function to use
    const navigate = useNavigate()

    // submit handler function that posts the form data from state to the backend
    const handleSubmit = e => {
        e.preventDefault()
        // take the form data from the state, post it to the backend with axios
        // axios.post(url to make a request to, {request body}, {options})
        axios.post(`${process.env.REACT_APP_SERVER_URL}/blog`, form)
            .then(response => {
                console.log(response.data)
                //once the backend gets back to us, navigate to the / route to see all bounties
                navigate('/') //basically clicking a link for the user
            })
            .catch(console.warn)
    }
// name: String
// wantedFor: String
// client: String
// ship: String
// reward: Number
// captured: Bool
// lastSeen: String
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Title:</label>
                    <input 
                        type='text'
                        id='title'
                        placeholder='Title...'
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                    />

                    <label htmlFor='name'>By:</label>
                    <input 
                        type='text'
                        id='name'
                        placeholder='Name...'
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />

                    <label htmlFor='content'>Content:</label>
                    <input 
                        type='text'
                        id='content'
                        placeholder='Content...'
                        value={form.content}
                        onChange={e => setForm({ ...form, content: e.target.value })}
                    />
                </div>                


                <button type ='submit'>Submit</button>
            </form>
        </div>
    )
}