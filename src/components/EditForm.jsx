import { useState } from 'react'
import axios from 'axios'

export default function EditForm(props) {
    // state that holds the values that the user has typed
    const [form, setForm] = useState({
        // initialize all of the values 
        name: props.post.name,
        title: props.post.title,
        content: props.post.content
    })

    const handleSubmit = async e => {
        e.preventDefault()
        //we use form to update the backend, then rerender?
        try{
            // take the form data held in state, and put req to backend with it
            //axios.put(url, {request body}, {options})
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/blog/${props.post._id}`, form)
            // console.log(response.data) //updated object from form
            // if the update is successful get /bounties to update state in parent
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blog`)
            //update the page
            props.setPosts(response.data)
            // close the edit form
            props.handleShowFormClick()

        }catch(err){
            console.warn(err)
        }
    }

    const handleDeleteClick = async () => {
        try {
            //request the server delete the current bounty
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/blog/${props.post._id}`)
            //GET / bounties to get update list of bounties
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blog`)
            //update the page
            props.setPosts(response.data)
            // close the edit form
            props.handleShowFormClick()
            // set updated bounties in state
            
        }catch(err){
            console.warn(err)
        }
    }
    return(
        <>
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

            <button onClick= {handleDeleteClick}>Delete</button>
            <button onClick= {props.handleShowFormClick}>Cancel</button>
        </>
    )
}