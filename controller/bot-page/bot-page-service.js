const BotPageModel = require('../../entity/bot-page/bot-page.entity');

const getChatBotPage = async (page_id, bot_id) => {
    return await BotPageModel.getChatBotPage(page_id, bot_id)
}

const createBotForPage = async (chatbot) => {
    return await BotPageModel.createBotForPage(chatbot);
}

const getListBotByBot = async (page_id, bot_id) => {
    await BotPageModel.updateBotByPage_id(page_id, bot_id)
    await BotPageModel.updatePageBot(page_id, bot_id)
    return await BotPageModel.getListBotByBot(page_id, bot_id)
}
// get list bots from page_id to reply ;
const getListBotReplyByPage_id = async (page_id) => {
    return BotPageModel.getListBotReplyByPage_id(page_id)
}


module.exports = {
    getChatBotPage: getChatBotPage,
    createBotForPage: createBotForPage,
    getListBotReplyByPage_id: getListBotReplyByPage_id,
    getListBotByBot: getListBotByBot
}