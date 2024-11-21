// dotenv

import dotenv from "dotenv";
dotenv.config();

import express from "express"

const app = express()
const port = 3000

// middlewire

app.use(express.json())

const users = []



app.get('/', (req, res) => {
  res.send('Hello Faizan!');
})




// add new user push

app.post('/user' , (req , res) => {
  const { title } = req.body

  if(!title){
    res.status(400).json({
      message: "Title is requried"
    })
    return
  }

  users.push({
    title,
    id : Date.now()
  })

  res.status(201).json({
    message : "User is create",
    data : users,
  })

})

// get all user

app.get("/users", (req, res) => {
  res.status(200).json({
    data: users
  });
});


// Single User

app.get("/user/:id", (req , res)=>{
   const { id } = req.params;

   const index = users.findIndex((item)=>{
    return item.id === +id
   });

   if(index === -1){
    res.status(404).json({
      message: "user not found"
    })
    return
   }

   res.status(200).json({
    data: users[index]
   })

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})