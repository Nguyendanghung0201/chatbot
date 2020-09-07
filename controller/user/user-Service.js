const UserModel = require('../../entity/User/user-entity')
const getUserByID = async(id)=>{
   let user =await UserModel.getUserById(id)
   return user
}

const getListFbAccountByMydas = async(id)=>{
   return await UserModel.getListFbAccountByMydas(id)
}

const getAllUser = async()=>{
 let data = await UserModel.getAllUser()
 return data;
}
const LoginByFaceBook = async(access_token, profile)=>{     
     let user = await  UserModel.getUserById(profile.id);
     if(!user){
        let userNew = {
            fb_id: profile.id,
            avt: profile.photos[0].value,
            username: profile.displayName,
            access_token: access_token
          }
  
        await UserModel.CreateNewUser(userNew)
     }else{
        await UserModel.UpdateTokenUser(access_token, profile.id)
     }
}

const createNewUser = async (user)=>{
   let data = await  UserModel.getUserById(user.fb_id);
   if(!data){
      return  await UserModel.CreateNewUser(user);
   }
  
}

module.exports = {
    getUserByID : getUserByID,
    getAllUser : getAllUser,
    LoginByFaceBook : LoginByFaceBook,
    createNewUser : createNewUser,
    getListFbAccountByMydas : getListFbAccountByMydas
}