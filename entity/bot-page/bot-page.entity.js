let table = 'chatbotpages';

module.exports = {
    getChatBotPage: async (page_id, bot_id) => {
        return global.db.select().table(table).where('page_id', page_id).andWhere('bot_id', bot_id).first();
    },
    createBotForPage: async (chatbot) => {
        return global.db(table).insert(chatbot)
    },
    getListBotReplyByPage_id: async (page_id) => {
        return global.db.select().table('page').leftJoin('chatbotpages', 'page.page_id', '=', 'chatbotpages.page_id').leftJoin('bots', 'chatbotpages.bot_id', '=', 'bots.id').where
            ('page.page_id', page_id).andWhere('chatbotpages.status', '=', 1)
    },
    getListBotByBot: async (page_id, bot_id) => {
        return global.db.select().table(table).where('page_id', page_id).whereIn('bot_id', bot_id)
    },
    updateBotByPage_id: async (page_id,bot_id) => {
      
        return global.db.table(table).where('page_id', page_id).whereNotIn('bot_id', bot_id).update('status', 0)
    },
    updatePageBot : async (page_id, bot_id) =>{
        return   global.db.table(table).where('page_id', page_id).whereIn('bot_id', bot_id).update('status', 1)
    }
    
}
