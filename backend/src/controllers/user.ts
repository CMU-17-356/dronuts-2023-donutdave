import { User } from '../models/user.js'
import { Request, Response } from 'express'

const createUser = async (req: Request, res: Response) => {
  const body = req.body
  const user = new User(body);
  await user.save()
    .then(() => {
      res.status(201).send({
        success: true,
        id: user._id,
        message: 'User created',
      });
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        let errors: {[key: string]: string} = {};
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message;
        });
      
        return res.status(400).send(errors);
      };
      return res.status(500).send("Other errors");
    });
};

const getUsers = async (req: Request, res: Response) => {
  await User.find({})
    .then(users => {
      return res.status(200).json({ success: true, data: users })
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ success: false, error: err })
    });
}

export { createUser, getUsers }