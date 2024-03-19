// project/server/controllers/loginController.js
const { User, TypeRole } = require('../models');

const login = async (req, res) => {
    try {
        // console.log(req.body);
        const { email, passwordUser } = req.body;
        const user = await User.findOne({
            where: {
                email: email,
                passwordUser: passwordUser
            },
            include: {
                model: TypeRole,
                attributes: ['roleName']
            }
        });
        if (user) {
            console.log(req.body);
            // ส่งข้อมูลผู้ใช้กลับไปยังไคลเอนต์
            return res.json(user);
        } else {
            return res.json("Fail");
        }
    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json("Internal Server Error");
    }
};

module.exports = { login };
