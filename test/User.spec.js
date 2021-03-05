const { expect } = require('chai')
const { spy, createSandbox } = require('sinon')
const UserController = require('../controllers/userController')
const User = require('../models/user')
describe("users controller", ()=>{
    let sandbox
    before(()=>{
        sandbox = createSandbox()
    })
    afterEach(() => sandbox.restore())

    const mockdatabase =
        {
            "specialties": [
              "backend",
              "frontend",
              "fullstack"
            ],
            "id": 1,
            "name": "root",
            "age": 23,
            "password": "$2a$10$DLSBEY8wPuqFNiJWTSxm1e5xlCYybwMHwgevQSuyO4m0IMTFakWJC",
            "nickname": "User Root",
            "email": "root@root.com",
            "birthday": "1997-07-29",
            "sex": 1,
            "createdAt": "2021-02-08T19:03:11.000Z",
            "updatedAt": "2021-02-08T19:03:11.000Z"
        }

    it("should return data on a specific format", async()=>{
        const allUsers = await User.findAll({where:{id: 1}})
        const user = allUsers[0].dataValues
        let {password, createdAt, updatedAt, specialties, id, ...result} = user
        createdAt =createdAt.toString()
        const newSpecialties = specialties.split(";").map(item=> item)
        expect(user).to.be.deep.equal(mockdatabase)
    })


})