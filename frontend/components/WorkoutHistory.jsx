import { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


export default function WorkoutHistory(){
    const [oldWorkouts, setOldWorkouts]= useState([])
    const [user, setUser]= useState(null)
    const [saveReps, setSaveReps]= useState('')
    const [saveWeight, setSaveWeight]= useState('')
    const [saveSets, setSaveSets]= useState('')
    const [exerciseName, setExerciseName]= useState('')
    const [muscileGroup, setMuscileGroup]= useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const curr_user=async()=>{
        let myResponse=await axios.get('current_user/')
        let user1= myResponse.data
        console.log(user1)
        setUser(user1)
      }

    function saveWorkout(){
        event.preventDefault()
        let exercise_title1 = exerciseName
        let muscile_group1 = muscileGroup
        let user_exercise1 = user.id
        let weight = saveWeight
        let reps = saveReps 
        let sets=  saveSets
        console.log(muscile_group1, weight, reps, sets)
       axios.post('saveWorkout/',{
            'exercise': exercise_title1,
            'muscile_group': muscile_group1,
            'user_exercise': user_exercise1,
            'weight': weight,
            'reps': reps,
            'sets': sets,
        }).then(response=>{
          let data = response.data
          console.log(data)
        })
      }

      function getWorkout(){
        axios.get('saveWorkout/').then(response=>{
                let data = response.data
                setOldWorkouts(data)
            }
        )
      }



      useEffect(()=>{
        curr_user()
        getWorkout()
    }, [])
    
    return(
        <div className="workoutHistory">

    <Button variant="primary" onClick={handleShow}>
       Log Exercise
    </Button>

<hr></hr>
        {oldWorkouts && oldWorkouts.map(workout => 
            {return <ListGroup as="ol">
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <text>
            <h6>{workout.exercise}</h6>
            <h8>{workout.muscile_group}</h8>
            </text>
            <div>{workout.weight}lbs | {workout.reps} Reps | {workout.sets} Sets</div>
            Date: {workout.workout_date.slice(0,10)}
            </ListGroup.Item>
          </ListGroup>

        }
        )}
  
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Input Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Exercise</Form.Label>
        <Row>
        <Col>
        <input placeholder={'exercise'} type="text" onChange={(event)=> setExerciseName(event.target.value)} />
        </Col>
        </Row>
        <hr></hr>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Muscile Group</Form.Label>
        <Row>
        <Col>
        <input placeholder={'muscile_group'} type="text" onChange={(event)=> setMuscileGroup(event.target.value)} />
        </Col>
        </Row>
        <hr></hr>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Weight</Form.Label>
        <Row>
        <Col>
        <input placeholder={'weight'} type="number" onChange={(event)=> setSaveWeight(event.target.value)} />
        </Col>
        </Row>
        <hr></hr>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Reps</Form.Label>
        <Row>
        <Col>
        <input placeholder={'reps'} type="number" onChange={(event)=> setSaveReps(event.target.value)} />
        </Col>
        </Row>
        <hr></hr>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Sets</Form.Label>
        <Row>
        <Col>
        <input placeholder={'sets'} type="number" onChange={(event)=> setSaveSets(event.target.value)} />
        </Col>
        </Row>
        </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(event)=>{handleClose(event); saveWorkout();}}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
        </div>
    )
}