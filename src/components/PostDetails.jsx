export default function PostDetails(props) {
    return(
        <>
            <h3>Title:{props.post.title}</h3>
            <p>By:{props.post.name}</p>
            <p>{props.post.content}</p>
            <button onClick={props.handleShowFormClick}>Edit</button>
        </>
    )
}