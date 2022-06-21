const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
  const { email, password, phone_number } = req.body;

  User.find({ phone_number: phone_number })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res
          .status(409)
          .json({ status: false, message: 'Phone Number, already in use.' });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              err: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              phone_number: phone_number,
              email: email,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  status: true,
                  message: 'User created',
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  const { phone_number, password } = req.body;

  User.findOne({ phone_number: phone_number })
    .exec()
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ status: false, message: 'User not found' });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: 'Auth failed' });
        }

        if (result) {
          const token = jwt.sign(
            { phone_number: user.phone_number, user_id: user._id },
            'secret',
            {
              expiresIn: '1h',
            }
          );
          return res
            .status(200)
            .json({ status: true, message: 'Auth Successful', token: token });
        }

        return res.status(401).json({ status: false, message: 'Auth failed' });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_delete = (req, res, next) => {
  const { userId } = req.params;

  User.deleteOne({ _id: userId })
    .exec()
    .then((response) => {
      console.log(response);
      res.status(200).json({
        message: 'User deleted',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
