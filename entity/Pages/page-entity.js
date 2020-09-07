let table = 'page' ;
module.exports  = {
    getAllPage : async (id)=>{
        return global.db.select().table(table)
    },

    getPageByid : async (id)=>{
        return global.db.select().table(table).where('page_id', id).first()
    }
    ,
    CreateNewPage : async (page)=>{
        return global.db(table).insert(page)
    },
    getPageByFbAccount : async (id)=>{
        return global.db.select().table(table).where('user_id', id)
    },
    getPageByMydasAccount : async (id)=>{
        return global.db.select().table('users').leftJoin('page', 'users.fb_id','=','page.user_id').where('users.user_id', id)
    }
}