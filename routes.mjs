import Router from 'express';

const routes = Router();

let users = [];

routes.get('/check', (req,res) => {
    return res.status(200).json("Test");
});

routes.post('/user', (req,res) => {
    const {name, age} = req.body
 
    const addUser = {
        id: users.length ? users[users.length - 1].id + 1  : 1,
        name, age   
    };

    users.push(addUser);
    return res.status(201).json(addUser);
});


routes.get('/user', (req,res) => {  
    return res.status(200).json(users)
})

routes.get('/user/:id', (req,res) => {
    const currentUser = users.find((user) => user.id === parseInt(req.params.id))

    if (!currentUser){
        res.res.status(404).json("user does not exist")
    }

    return res.status(200).json(currentUser)
})

routes.delete('/user/:id', (req,res) => {
    const index = users.findIndex((user) => user.id === parseInt(req.params.id))

    if (index === -1){
        res.status(404).json("user not exist")
    }

    users.splice(0, index)

    return res.status(200).json('user successfully deleted')
})  


routes.post('/user/:id', (req,res) => {
    const {age, name} = req.body
    const index = users.findIndex((user) => user.id === parseInt(req.params.id))

    if (index === -1){
        res.send("user not exist")
    }

    const updatedUser = {
        id: users[index].id,    
        age,
        name,
    }

    users[index] = updatedUser

    return res.status(200).json(updatedUser)
})  

export default routes;''