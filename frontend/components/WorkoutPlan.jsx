import axios from 'axios'
import Select from 'react-select'
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect} from 'react';
import AddExercises from './AddExercises';



export default function WorkoutPlan(){

    const [workoutGroup, setWorkoutGroup] = useState([])  
    const [exercises, setExercises] = useState([]) 
    const [selectMuscile, setSelectMuscile]= useState('')
    const [theDelete, setTheDelete]= useState('')
    const [theDeleteEx, setTheDeleteEx]= useState(0)


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

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);
    const [show6, setShow6] = useState(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);

    const handleClose5 = () => setShow5(false);
    const handleShow5 = () => setShow5(true);

    const handleClose6 = () => setShow6(false);
    const handleShow6 = () => setShow6(true);

  
  const [monday, setMonday] = useState([])
  const [tuesday, setTuesday] = useState([])
  const [wednesday, setWednesday] = useState([])
  const [thursday, setThursday] = useState([])
  const [friday, setFriday] = useState([])
  const [saturday, setSaturday] = useState([])
  const [sunday, setSunday] = useState([])

    function getAllExercise(){
        axios.get('exercise/').then(response=>{
          let data = response.data
          setExercises(data)
        })
      }

    function deleteExercise(id){
        axios.delete('exercise/'+id+'/').then(response=>{
          let data = response.data
          console.log(data)
          setTheDeleteEx(data)
        })
      }

  function getExercisebyGroup(group){
    console.log(group)
    axios.get('muscileGroup/'+group+'/').then(response=>{
      let data = response.data
      setWorkoutGroup(data)
    }).catch(function (error) {
      console.log(error, "no recored workouts");
  });
  }

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

  function deleteGroup(day, group){
    console.log(day, group)
    axios.delete('weekday/'+day+'/muscile/'+group+'/').then(response=>{
      let data = response.data
      console.log(data)
      setTheDeleteEx(data)
    }).then(
    // window.location.reload()
    )
  }


  function postDayOfExercise(day, group){
    axios.post('weekday/'+day+'/muscile/'+group+'/').then(response=>{
      console.log(day, group)
      let data = response.data
      console.log(data)
    }).then(
      window.location.reload()
    )
  }
    
      useEffect(()=>{
        getDayOfExercise()

      },[])

      useEffect(()=>{
        getAllExercise()
      },[theDeleteEx])


    return(
       <div className='workouts_page'>
{/* modal clickers */}
<Container>
  <Col>

    <Row>
      <Button variant="outline-primary" onClick={(event)=>{handleShow(event); getExercisebyGroup(monday); }}>
        Monday Exercises
      </Button>
    </Row>
<hr></hr>
    <Row>
      <Button variant="outline-primary" onClick={(event)=>{handleShow1(event); getExercisebyGroup(tuesday); }}>
        Tuesday Exercises
      </Button>
      </Row>
<hr></hr>
      <Row>
      <Button variant="outline-primary" onClick={(event)=>{handleShow2(event); getExercisebyGroup(wednesday);}}>
        Wednesday Exercises
      </Button>
      </Row>
<hr></hr>
      <Row>
        <Button variant="outline-primary" onClick={(event)=>{handleShow3(event); getExercisebyGroup(thursday);}}>
        Thursday Exercises
      </Button>
      </Row>
<hr></hr>
      <Row>
        <Button variant="outline-primary" onClick={(event)=>{handleShow4(event); getExercisebyGroup(friday);}}>
        Firday Exercises
      </Button>
      </Row>
<hr></hr>
      <Row>
      <Button variant="outline-primary" onClick={(event)=>{handleShow5(event); getExercisebyGroup(saturday);}}>
        Saturday Exercises
      </Button>
      </Row>
<hr></hr>
      <Row>
      <Button variant="outline-primary" onClick={(event)=>{handleShow6(event); getExercisebyGroup(sunday);}}>
        Sunday Exercises
      </Button>
      </Row>
  </Col>
</Container>
{/* ----------------------Monday Modal---------------------------- */}
<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Monday</Modal.Title>
  </Modal.Header>
      <Modal.Body>
    { monday.length === 0 ?<h3> Rest Day </h3> : monday && monday.map((group, i) => {
    return <div>
    <ul>
      <li>
        {theDelete === group ? 
        <h3 style={{ color: 'red', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{group}</h3> 
        : <div className='groupNameDiv'>
        <text style={{fontWeight: 'bold', fontSize: '1.5rem'}}>{group}</text> 
        <Button variant="outline-danger" size="sm" style={{marginLeft:'1rem'}} onClick={(event) => setTheDelete(group) }>delete</Button>
        </div>}

        {exercises && exercises.map((index, i) => { return <div> {group === index.muscile_group ? 
          <div>
            <text>{index.exercise_title} 
          <Button style={{marginLeft:'1rem'}} variant="outline-danger" size="sm" onClick={()=>
            {deleteExercise(index.id)}}>x</Button>
          <br></br> ({index.weight}lbs| {index.reps} Reps| {index.sets} Sets)</text>
          <hr></hr>
          </div>
          : <></>}
          </div>
        })}
      </li>
    </ul>
    </div>
    })}
    <div className="col-sm-6"> 
          <Select placeholder='Add Muscile Group'id='muscileGroup' options={musciles} onChange={(e)=> setSelectMuscile(e.value)} />
    </div>
  </Modal.Body>
<Modal.Footer>

      <Button variant="outline-secondary" onClick={handleClose}>
        Close
      </Button>

    <Button variant="outline-success" 
    onClick={()=>{postDayOfExercise('mondayGroups', selectMuscile); 
    deleteGroup('mondayGroups', theDelete);  deleteExercise(theDeleteEx)}}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>
{/* ------------------------Tuesday Model-------------------------- */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Tuesday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        { tuesday.length === 0 ?<h3> Rest Day </h3> :  tuesday && tuesday.map(group => {
                  return <div>
                  <ul>
                    <li>
                     {theDelete === group ? 
                     <h3 style={{ color: 'red', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{group}</h3> 
                     : <div className='groupNameDiv'>
                      <text style={{fontWeight: 'bold', fontSize: '1.5rem'}}>{group}</text> 
                      <Button variant="outline-danger" size="sm" style={{marginLeft:'1rem'}} onClick={(event) => setTheDelete(group) }>delete</Button>
                      </div>}
          
                    {exercises && exercises.map((index, i) => { return <div> {group === index.muscile_group ? 
                     <div>
                     <text>{index.exercise_title} 
                   <Button style={{marginLeft:'1rem'}} variant="outline-danger" size="sm" onClick={()=>
                    {deleteExercise(index.id)}}>x</Button>
                   <br></br> ({index.weight}lbs| {index.reps} Reps| {index.sets} Sets)</text>
                   <hr></hr>
                   </div>
                      : <></>}
                      </div>
                    })}
          
                    </li>
                  </ul>
                  </div>
                  })}
                  <div className="col-sm-6"> 
                        <Select placeholder='Add Muscile Group'id='muscileGroup' options={musciles} onChange={(e)=> setSelectMuscile(e.value)} />
                  </div>
                </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                  Close
                </Button>
          
              <Button variant="outline-success" 
              onClick={()=>{postDayOfExercise('tuesdayGroups', selectMuscile); 
              deleteGroup('tuesdayGroups', theDelete);  deleteExercise(theDeleteEx)}}>
                Save Changes
              </Button>
        </Modal.Footer>
      </Modal>
{/* -------------------------Wednesday Modal------------------------- */}

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Wednesday</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        { wednesday.length === 0 ?<h3> Rest Day </h3> :  wednesday && wednesday.map(group => {
                  return <div>
                  <ul>
                    <li>
                     {theDelete === group ? 
                     <h3 style={{ color: 'red', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{group}</h3> 
                     : <div className='groupNameDiv'>
                      <text style={{fontWeight: 'bold', fontSize: '1.5rem'}}>{group}</text> 
                      <Button variant="outline-danger" size="sm" style={{marginLeft:'1rem'}} onClick={(event) => setTheDelete(group) }>delete</Button>
                      </div>}
          
                    {exercises && exercises.map((index, i) => { return <div> {group === index.muscile_group ? 
                     <div>
                     <text>{index.exercise_title} 
                   <Button style={{marginLeft:'1rem'}} variant="outline-danger" size="sm" onClick={()=>
                    {deleteExercise(index.id)}}>x</Button>
                   <br></br> ({index.weight}lbs| {index.reps} Reps| {index.sets} Sets)</text>
                   <hr></hr>
                   </div>
                    : <></>}
                      </div>
                    })}
          
                    </li>
                  </ul>
                  </div>
                  })}
                  <div className="col-sm-6"> 
                        <Select placeholder='Add Muscile Group'id='muscileGroup' options={musciles} onChange={(e)=> setSelectMuscile(e.value)} />
                  </div>
                </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                  Close
                </Button>
          
              <Button variant="outline-success"
              onClick={()=>{postDayOfExercise('wednesdayGroups', selectMuscile); 
              deleteGroup('wednesdayGroups', theDelete);  deleteExercise(theDeleteEx)}}>
                Save Changes
              </Button>
        </Modal.Footer>
      </Modal>

{/* -----------------------Thursday Modal--------------------------- */}

  <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Thursday</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        {thursday.length === 0 ?<h3> Rest Day </h3> :  thursday && thursday.map(group => {
                return <div>
                <ul>
                  <li>
                   {theDelete === group ? 
                   <h3 style={{ color: 'red', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{group}</h3> 
                   : <div className='groupNameDiv'>
                    <text style={{fontWeight: 'bold', fontSize: '1.5rem'}}>{group}</text> 
                    <Button variant="outline-danger" size="sm" style={{marginLeft:'1rem'}} onClick={(event) => setTheDelete(group) }>delete</Button>
                    </div>}
        
                    {exercises && exercises.map((index, i) => { return <div> {group === index.muscile_group ? 
                    <div>
                    <text>{index.exercise_title} 
                  <Button style={{marginLeft:'1rem'}} variant="outline-danger" size="sm" onClick={()=>
                   {deleteExercise(index.id)}}>x</Button>
                  <br></br> ({index.weight}lbs| {index.reps} Reps| {index.sets} Sets)</text>
                  <hr></hr>
                  </div>
                    : <></>}
                      </div>
                    })}
        
                  </li>
                </ul>
                </div>
                })}
                <div className="col-sm-6"> 
                      <Select placeholder='Add Muscile Group'id='muscileGroup' options={musciles} onChange={(e)=> setSelectMuscile(e.value)} />
                </div>
              </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleClose}>
                Close
              </Button>
        
            <Button variant="outline-success" 
            onClick={()=>{postDayOfExercise('thursdayGroups', selectMuscile); 
            deleteGroup('thursdayGroups', theDelete);  deleteExercise(theDeleteEx)}}>
              Save Changes
            </Button>
        </Modal.Footer>
  </Modal>

  {/* -----------------------Friday Modal--------------------------- */}

  <Modal show={show4} onHide={handleClose4}>
        <Modal.Header closeButton>
          <Modal.Title>Friday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  
        { friday.length === 0 ?<h3> Rest Day </h3> : friday && friday.map(group => {
                 return <div>
                 <ul>
                   <li>
                    {theDelete === group ? 
                    <h3 style={{ color: 'red', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{group}</h3> 
                    : <div className='groupNameDiv'>
                     <text style={{fontWeight: 'bold', fontSize: '1.5rem'}}>{group}</text> 
                     <Button variant="outline-danger" size="sm" style={{marginLeft:'1rem'}} onClick={(event) => setTheDelete(group) }>delete</Button>
                     </div>}
         
                     {exercises && exercises.map((index, i) => { return <div> {group === index.muscile_group ? 
                    <div>
                    <text>{index.exercise_title} 
                    <Button style={{marginLeft:'1rem'}} variant="outline-danger" size="sm" onClick={()=>
                     {deleteExercise(index.id)}}>x</Button>
                    <br></br> ({index.weight}lbs| {index.reps} Reps| {index.sets} Sets)</text>
                    <hr></hr>
                    </div>
                    : <></>}
                      </div>
                    })}
         
                   </li>
                 </ul>
                 </div>
                 })}
                 <div className="col-sm-6"> 
                       <Select placeholder='Add Muscile Group'id='muscileGroup' options={musciles} onChange={(e)=> setSelectMuscile(e.value)} />
                 </div>
               </Modal.Body>
             <Modal.Footer>
               <Button variant="outline-secondary" onClick={handleClose}>
                 Close
               </Button>
         
             <Button variant="outline-success"
             onClick={()=>{postDayOfExercise('fridayGroups', selectMuscile); 
             deleteGroup('fridayGroups', theDelete);  deleteExercise(theDeleteEx)}}>
               Save Changes
             </Button>
        </Modal.Footer>
  </Modal>

{/* -----------------------Saturday Modal--------------------------- */}
<Modal show={show5} onHide={handleClose5}>
        <Modal.Header closeButton>
          <Modal.Title>Saturday</Modal.Title>
        </Modal.Header>
        <Modal.Body>

  
        { saturday.length === 0 ?<h3> Rest Day </h3> :  saturday && saturday.map(group => {
                return <div>
                <ul>
                  <li>
                   {theDelete === group ? 
                   <h3 style={{ color: 'red', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{group}</h3> 
                   : <div className='groupNameDiv'>
                    <text style={{fontWeight: 'bold', fontSize: '1.5rem'}}>{group}</text> 
                    <Button variant="outline-danger" size="sm" style={{marginLeft:'1rem'}} onClick={(event) => setTheDelete(group) }>delete</Button>
                    </div>}
        
                    {exercises && exercises.map((index, i) => { return <div> {group === index.muscile_group ? 
                    <div>
                    <text>{index.exercise_title} 
                    <Button style={{marginLeft:'1rem'}} variant="outline-danger" size="sm" onClick={()=>
                    {deleteExercise(index.id)}}>x</Button>
                    <br></br> ({index.weight}lbs| {index.reps} Reps| {index.sets} Sets)</text>
                    <hr></hr>
                    </div>
                    : <></>}
                      </div>
                    })}
                  </li>
                </ul>
                </div>
                })}
                <div className="col-sm-6"> 
                      <Select placeholder='Add Muscile Group'id='muscileGroup' options={musciles} onChange={(e)=> setSelectMuscile(e.value)} />
                </div>
              </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleClose}>
                Close
              </Button>
        
            <Button variant="outline-success" 
            onClick={()=>{postDayOfExercise('saturdayGroups', selectMuscile); 
            deleteGroup('saturdayGroups', theDelete);  deleteExercise(theDeleteEx)}}>
              Save Changes
            </Button>
        </Modal.Footer>
  </Modal>
{/* -----------------------sunday Modal--------------------------- */}

<Modal show={show6} onHide={handleClose6}>
        <Modal.Header closeButton>
          <Modal.Title>Saturday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  
        { sunday.length === 0 ?<h3> Rest Day </h3> : sunday && sunday.map(group => {
                 return <div>
                 <ul>
                   <li>
                    {theDelete === group ? 
                    <h3 style={{ color: 'red', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{group}</h3> 
                    : <div className='groupNameDiv'>
                     <text style={{fontWeight: 'bold', fontSize: '1.5rem'}}>{group}</text> 
                     <Button variant="outline-danger" size="sm" style={{marginLeft:'1rem'}} onClick={(event) => setTheDelete(group) }>delete</Button>
                     </div>}
         
                     {exercises && exercises.map((index, i) => { return <div> {group === index.muscile_group ? 
                     <div><text>{index.exercise_title}</text>
                     <button onClick={()=> 
                     {deleteExercise(index.id)}}>delete</button></div> 
                     : <></>}
                      </div>
                    })}
         
                   </li>
                 </ul>
                 </div>
                 })}
                 <div className="col-sm-6"> 
                       <Select placeholder='Add Muscile Group'id='muscileGroup' options={musciles} onChange={(e)=> setSelectMuscile(e.value)} />
                 </div>
               </Modal.Body>
             <Modal.Footer>
               <Button variant="outline-secondary" onClick={handleClose}>
                 Close
               </Button>
         
             <Button variant="outline-success" 
             onClick={()=>{postDayOfExercise('sundayGroups', selectMuscile); 
             deleteGroup('sundayGroups', theDelete)}}>
               Save Changes
             </Button>
        </Modal.Footer>
  </Modal>

{/* Modal Clickers */}
      </div>
    )
}
