import { useState, useEffect } from 'react'
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import axios from "axios";


import MyNavbar from '../components/Navbar';

function App() {
  
  const [show, setShow] = useState(false);
  const [user, setUser]= useState(null)

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

  
  // function deleteUser(id){
  //   axios.delete(`current_user/${id}/` )
  //   .then( response => {
  //     console.log(response.data)
  //   }).then(
  //     console.log('worked')
  //   )
  // }
 
  // function getAllExercise(){
  //   axios.get('exercise/').then(response=>{
  //     let data = response.data
  //     console.log(data)
  //   })
  // }

  // // function getExercisebyGroup(group){
  // //   axios.get('exercises/'+group+'/').then(response=>{
  // //     let data = response.data
  // //     console.log(data)
  // //   })
  // // }

  // const [monday, setMonday] = useState([])
  // const [tuesday, setTuesday] = useState([])
  // const [wednesday, setWednesday] = useState([])
  // const [thursday, setThursday] = useState([])
  // const [friday, setFriday] = useState([])
  // const [saturday, setSaturday] = useState([])
  // const [sunday, setSunday] = useState([])
  // function getDayOfExercise(){
  //   axios.get('weekday/').then(response=>{
  //     let data = response.data
  //     console.log(data[0])
  //     setMonday(data[0].mondayGroups)
  //     setTuesday(data[0].tuesdayGroups)
  //     setWednesday(data[0].wednesdayGroups)
  //     setThursday(data[0].thursdayGroups)
  //     setFriday(data[0].fridayGroups)
  //     setSaturday(data[0].saturdayGroups)
  //     setSunday(data[0].sundayGroups)
  //   })
  // }

  // const [selectMuscile, setSelectMuscile]= useState('')
  // const musciles = [
  //   {label: 'N/A', value:'' },
  //   {label: 'abdominals', value:'abdominals' },
  //   {label: 'abductors', value:'abductors' },
  //   {label:'adductors', value: 'adductors' },
  //   {label:'biceps', value: 'biceps'},
  //   {label:'calves', value: 'calves'},
  //   {label:'chest', value: 'chest'},
  //   {label:'forearms', value: 'forearms'},
  //   {label:'glutes', value: 'glutes'},
  //   {label:'hamstrings', value: 'hamstrings'},
  //   {label:'lats', value: 'lats'},
  //   {label:'lowerback middleback', value: 'lowerback middleback'},
  //   {label:'neck', value: 'neck'},
  //   {label:'quadriceps', value: 'quadriceps'},
  //   {label:'traps', value:'traps'},
  //   {label:'triceps', value: 'triceps'}
  // ]

  // function postDayOfExercise(){
  //   axios.post('weekday/').then(response=>{
  //     let data = response.data
  //     console.log(data)
  //   })
  // }

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
