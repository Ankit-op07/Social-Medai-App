import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import './Profile.css'
import {UserContext} from '../App'
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
function Profile() {
  

  const {state,dispatch} = useContext(UserContext);
  const [myPosts,setMyPosts]=useState([]);
  // console.log(state)

  useEffect(()=>{
    fetch('/myposts',{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      }
    }).then(res=>res.json())
    .then(result=>{
      console.log(result.mypost)
      setMyPosts(result.mypost)
    })
  },[])












  return (
    <Container>
      <div className="profile">
        <div className="profile_image">
        <img src="https://5.imimg.com/data5/QQ/JC/FY/SELLER-45461290/yamaha-yzf-r15-v-3-0-bike-500x500.jpg" alt=""/>
          </div>
<div className="profile_info">
  <div className="profile_name">
  <h2>{state?.name}</h2>
  </div>
  <div className="profile_followers">
  <h5>5 posts</h5>
  <h5>10 followers</h5>
  <h5>16 following</h5>
  </div>
  <div className="profile_details">
  <p>Ankit nagar</p>
  <div className="profile_details_description">
  <p>Description</p>
  </div>
  </div>
  </div>
      </div>
      <div className="seperation_line"></div>

      <div className="profile_posts">
      <div className="profile_post">

{
  myPosts.map(post=>{
    return (
      <MDBCol lg='4' md='12' className='mb-4 profile_post_image'>
      <img src={post.photo} className='img-fluid rounded' alt='' />
    </MDBCol>
    )
  })
}
    
      </div>
      </div>
    </Container>
  )
}

export default Profile