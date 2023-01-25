import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Blog Home</Link>
                </li>

                <li>
                    <Link to='/new-post'>New Post</Link>
                </li>
            </ul>
        </nav>
    )
}