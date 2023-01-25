import Home from './components/pages/Home'
import NewPost from './components/pages/NewPost'
import Navbar from './components/Navbar'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Navbar />

      <main>
        <Routes>
          <Route 
            path='/'
            element={<Home />}
          />

          <Route 
            path='/new-post'
            element={<NewPost />}
          />
        </Routes>
      </main>

      {/* could have a footer */}
    </Router>
  );
}

export default App;
