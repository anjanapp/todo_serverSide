const db = require('./db')

const jwt = require('jsonwebtoken')


const register = (username, uid, password) => {

  return db.Consumer.findOne({
    uid
  }).then(consumer => {
    console.log(consumer);
    if (consumer) {
      return {
        status: false,
        message: "Already registered...please Log In",
        statusCode: 401
      }

    }
    else {
      const newUser = new db.Consumer({
        uid,
        username,
        password,
        todos: []


      })
      newUser.save()
      return {
        status: true,
        message: "registered successfully",
        statusCode: 200

      }

    }

  })

}

const login = (uid, pswd) => {

  return db.Consumer.findOne({
    uid,
    password: pswd
  }).then(consumer => {
    if (consumer) {
      console.log(consumer);

      currentUser = consumer.username
      currentUid = uid
      token = jwt.sign({
        currentUid: uid
      }, 'supersecretkey12345')

      return {
        status: true,
        message: "Log In successfully",
        statusCode: 200,
        currentUser,
        currentUid,
        token

      }

    }
    else {
      return {
        status: false,
        message: "invalid account number or password!!!",
        statusCode: 401
      }
    }
  })
}

const addTodo = (req, uid, title, description) => {

  return db.Consumer.findOne({
    uid
  }).then(consumer => {
    if (consumer) {
      if (uid != req.currentUid) {
        return {
          status: false,
          message: "permission denied",
          statusCode: 401
        }
      }
      consumer.todos.push({
        title: title,
        description: description
      })
      consumer.save()

      console.log(db);
      return {
        status: true,
        message: "event added",
        statusCode: 200

      }

    }
    else {
      return {
        status: false,
        message: "invalid account number or password!!!",
        statusCode: 401
      }

    }
  })

}

const getTodo = (uid) => {
  return db.Consumer.findOne({
    uid
  }).then(consumer => {
    if (consumer) {
      return {
        status: true,
        statusCode: 200,
        todos: consumer.todos

      }
    }
    else {
      return {
        status: false,
        message: "user does not exist",
        statusCode: 401
      }

    }

  })

}


module.exports = {
  register,
  login,
  addTodo,
  getTodo
}
