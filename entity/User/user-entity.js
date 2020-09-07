let table = 'users';

module.exports = {
    getAllUser: async () => {
        return global.db.select().table(table)
    },
     
    getUserById: async (id) => {
        return global.db.select().table(table).where('fb_id', id).first()
    }
    ,
    getListFbAccountByMydas : async (id)=>{
        return global.db.select().table(table).where('user_id', id)
    }
    ,
    CreateNewUser: async (user) => {
        return  global.db(table).insert(user);
    },
    UpdateTokenUser: async (token, id) => {
        return global.db(table).where('fb_id', id).update('access_token', token)
    },
}