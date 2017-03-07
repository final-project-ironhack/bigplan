/*jshint esversion: 6*/
exports.createUser = (req, res, next) => {
  const newUser = new userModel({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    name: req.body.name,
    description: req.body.description
  });

  newUser.save((err, card) => {
    if(err){
      console.log(err);
      return res.send(500);
    }
  });
};

// exports.editUser = (req, res, next) => {
//
// };
