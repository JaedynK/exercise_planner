import axios from 'axios'
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom'
import NewUser from './NewUser';
import UserAccount from './WorkoutPlan';
import { useState, useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Hallway from '/Users/jaedyn/Documents/CodePlatoon/week10/exercise_planner/frontend/images/Hallway.jpg'




import React from 'react';


export default function HomePage(){

    
    const [quote, setQuote]= useState('')
    const [currentWorkout, setCurretWorkout]= useState([])
    const [theDelete, setTheDelete]= useState('')
    const [theDeleteEx, setTheDeleteEx]= useState(0)
    const [workoutPlan, setWorkoutPlan]= useState([])

  const [allWorkouts, setAllWorkouts] = useState([])
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
        // console.log(data[0])
        if(data.length === 0 ){
          alert("No Exercise Plan made")
        }else{
          setAllWorkouts(data)
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


    
      const quotes = {
        method: 'POST',
        url: 'https://motivational-quotes1.p.rapidapi.com/motivation',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'cb985bfd5fmsh86f285b0e1f3f59p124c93jsn9f282fa38c92',
          'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com'
        },
        data: '{"key1":"value","key2":"value"}'
     }
      
      function funQuotes(){
      axios.request(quotes).then(function (response) {
        // let checkAuthor =response.data[0].author
        //  console.log(response.data);
        setQuote(response.data)
      }).catch(function (error) {
          console.error(error);
      });
      }

 

      useEffect(()=>{
        funQuotes()
        getDayOfExercise()
    }, [])

    useEffect(()=>{
    
    },[theDeleteEx])


    return(
    <div className='home_page'>
        <div className="home_header">
        <image />
            <h1>My Personal Workout Tracker</h1>
        </div>
      
    <div className="home_quote square rounded border border-5">
        <h4>{quote}</h4>
    </div>
    {allWorkouts.length == 0 ? <></>:
      <div className='home_carousel' >
      <Carousel >
      <Carousel.Item>
        <img
        src={Hallway}
         style={{'height':"300px", 'background':'black' }} 
          className="d-block mx-auto " 
        />
        <Carousel.Caption >
          <h3 style={{ color: 'blue'}}> Monday</h3>
          <hr></hr>
          <h5 style={{ color: 'blue'}}>{ monday.length === 0 ? <h2 style={{ color: 'red'}}>RestDay</h2>:monday && monday.map(group=> {return<div>{group}</div>})}</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src={Hallway}
          style={{'height':"300px", 'background':'None' }} 
        />

        <Carousel.Caption>
          <h3 style={{ color: 'blue'}}>Tuesday</h3>
          <hr></hr>
          <p style={{ color: 'blue'}}>{tuesday.length === 0 ? <h2 style={{ color: 'red'}}>RestDay</h2>:tuesday && tuesday.map(group=> {return<div>{group}</div>})}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src={Hallway}
          style={{'height':"300px", 'background':'None' }} 
        />

        <Carousel.Caption>
          <h3 style={{ color: 'blue'}}>Wednesday</h3>
          <hr></hr>
          <p style={{ color: 'blue'}}>
          {wednesday.length === 0 ? <h2 style={{ color: 'red'}}>RestDay</h2> :wednesday && wednesday.map(group=> {return<div>{group}</div>})}
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
        src={Hallway}
         style={{'height':"300px", 'background':'None' }} 
          className="d-block mx-auto" 
        />
        <Carousel.Caption>
          <h3 style={{ color: 'blue'}}>Thursday</h3>
          <hr></hr>
          <p style={{ color: 'blue'}}>{ thursday.length === 0 ? <h2 style={{ color: 'red'}}>RestDay</h2>: thursday && thursday.map(group=> {return<div>{group}</div>})}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src={Hallway}
          style={{'height':"300px", 'background':'None' }} 
        />

        <Carousel.Caption>
          <h3 style={{ color: 'blue'}}>Friday</h3>
          <hr></hr>
          <p style={{ color: 'blue'}}>{ friday.length === 0 ? <h2 style={{ color: 'red'}}>RestDay</h2>: friday && friday.map(group=> {return<div> {group}</div>})}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src={Hallway}
          style={{'height':"300px", 'background':'None' }} 
        />

        <Carousel.Caption>
          <h3 style={{ color: 'blue'}}>Saturday</h3>
          <hr></hr>
          <p style={{ color: 'blue'}}>
          {saturday.length === 0 ? <h2 style={{ color: 'red'}}>RestDay</h2>: saturday && saturday.map(group=> {return<div>{group}</div>})}
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src={Hallway}
          style={{'height':"300px", 'background':'None' }} 
        />

        <Carousel.Caption>
          <h3 style={{ color: 'blue'}}>Sunday</h3>
          <hr></hr>
          <p style={{ color: 'blue'}}>
          {sunday.length === 0 ? <h2 style={{ color: 'red'}}>RestDay</h2>: sunday && sunday.map(group=> {return<div>{group}</div>})}
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
}
    </div>
    )
}
// .map(test=><div>{test}</div>)