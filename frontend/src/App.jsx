import { useState, useEffect } from 'react'
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import axios from "axios";


import MyNavbar from '../components/Navbar';

function App() {
  
  const [user, setUser]= useState(null)
  const [saveReps, setSaveReps]= useState('')
  const [saveWeight, setSaveWeight]= useState('')
  const [saveSets, setSaveSets]= useState('')
  const [exerciseName, setExerciseName]= useState('')
  const [muscileGroup, setMuscileGroup]= useState('')

//--------------Cookie set-up---------------------------//
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');
  axios.defaults.headers.common["X-CSRFToken"]=csrftoken
  //--------------Cookie set-up---------------------------//
  // console.log(user)

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


  useEffect(()=>{
      curr_user()
  }, [])

  // console.log(workDay)
  
  return (
   
    <div className="App"  >

 
  <MyNavbar user={user && user.username}/>
           

    </div>
  )
}

export default App
