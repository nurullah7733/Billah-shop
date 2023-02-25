const bcrypt = require("bcrypt");
const createToken = require("../../utils/createToken");
const generateRefreshToken = require("../../utils/refreshToken");

const adminLoginService = async (Request, Response, DataModel) => {
  let email = Request.body.email;
  let enteredPassword = Request.body.password;
  try {
    let data = await DataModel.aggregate([
      { $match: { email: email, role: "admin" } },
    ]);

    let token;
    let refreshToken;
    if (data.length > 0) {
      let encrypt = await bcrypt.compare(enteredPassword, data[0].password);
      if (encrypt) {
        if (data.length > 0) {
          token = await createToken(data[0].email, data[0]._id);
          refreshToken = await generateRefreshToken(data[0].email);
          await DataModel.updateOne(
            { email: email },
            { refreshToken: refreshToken }
          );
        }

        Response.cookie("refreshToken", refreshToken, {
          maxAge: 2.592e8,
          httpOnly: true,
        });

        return {
          status: "success",
          data: {
            firstName: data[0].firstName,
            lastName: data[0].lastName,
            email: data[0].email,
            mobile: data[0].mobile,
            photo: data[0].photo,
          },
          token,
        };
      } else {
        return {
          status: "Invalid Credentials",
          data: "invalid email or password",
        };
      }
    } else {
      return {
        status: "Invalid Credentials or Your are not an admin",
        data: "invalid email or password",
      };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = adminLoginService;
