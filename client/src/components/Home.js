import React, { useEffect,useContext} from 'react'
import { Container } from 'react-bootstrap'
import {UserContext} from '../App'
import {
  MDBInputGroup,
  MDBInputGroupText,
  MDBInputGroupElement,
  MDBBtn,
  MDBSpinner
} from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'

function Home() {

  
  const {state,dispatch} = useContext(UserContext)
  // console.log(state) 
  const [posts,setPosts] = React.useState([])


  useEffect(()=>{
  fetch('/allposts',{
    headers:{
      "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
  }).then(res=>res.json())
  .then(data=>{
    // console.log(data)
    setPosts(data.posts)
  })
},[])


const likePost = (id)=>{
  fetch('./like',{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      postId:id
    })
  }).then(res=>res.json())
  .then(result=>{
    console.log(result);
    // setLikes(result.likes.length);
    const newData = posts.map(item=>{
      if(item._id === result._id){
        return result
      }else{
        return item
    }
  })
  setPosts(newData);
})
}

const unlikePost = (id)=>{
  fetch('./unlike',{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      postId:id
    })
  }).then(res=>res.json())
  .then(result=>{
    const newData = posts.map(item=>{
      if(item._id === result._id){
        return result
      }else{
        return item
    }
  })
  setPosts(newData);
  })
}

const makeComment=(text,postId)=>{
 
fetch('/comment',{
  method:"put",
  headers:{ // important for authorization to work
    "content-type": "application/json",
    "Authorization":"Bearer "+localStorage.getItem("jwt")
  },
  body:JSON.stringify({ // what we are sending to api
    postId,
    text
  })
}).then(res=>res.json())
.then(result=>{
// console.log(result);
const newData = posts.map(item=>{
  if(item._id === result._id){
    return result
  }else{
    return item
}
})
setPosts(newData);
}).catch(err=>{
  console.error(err);
})
}

console.log(posts)

const deletePost = (postid)=>{
  fetch(`/deletepost/${postid}`,{
      method:"delete",
      headers:{
          Authorization:"Bearer "+localStorage.getItem("jwt")
      }
  }).then(res=>res.json())
  .then(result=>{
      console.log(result)
      const newData = posts.filter(item=>{
          return item._id !== result._id
      })
      setPosts(newData)
  })
}

// const deletePostComment = (postid,commentId)=>{
//   console.log(postid,commentId)
//   fetch(`/deletecomment/${postid}/${commentId}`,{
//       method:"delete",
//       headers:{
//           Authorization:"Bearer "+localStorage.getItem("jwt")
//       }
//   }).then(res=>res.json())
//   .then(result=>{
//       console.log(result)
      
//       const newData = posts.filter(item=>{
//           item.comments.filter((comment)=>{
//             return comment._id !=result._id
//           })

//       })
//       setPosts(newData)
//   })
// }



  return (
    <Container className="mt-5">
   {
     posts.length ===0 ?
      
     <div className="d-flex justify-content-center">
     <MDBBtn disabled>
        <MDBSpinner grow size='sm' role='status' tag='span' className='me-2' />
        Loading...
      </MDBBtn>
      </div>

     :

      
      posts.map(post=>{
        return(
          <div>
           
            <div className="d-flex justify-content-center mb-5" key={post._id}>
    <div className="card w-50" >
      <div className="d-flex justify-content-between mb-1">
      <h3 className="post_heading_name"><Link to={ state._id===post.postedBy._id ? '/profile'  :`/profile/${post.postedBy._id}`} >{post.postedBy.name}</Link></h3>
      { 
        post.postedBy._id === state._id  &&

      <MDBBtn className='mx-2' color='danger' onClick={()=>deletePost(post._id)}>
       Delete
      </MDBBtn>
      }
      </div>
    
  <img src={post.photo} className="card-img-top" alt="..."/>
  <div className="post_logos">
    {
      post.likes.includes(state._id) ?
      <i className="fas fa-heart logo" onClick={()=>{unlikePost(post._id)}}></i>
      :<i className="far fa-heart logo" onClick={()=>likePost(post._id)}></i>
    }
  </div>

  <div className="p-1">
    {
      post.likes.length >0 &&
      <p className="">{post.likes.length} likes</p>
    }
    <h5 className="">{post.title}</h5>
    <p className="">{post.body}</p>
    { post.comments.length >0 &&
    <div className="fw-light fst-italic">comments</div>
      }
 { 
 post.comments.map((comment)=>{
   return (
     <div>
   {comment.postedBy._id === state._id && <i class="fas fa-trash logo" ></i>}<span className="fw-bold">  {comment.postedBy.name}</span> <span>{comment.text}</span>
   </div>
   )
 })
 }
    <form
    onSubmit={(e)=>{
      e.preventDefault();
      // console.log(e.target[0].value); to get the value
      makeComment(e.target[0].value,post._id)
     
    }}>
    <MDBInputGroup className='mb-3'>
        <MDBInputGroupElement placeholder="add a comment" type='text' />
        <MDBBtn outline  >Post</MDBBtn>
      </MDBInputGroup>
      </form>
  </div>
</div>
</div>
          </div>
        )
      })
    }
  
     
    </Container>
  )
}

export default Home