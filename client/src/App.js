import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

// Routing
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'

// Components
import MenuBar from './components/Menu';


function App() {
  return (
    <Router>
    <MenuBar />
      <Container>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Container>
    </Router>
  );
}

export default App;
