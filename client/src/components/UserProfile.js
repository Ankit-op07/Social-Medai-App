import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Profile.css";
import { UserContext } from "../App";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import {
  MDBInputGroup,
  MDBInputGroupText,
  MDBInputGroupElement,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";

function Profile() {
  // const {state,dispatch} = useContext(UserContext);
  const [myPosts, setMyPosts] = useState([]);
  const [userProfile, setProfile] = useState(null);

  const { userid } = useParams();
  const {state,dispatch} = useContext(UserContext)
// console.log(state);
  useEffect(() => {
    const apiCall = async () => {
      try {
         
        const response = await fetch(`/profile/${userid}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        });
        const result = await response.json();
        // console.log(result);
        setMyPosts(result.posts);
        setProfile(result.user);
      } catch (err) {
        console.log(err);
      }
    };
    apiCall();
  }, []);


  const follow = async()=>{
      const response = await fetch(`/follow/${userid}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
      })
      const result = await response.json();
      setProfile(result);
      console.log(result);
      
  }
  const unfollow = async()=>{
    const response = await fetch(`/unfollow/${userid}`,{
          method:"put",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
    })
    const result = await response.json();
    setProfile(result);
    console.log(result);
    
}



















  return (
    <Container>
      {userProfile === null ? (
        <div className="d-flex justify-content-center">
          <MDBBtn disabled>
            <MDBSpinner
              grow
              size="sm"
              role="status"
              tag="span"
              className="me-2"
            />
            Loading...
          </MDBBtn>
        </div>
      ) : (
        <>
          <div className="profile">
            <div className="profile_image">
              <img
                src="https://5.imimg.com/data5/QQ/JC/FY/SELLER-45461290/yamaha-yzf-r15-v-3-0-bike-500x500.jpg"
                alt=""
              />
            </div>
            <div className="profile_info">
              <div className="profile_name">
                <h2>{userProfile.name}</h2>
                {
                    userProfile.followers.includes(state._id) ?

                    <MDBBtn rounded className='mx-2' color='info' onClick={()=>unfollow()} >
                unfollow
                    </MDBBtn>
                    :
                    <MDBBtn rounded className='mx-2' color='info' onClick={()=>follow()}>
                follow
                    </MDBBtn>
                }
               
              </div>
              <div className="profile_followers">
                <h5>{myPosts.length} posts</h5>
                <h5>{userProfile.followers.length} followers</h5>
                <h5>{userProfile.following.length} following</h5>
              </div>
              <div className="profile_details">
                
                <div className="profile_details_description">
                  <p>Description</p>
                </div>
              </div>
            </div>
          </div>
          <div className="seperation_line"></div>

          <div className="profile_posts">
            <div className="profile_post">
              {myPosts.map((post) => {
                return (
                  <MDBCol lg="4" md="12" className="mb-4 profile_post_image">
                    <img
                      src={post.photo}
                      className="img-fluid rounded"
                      alt=""
                    />
                  </MDBCol>
                );
              })}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default Profile;
