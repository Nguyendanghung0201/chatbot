let table = 'botaction';

module.exports = {
   getBotAction : async (action)=>{
      return global.db.select().table(table).whereIn('id', action)
   },
   getBotActionToRep : async (action, receive)=>{
      return global.db.select().table(table).whereIn('id', action).andWhere('receive' ,receive ).first()
   },
   createBotAction : async (action)=>{
      return global.db(table).insert(action)
   },
   
   getBotActionByUser : async (user_id)=>{
      return global.db.select().table(table).where('user_id', user_id);
   },
   deleteActionById : async (user_id, id)=>{
      return global.db(table).where('user_id', user_id).andWhere('id', id).del()
   },
   updateBotActionById : async (user_id , id , action)=>{
      return global.db(table).where('user_id', user_id).andWhere('id', id).update(action)
   },
   getactionPosbackById : async (id)=>{
      return global.db(table).where('id', id).first()
   }

}