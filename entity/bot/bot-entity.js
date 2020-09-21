let table = 'bots';
let field = [];
module.exports = {
    createNewBot: async (bot) => {
        return global.db(table).insert(bot)
    },
    getBotNameByUser: async (bot) => {
        return global.db.select().table(table).where('user_id', bot.user_id).andWhere('botname', bot.botname).andWhere('status', '>', 0).first()
    },
    deleteBotByUser: async (user_id, bot) => {
        return global.db(table).where('user_id', user_id).andWhere('id', bot).del()
    },
    getBotById: async (user_id, bot_id) => {
        return global.db.select('id', 'botname', 'botaction_id').table(table).where('user_id', user_id).andWhere('id', bot_id).andWhere('status', '>', 0).first()
    },
    updateBotById: async (user_id, bot_id, bot) => {
        return global.db(table).where('user_id', user_id).andWhere('id', bot_id).update(bot)
    },
    getAllBotByUser: async (user_id) => {
        return global.db(table).select('id', 'botname', 'botaction_id', 'status').where('user_id', user_id).andWhere('status', '>', 0)
    }
}