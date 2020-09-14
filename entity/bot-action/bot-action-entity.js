let table = 'botaction';
let field = ['id', 'nameaction', 'receive', 'title', 'subtitle', 'buttons', 'reply', 'type', 'images', 'status']

module.exports = {
   getBotAction: async (action) => {
      return global.db.select(field).table(table).whereIn('id', action)
   },
   getBotActionToRep: async (action, receive) => {
      return global.db.select(field).table(table).whereIn('id', action).andWhere('receive', receive).first()
   },
   createBotAction: async (action) => {
      return global.db(table).insert(action)
   },

   getBotActionByUser: async (user_id) => {
      return global.db.select(field).table(table).where('user_id', user_id).andWhere('status', '>', 0);
   },
   deleteActionById: async (user_id, id) => {
      return global.db(table).where('user_id', user_id).andWhere('id', id).update({ status: 0 })
   },
   deActiveActionById: async (user_id, id) => {
      return global.db(table).where('user_id', user_id).andWhere('id', id).update({ status: 2 })
   },
   reActiveActionById: async (user_id, id) => {
      return global.db(table).where('user_id', user_id).andWhere('id', id).update({ status: 1 })
   },
   updateBotActionById: async (user_id, id, action) => {
      return global.db(table).where('user_id', user_id).andWhere('id', id).update(action)
   },
   getactionPosbackById: async (id) => {
      return global.db.select(field).table(table).where('id', id).first()
   }

}