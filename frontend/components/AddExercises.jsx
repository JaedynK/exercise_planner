import { useState, useEffect } from "react";
import Select from 'react-select'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from 'react-bootstrap/Row';


export default function AddExercises(){

    const [selectMuscile, setSelectMuscile]= useState('')
    const [selectType, setSelectType]= useState('')
    const [workout, setWorkOut]= useState('')
    const [show, setShow] = useState(false);
    const [user, setUser]= useState(null)
    const [exercises, setExercises] = useState([]) 
    const [saveReps, setSaveReps]= useState('')
    const [saveWeight, setSaveWeight]= useState('')
    const [saveSets, setSaveSets]= useState('')

    const [updateIt, setUpdate]= useState('s')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const curr_user=async()=>{
      let myResponse=await axios.get('current_user/')
      let user1= myResponse.data
      setUser(user1)
    }



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
        {label:'neck', value: 'neck'},
        {label:'quadriceps', value: 'quadriceps'},
        {label:'traps', value:'traps'},
        {label:'triceps', value: 'triceps'}
      ]

      const workoutType = [
        {label: 'N/A', value:'' },
        {label: 'cardio', value:'cardio' },
        {label: 'olympic_weightlifting', value:'olympic_weightlifting' },
        {label:'plyometrics', value: 'plyometrics' },
        {label:'powerlifting', value: 'powerlifting'},
        {label:'strength', value: 'strength'},
        {label:'stretching', value: 'stretching'},
        {label:'strongman', value: 'strongman'},
      ]

    const muscleGroupsAPI = {
        method: 'GET',
        url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
        params: {type: selectType ,muscle: selectMuscile,},
        headers: {
          'X-RapidAPI-Key': 'cb985bfd5fmsh86f285b0e1f3f59p124c93jsn9f282fa38c92',
          'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
        }
      };
      
      function muscleGroups(){
        axios.request(muscleGroupsAPI).then(function (response) {
          let exerciseApiData = response.data
          if(response.data.length===0){
            alert("No Workouts for This Workout type and Muscile Group")
          }
          setWorkOut(exerciseApiData)
        }).catch(function (error) {
          console.error(error);
        });
      }
      

    const manualAddExercise=async()=>{
        event.preventDefault()
        let exercise_title = document.getElementById("exerciseName").value
        let muscile_group =selectMuscile
        let equipment = document.getElementById("equipment").value
        let workout_type = document.getElementById("manWorkoutType").value
        let user_exercise = user
        let weight = document.getElementById("weightInput").value
        let reps = document.getElementById("repsInput").value
        let sets= document.getElementById("setsInput").value
        console.log(muscile_group, workout_type)
        let myResponse=await axios.post('exercise/',{
            'exercise_title': exercise_title,
            'muscile_group': muscile_group,
            'equipment': equipment,
            'workout_type': workout_type,
            'user_exercise': user_exercise,
            'weight': weight,
            'reps': reps,
            'sets': sets,
        })
        console.log(myResponse.data)
        if(myResponse.data['new exercise']==true){
          console.log("Input Saved")
          setUpdate(myResponse.data)
        }
        else{
            alert("Incorrect Input")
            // window.location.reload()
        }
    }

    const addExercise=async(exercise)=>{
      event.preventDefault()
      let exercise_title1 = exercise.name
      let muscile_group1 = exercise.muscle
      let equipment1 = exercise.equipment
      let workout_type1 = exercise.type
      let user_exercise1 = user.id
      let weight = saveWeight || document.getElementById("weightInput").value
      let reps = saveReps || document.getElementById("repsInput").value
      let sets=  saveSets || document.getElementById("setsInput").value
      console.log(muscile_group1, workout_type1, weight, reps, sets)
      let myResponse= await axios.post('exercise/',{
          'exercise_title': exercise_title1,
          'muscile_group': muscile_group1,
          'equipment': equipment1,
          'workout_type': workout_type1,
          'user_exercise': user_exercise1,
          'weight': weight,
          'reps': reps,
          'sets': sets,
      })

      if(myResponse.data['new exercise']==true){
        console.log("Input Saved", myResponse.data)
        setUpdate(myResponse.data)
      }
      else{
          console.log("Incorrect Input")
          // window.location.reload()
      }
  }

  function deleteExercise(id){
    axios.delete('exercise/'+id+'/').then(response=>{
      let data = response.data
      console.log(data)
      setUpdate(data)
    })
  }

  const getAllExercise=async()=>{
    let myResponse = await axios.get('exercise/').then(response=>{
      let data = response.data
      setExercises(data)
    }, 1000)
  }
  function updateExercise(id){
    axios.put('exercise/'+id+'/', {'reps': reps, 'weight': weight, 'sets': sets}).then(response=>{
      let data = response.data
      console.log(data)
      setUpdate(data)
    })
  }

  // useEffect(()=>{
  //   getAllExercise()
  // }, [updateIt])

    useEffect(()=>{
        curr_user()
        muscleGroups()
    }, [])

    useEffect(()=>{
      muscleGroups()
      getAllExercise()
    }, [selectMuscile, selectType, updateIt])




