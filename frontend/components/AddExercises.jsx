import { useState, useEffect } from "react";
import Select from 'react-select'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';


export default function AddExercises(){

    const [selectMuscile, setSelectMuscile]= useState('')
    const [selectType, setSelectType]= useState('')
    const [workout, setWorkOut]= useState('')
    const [show, setShow] = useState(false);
    const [user, setUser]= useState(null)

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
        {label:'lowerback middleback', value: 'lowerback middleback'},
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
          console.log(response.data);

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
        console.log(muscile_group, workout_type)
        let myResponse=await axios.post('exercise/',{
            'exercise_title': exercise_title,
            'muscile_group': muscile_group,
            'equipment': equipment,
            'workout_type': workout_type,
            'user_exercise': user_exercise,
        })
        console.log(myResponse.data)
        if(myResponse.data['new exercise']==true){
          alert("Input Saved")
        }
        else{
            alert("Incorrect Input")
            // window.location.reload()
        }
    }

    const addExercise=async(exercise)=>{
      console.log(exercise)
      event.preventDefault()
      let exercise_title1 = exercise.name
      let muscile_group1 = exercise.muscle
      let equipment1 = exercise.equipment
      let workout_type1 = exercise.type
      let user_exercise1 = user
      console.log(muscile_group1, workout_type1)
      let myResponse=await axios.post('exercise/',{
          'exercise_title': exercise_title1,
          'muscile_group': muscile_group1,
          'equipment': equipment1,
          'workout_type': workout_type1,
          'user_exercise': user_exercise1,
      })

      if(myResponse.data['new exercise']==true){
        alert("Input Saved")
      }
      else{
          alert("Incorrect Input")
          // window.location.reload()
      }
  }

    useEffect(()=>{
        muscleGroups()
        curr_user()
    }, [])



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
             <button onClick={() => {muscleGroups()}}>
            Update List
            </button>
          </div>
          {/* <div className="col-md-4"></div> */}
      </div>
  </div>
      <div className="workout_list">
        {workout && workout.map(exercise=> 
          {return <ListGroup as="ol">
          <ListGroup.Item 
          className="d-flex justify-content-between align-items-start"
          >
            {exercise.name}
          <button className="add_btn" onClick={() => addExercise(exercise)}>Save Exercise</button>
          </ListGroup.Item>
          </ListGroup>
        })}
        </div>

        <br></br>

      <div className='Manual_Sign_Up'>
    
      <Button variant="primary" onClick={handleShow}>
       Add Exercise Manually 
      </Button>

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
          <Button variant="primary" onClick={manualAddExercise}>
            Save Exercise
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
        </div>
 )
}