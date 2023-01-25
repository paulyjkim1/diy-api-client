import { useState, useEffect } from 'react'
import axios from 'axios'
import PostDetails from '../PostDetails'
import EditForm from '../EditForm'

export default function Home() {
    // store the detais an dlist of all bounties in one state variable
    const [posts, setPosts] = useState([]) // array of all bounties
    const [detailId, setDetailId] = useState('') // id of the last clicked bounty
    const [showForm, setShowForm] = useState(false)
    // show all bounties when the page first loads
    useEffect(()=> {
        const fetchPosts = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blog`)
                console.log(response.data)
                setPosts(response.data)
            }catch(err){
                console.warn(err)
            }
        }
        fetchPosts()
    },[]) //empty dependancy array will run this use effect only once

    // show or hide the form event handler
    const handleShowFormClick = () => setShowForm(!showForm)


    // map out our bounties, each will need an onClick that shows their details (set their id in state)
    const postComponents = posts.map((post) => {
        return(
            <div key={`post-${post._id}`}>
                <h3>{post.title}</h3>
                <p>by:{post.name}</p>
                <button onClick = {() => setDetailId(post._id)}>View</button>
            </div>
        )
    })
    // find the index of the bounty based on our id state, show its details, if the bounty not found, conditionally render
    const detailPost = posts.find(post => post._id === detailId)
    
    // optional chaining
    // const details = (
    //     <>
    //         <h3>{detailBounty?.name}</h3>
    //         <h4>{detailBounty?.reward}</h4>
    //         <p>{detailBounty?.wantedFor}</p>
    //         <p>{detailBounty?.client}</p>
    //         <p>{detailBounty?.ship}</p>
    //         <p>{detailBounty?.lastSeen}</p>
    //         <p>{detailBounty?.captured ? 'has been caught' : 'not caught'}</p>
        
    //     </>
    // )

    const detailPane = detailPost ? <PostDetails handleShowFormClick={handleShowFormClick} post={detailPost} /> : 'Click on a Post'

    const sidePane = showForm ? <EditForm setPosts = {setPosts} handleShowFormClick = {handleShowFormClick} post={detailPost} /> : detailPane

    return (
        <div style = {{display: 'flex'}}>
            <div style = {{ width: '50vw'}}>
                <h2>All Posts</h2>
                {postComponents}
            </div>
            <div style = {{ width: '50vw'}}>
                <h2>View A Post</h2>
                {sidePane}

            </div>

        </div>
    )
}