return(
<div className="addExercise_container">
<div className='select_workouts'>
      <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6"> 
             <Select placeholder='Select Muscile Group' id='muscileGroup' options={musciles} 
             onChange={(e)=> setSelectMuscile(e.value)} 
             />
             <br></br>
             <Select placeholder='Select Workout type'  id='workoutType' options={workoutType} 
             onChange={(e)=> setSelectType(e.value)} 
             />
          </div>
          {/* <div className="col-md-4"></div> */}
      </div>
  </div>
  <hr></hr>
  <Container>
    <Row>
      <Col>
      <h2>Saved Exercises</h2>
      <hr></hr>
      {exercises && exercises.map((index, i) => { return <div> {index.muscile_group === selectMuscile ? <ListGroup as="ol">
          <ListGroup.Item 
          className="d-flex justify-content-between align-items-start"
          >
            <text>
              <div><h5>{index.exercise_title}</h5>
              <h8>{index.muscile_group}</h8></div>
            
            <br></br>
           
            <input placeholder={index.weight || 'weight'} type="number" onChange={(event)=> setSaveWeight(event.target.value)} /> weight
            <br />
           <input placeholder={index.reps ||'reps'} type="number" onChange={(event)=> setSaveReps(event.target.value)} /> Reps
            <br />
            <input placeholder={index.sets ||'sets'} type="number" onChange={(event)=> setSaveSets(event.target.value)} /> Sets
            
            </text>
            <Button variant="outline-success" onClick={()=>{updateExercise(index.id)}}>save</Button>
            <Button variant="outline-danger" onClick={()=>{deleteExercise(index.id)}}>delete</Button>
            </ListGroup.Item>
          </ListGroup>:<></>}
          </div>
         })}
         </Col>
      <Col>
      <h2>Add New Exercise</h2>
      <hr></hr>
      
      <Button variant="outline-primary" onClick={handleShow}>
       Add Exercise Manually 
      </Button>

      <div className="workout_list">
        {workout && workout.map(exercise=> 
          {return <div> {exercise.muscle === selectMuscile ?
          <ListGroup as="ol">
          <ListGroup.Item 
          className="d-flex justify-content-between align-items-start"
          >
            <div>
              {exercise.name}
              <br></br>
              <input placeholder={'weight'} type="number" id='weightInput' onChange={(event)=> setSaveWeight(event.target.value)} />
              <input placeholder={'reps'} type="number" id='repsInput' onChange={(event)=> setSaveReps(event.target.value)} />
              <input placeholder={'sets'} type="number" id='setsInput' onChange={(event)=> setSaveSets(event.target.value)}/>
            </div>
          <Button variant="outline-success" className="add_btn" onClick={() => {addExercise(exercise)}}>Save</Button>
          </ListGroup.Item>
          </ListGroup>
          :<></>}</div>
        })}
        </div>

        <br></br>

      <div className='Manual_Sign_Up'>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill Out & Save</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <center>
            <form onSubmit={addExercise}>
              <div>
               <input id='exerciseName' placeholder='Exercise Name' />
              </div>
              <div>
                  <input id='equipment' placeholder='Equipment' />
              </div>
              <div>
                  <input id='manWorkoutType' placeholder='Workout Type' />
              </div>
              <div>
              <input placeholder={'weight'} type="text" id='weightInput' />
              </div>
              <div>
            <input placeholder={'reps'} type="text" id='repsInput' />
            </div>
            <div>
            <input placeholder={'sets'} type="text" id='setsInput'/>
            </div>
                  <div className="col-sm-6"> 
                        <Select placeholder='Muscile Group'id='muscileGroup' options={musciles} onChange={(e)=> setSelectMuscile(e.value)} />
                  </div>
              </form>
              </center>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="outline-success" onClick={manualAddExercise}>
                Save Exercise
              </Button>
            </Modal.Footer>
        </Modal>
        </div>
        </Col>
      </Row>
    </Container>
        </div>
 )
}