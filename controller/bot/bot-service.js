const BotModel = require('../../entity/bot/bot-entity');

const createNewBot = async (bot) => {
    let data = await BotModel.getBotNameByUser(bot);
    if (!data) {
        return await BotModel.createNewBot(bot)
    } else {
        return false
    }
}


const deleteBotByUser = async (user_id, bot) => {
    return await BotModel.deleteBotByUser(user_id, bot)
}

const getBotById = async (user_id, bot_id) => {
      return await BotModel.getBotById(user_id, bot_id)
}
const updateBotById = async (user_id, bot_id , bot)=>{
    return await BotModel.updateBotById(user_id, bot_id , bot)
}

const getAllBotByUser = async (user_id)=>{
      return await BotModel.getAllBotByUser(user_id)
}
module.exports = {
    createNewBot: createNewBot,
    deleteBotByUser: deleteBotByUser,
    getBotById: getBotById ,
    updateBotById : updateBotById ,
    getAllBotByUser : getAllBotByUser
}