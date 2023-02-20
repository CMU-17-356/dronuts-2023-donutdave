import { User } from '../models/user.js'
import { Request, Response } from 'express'

const getUsers = async (req: Request, res: Response) => {
  await User.find({})
    .then(users => {
      return res.status(200).json(users)
    })
    .catch(err => {
      console.log("getUsers: " + err)
      return res.status(500).json(err)
    });
}

const createUser = async (req: Request, res: Response) => {
  const body = req.body
  
  // validate username uniqueness
  let u = await User.findOne({username: body.username})
  if (u) return res.status(400).send("Username already exists")
    
  const user = new User(body)
  await user.save()
    .then(() => {
      res.status(201).send("User created successfully");
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        let errors: {[key: string]: string} = {}
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message
        });
      
        return res.status(400).json(errors)
      };
      console.log("createUser: " + err)
      return res.status(500).send("Other errors")
    });
};

const getUserByUsername = async (req: Request, res: Response) => {
  await User.findOne({username: req.params.username})
    .then(user => {
      if (user) {
        return res.status(200).json(user)
      }
      return res.status(500).send("User not found")
    })
    .catch(err => {
      console.log("getUserByUsername: " + err)
      return res.status(500).send(err)
    });
};

const deleteUserByUsername = async (req: Request, res: Response) => {
  await User.deleteOne({username: req.params.username})
    .then((result) => {
      if (result.deletedCount > 0) {
        return res.status(200).send("User deleted")
      } else {
        return res.status(200).send("User not found")
      };
    })
    .catch(err => {
      console.log("deleteUserByUsername: " + err)
      return res.status(500).send(err)
    });
};

export { getUsers, createUser, getUserByUsername, deleteUserByUsername }