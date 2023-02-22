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
  if (u) return res.status(400).json(`Username ${body.username} already existed`)
    
  const user = new User(body)
  await user.save()
    .then(() => {
      res.status(201).json(`User ${body.username} created successfully`);
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
      return res.status(500).json("Other errors")
    });
};

const getUserByUsername = async (req: Request, res: Response) => {
  let name = req.params.username
  await User.findOne({username: name})
    .then(user => {
      if (user) {
        return res.status(200).json(user)
      }
      return res.status(404).json(`User ${name} not found`)
    })
    .catch(err => {
      console.log("getUser: " + err)
      return res.status(500).json(err)
    });
};

const updateUserByUsername = async (req: Request, res: Response) => {
  if (req.body.username) {
    // validate username uniqueness
    let u = await User.findOne({username: req.body.username})
    if (u) return res.status(400).json(`Username ${req.body.username} already existed`)
  }
  
  let name = req.params.username
  let result = await User.findOneAndUpdate({username: req.params.username}, req.body)
    .catch(err => {
      console.log("updateUser: " + err)
      return res.status(500).json(err)
    });
    
    if (result) {
      return res.status(201).json(`User ${name} updated successfully`);
    } else {
      return res.status(404).json(`User ${name} not found`)
    }
};

const deleteUserByUsername = async (req: Request, res: Response) => {
  let name = req.params.username
  await User.deleteOne({username: req.params.username})
    .then((result) => {
      if (result.deletedCount > 0) {
        return res.status(200).json(`User ${name} deleted`)
      } else {
        return res.status(404).json("User not found")
      };
    })
    .catch(err => {
      console.log("deleteUser: " + err)
      return res.status(500).json(err)
    });
};

export { getUsers, createUser, getUserByUsername, updateUserByUsername, deleteUserByUsername }