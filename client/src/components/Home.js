import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'


function Home() {
  

  const [posts,setPosts] = React.useState([])


  useEffect(()=>{
  fetch('/allposts',{
    headers:{
      "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
  }).then(res=>res.json())
  .then(data=>{
    console.log(data)
    setPosts(data.posts)
  })
},[])





  return (
    <Container className="mt-5">
      {
      posts.map(post=>{
        return(
          <div>
           
            <div className="d-flex justify-content-center mb-5" key={post._id}>
    <div className="card w-75" >
    <h3>{post.postedBy.name}</h3>
  <img src={post.photo} className="card-img-top" alt="..."/>
  <div className="post_logos">
    <div className="logo p2">
  <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>
</div>
  </div>
  <div className="p-2">
    <h5 className="">{post.title}</h5>
    <p className="">{post.body}</p>
    <h5>{post.postedBy.name}</h5>
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