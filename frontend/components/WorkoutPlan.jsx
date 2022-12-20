import axios from 'axios'
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect} from 'react';

export default function WorkoutPlan(){

  const [workoutGroup, setWorkoutGroup] = useState([])  
    const [exercises, setExercises] = useState([])  
    const [show, setShow] = useState(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getAllExercise(){
        axios.get('exercise/').then(response=>{
          let data = response.data
          // console.log(data)
        })
      }

  function getExercisebyGroup(group){
    console.log(group)
    axios.get('exercises/'+group+'/').then(response=>{
      let data = response.data
      console.log(data[0])
      setExercises(data)
    })
  }

  const [monday, setMonday] = useState([])
  const [tuesday, setTuesday] = useState([])
  const [wednesday, setWednesday] = useState([])
  const [thursday, setThursday] = useState([])
  const [friday, setFriday] = useState([])
  const [saturday, setSaturday] = useState([])
  const [sunday, setSunday] = useState([])
  function getDayOfExercise(){
    axios.get('weekday/').then(response=>{
      let data = response.data
      console.log(data[0])
      if(data.length === 0 ){
        alert("No Exercise Plan made")
      }else{
      setMonday(data[0].mondayGroups)
      setTuesday(data[0].tuesdayGroups)
      setWednesday(data[0].wednesdayGroups)
      setThursday(data[0].thursdayGroups)
      setFriday(data[0].fridayGroups)
      setSaturday(data[0].saturdayGroups)
      setSunday(data[0].sundayGroups)
      }
    })
  }

  const [selectMuscile, setSelectMuscile]= useState('')
  const musciles = [
    {label: 'N/A', value:'' },
    {label: 'abdominals', value:'abdominals' },
    {label: 'abductors', value:'abductors' },
    {label:'adductors', value: 'adductors' },
    {label:'biceps', value: 'biceps'},
    {label:'calves', value: 'calves'},
    {label:'chest', value: 'chest'},
    {label:'forearms', value: 'forearms'},
    {label:'glutes', value: 'glutes'},
    {label:'hamstrings', value: 'hamstrings'},
    {label:'lats', value: 'lats'},
    {label:'lowerback middleback', value: 'lowerback middleback'},
    {label:'neck', value: 'neck'},
    {label:'quadriceps', value: 'quadriceps'},
    {label:'traps', value:'traps'},
    {label:'triceps', value: 'triceps'}
  ]

  function postDayOfExercise(){
    axios.post('weekday/').then(response=>{
      let data = response.data
      console.log(data)
    })
  }
    
      useEffect(()=>{
          getAllExercise()
          getDayOfExercise()
      }, [])


    return(
       <div className='workouts_page'>
{/* modal clickers */}
      <Button variant="primary" onClick={(event)=>{handleShow(event); getExercisebyGroup(wednesday); }}>
        Monday Exercises
      </Button>

      <Button variant="primary" onClick={handleShow}>
        Tuesday Exercises
      </Button>

      <Button variant="primary" onClick={handleShow}>
        Wednesday Exercises
      </Button>

      <Button variant="primary" onClick={handleShow}>
        Thursday Exercises
      </Button>

      <Button variant="primary" onClick={handleShow}>
        Firday Exercises
      </Button>

      <Button variant="primary" onClick={handleShow}>
        Saturday Exercises
      </Button>

      <Button variant="primary" onClick={handleShow}>
        Sunday Exercises
      </Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Monday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <button onClick={()=>postDayOfExercise()}>New Exercise for Monday</button>
     { monday && monday.map(day => {
          return <div>
            <input type='text'
          placeholder={day}
          />
          </div>
          })}

        {/* {exercises && exercises.map(ex => {  WORK ON THIS
          return <div>{ex}</div>
        }
        )} */}
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

{/* Modal Clickers */}

      { monday && monday.map(day => {
          return <div>
            <input type='text'
          placeholder={day}
          />
          </div>
          })}
           <h2>Tuesday</h2>
     { tuesday && tuesday.map(day => {
          return <p>{day}</p>
          })}
           <h2>Wednesday</h2>
     { wednesday && wednesday.map(day => {
          return <p>{day}</p>
          })}
           <h2>Thursday</h2>
     { thursday && thursday.map(day => {
          return <p>{day}</p>
          })}
           <h2>Firday</h2>
     { friday && friday.map(day => {
          return <p>{day}</p>
          })}
           <h2>Saturday</h2>
     { saturday && saturday.map(day => {
          return <p>{day}</p>
          })}
           <h2>Sunday</h2>
      { sunday && sunday.map(day => {
          return<p>{day}</p>
          })}

      <button onClick={()=>getExercisebyGroup("chest")}>all</button>
      <button onClick={()=>getDayOfExercise()}>days</button>
      </div>
    )
}
