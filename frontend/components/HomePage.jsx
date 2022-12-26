import axios from 'axios'
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom'
import NewUser from './NewUser';
import UserAccount from './WorkoutPlan';
import { useState, useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel';




import React from 'react';


export default function HomePage(){

    
    const [quote, setQuote]= useState('')
    const [currentWorkout, setCurretWorkout]= useState([])
    const [theDelete, setTheDelete]= useState('')
    const [theDeleteEx, setTheDeleteEx]= useState(0)
    const [workoutPlan, setWorkoutPlan]= useState([])

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
         console.log(response.data);
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
        
            <h1>My Personal Workout Tracker</h1>
        </div>
      
    <div className="home_quote square rounded border border-5">
        <h4>{quote}</h4>
    </div>
    
 {/* <div><strong>Monday:</strong>
   { monday && monday.map(group=> {return<div>{group}</div>})}
   </div>
          {tuesday && tuesday.map(group=> {return<div><strong>Tuesday:</strong> {group}</div>})}
          {wednesday && wednesday.map(group=> {return<div><strong>Wednesday:</strong> {group}</div>})}
          {thursday && thursday.map(group=> {return<div><strong>thursday:</strong> {group}</div>})}
          {friday && friday.map(group=> {return<div><strong>Friday:</strong> {group}</div>})}
          {saturday && saturday.map(group=> {return<div><strong>Saturday:</strong> {group}</div>})}
          {sunday && sunday.map(group=> {return<div><strong>Sunday:</strong> {group}</div>})} */}

      <div style={{ display: 'block', width: 700, padding: 30 }}>
      <h4>Workout Plan</h4>
      <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{'height':"300px", 'background':'none' }} 
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{'height':"300px", 'background':'none' }} 
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{'height':"300px", 'background':'none' }} 
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
     
    </div>

    {/* {workoutPlan && workoutPlan.map(day=> {return <div>
      {day.mondayGroups.map(test=> test ? <div></div>:<div>{test}</div>)}
      <br/>
      {day.tuesdayGroups.map(test=> test ? <div></div>:<div>{test}</div>)}
      <br/>
      {day.wednesGroups.map(test=> test ? <div></div>:<div>{test}</div>)}
      <br/>
      {day.thursdayGroups.map(test=>test ? <div></div>:<div>{test}</div>)}
      <br/>
      {day.firdayGroups.map(test=>test ? <div></div>:<div>{test}</div>)}
      <br/>
      {day.saturdayGroups.map(test=> test ? <div></div>:<div>{test}</div>)}
      <br/>
      {day.sundayGroups.map(test=> test ? <div></div>:<div>{test}</div>)}
      </div>})} */}
    </div>
    )
}
// .map(test=><div>{test}</div>)