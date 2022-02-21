import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Profile.css";
import { UserContext } from "../App";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import {
  MDBInputGroup,
  MDBInputGroupText,
  MDBInputGroupElement,
  MDBBtn,
  MDBSpinner,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from "mdb-react-ui-kit";
function Profile() {


  const { state, dispatch } = useContext(UserContext);
  const [myPosts, setMyPosts] = useState([]);
  const [userProfile, setProfile] = useState(null);

  const [title,setTitle] = useState("")
  const [image,setImage]=useState('')
  // console.log(state)


  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);



  useEffect(() => {
    fetch("/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.mypost)
        setMyPosts(result.mypost);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("/myprofile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProfile(result);
        // dispatch({type:"UPDATE",payload:result})
      });
  }, []);

  return (
    <Container>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Modal title</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
          <input
          type="text"
          className="form-control mb-3"
          id="exampleFormControlInput1"
           placeholder="name"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
        />
           <input type="file" className="form-control mb-3" placeholder="Upload an image" onChange={(e)=>{
          setImage(e.target.files[0]);
        }} />
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={toggleShow}>
              Close
            </MDBBtn>
            <MDBBtn>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>

      {
        userProfile===null ?
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
      :
      <div>
      <div className="profile">
        <div className="profile_image">
          <img
            src="https://5.imimg.com/data5/QQ/JC/FY/SELLER-45461290/yamaha-yzf-r15-v-3-0-bike-500x500.jpg"
            alt=""
          />
        </div>
        <div className="profile_info">
          <div className="profile_name">
            <h2>{state?.name}</h2>
            <MDBBtn className='m-1' style={{ backgroundColor: '#55acee' }} href='#' onClick={toggleShow}>
            <i class="far fa-edit"></i>
      </MDBBtn>
          </div>
          <div className="profile_followers">
            <h5>{myPosts.length} posts</h5>
            <h5>{userProfile.followers.length} followers</h5>
            <h5>{userProfile.following.length} following</h5>
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
          {myPosts.map((post) => {
            return (
              <MDBCol lg="4" md="12" className="mb-4 profile_post_image">
                <img src={post.photo} className="img-fluid rounded" alt="" />
              </MDBCol>
            );
          })}
        </div>
      </div>
      </div>
}
    </Container>
  );
}

export default Profile;
