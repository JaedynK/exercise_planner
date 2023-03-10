import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/esm/Button';


import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
// import { Router } from 'react-router-dom';
import NewUser from './NewUser';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom'

import HomePage from './HomePage';
import WorkoutPlan from './WorkoutPlan';
import LogIn from './LogIn'
import AddExercises from './AddExercises'
import WorkoutHistory from './WorkoutHistory';


export default function MyNavbar({user}) {

    // console.log(user)

    const signOut=async()=>{
        let myResponse=await axios.post('signOut/')
        if (myResponse.data["signout"]==true){
          window.location.reload()
        }
      }
  return (

    <Router>
    <Navbar  bg="dark" variant="dark" expand="lg"  >
      <Container className='nav1'>
        <Navbar.Brand ClassName='nav_header' href={'/'}>Home</Navbar.Brand>
        <Nav className='nav2'>
        <Nav.Link>
        {user &&  
          <Nav.Item>Signed in as: {user}
          <Button  size='sm' variant="outline-danger" className='sign_out_btn'
          onClick={signOut}>Sign Out</Button>
          </Nav.Item> 
        || <Link classNam='link2'to='/signIn'>Log In</Link>}
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link>
            {user ? <></> : <Link className='link1' to='/signUp'>New Account</Link>}
        </Nav.Link>
        <Nav.Link>
           {<Link className='link'to='/WorkoutPlan'>Workouts</Link>}
        </Nav.Link>
        <Nav.Link>
           {<Link className='link'to='/addExercise'>Exercises</Link>}
        </Nav.Link>
        <Nav.Link>
           {<Link className='link'to='/saveWorkout'>Workout History</Link>}
        </Nav.Link>
        </Nav>
        </Navbar.Collapse>
        {/* <Navbar.Collapse className="justify-content-end"> */}          
        {/* <Nav.Item>
           { user || <Link classNam='link2'to='/signIn'>Log In</Link>}
        </Nav.Item> */}
        {/* </Navbar.Collapse> */}
        </Nav>
      </Container>
    </Navbar>
    <Routes>
            <Route path='' element={<HomePage  user={user}/>}></Route>
            <Route path='/signUp' element={<NewUser />}></Route>
            <Route path='/signIn' element={<LogIn />}></Route>
            <Route path='/workoutPlan' element={<WorkoutPlan />}></Route>
            <Route path='/addExercise' element={<AddExercises />}></Route>
            <Route path='/saveWorkout' element={<WorkoutHistory />}></Route>
        </Routes>
    </Router>
  );
}