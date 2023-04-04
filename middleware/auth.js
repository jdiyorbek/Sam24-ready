// const AdminModel = require("../models/admin");

// module.exports = async (req, res, next) => {
//   const adminData = await AdminModel.findOne();
//   console.log(adminData);
//   if (req.session.userID == adminData._id) {
//     res.locals.Auth = true;
//     next();
//   }
//   next();
// };
