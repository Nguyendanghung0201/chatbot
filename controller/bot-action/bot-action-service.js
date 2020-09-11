const BotActionModel = require('../../entity/bot-action/bot-action-entity');

const getBotAction = async (action) => {
    return await BotActionModel.getBotAction(action)
}

const getBotActionToRep = async (action, receive) => {
    return await BotActionModel.getBotActionToRep(action,receive)
}

const createBotAction = async (action) => {
    return await BotActionModel.createBotAction(action)
}

const getBotActionByUser = async (user_id) => {
    return await BotActionModel.getBotActionByUser(user_id)
}

const updateBotActionById = async (user_id, id, action) => {
    return await BotActionModel.updateBotActionById(user_id, id, action)
}
const deleteBotActionById = async (user_id, id) => {
    return await BotActionModel.deleteActionById(user_id, id)
}

const getactionPosbackById =async (id)=>{
    return await BotActionModel.getactionPosbackById(id)
}


module.exports = {
    getBotAction: getBotAction,
    createBotAction: createBotAction,
    getBotActionByUser: getBotActionByUser,
    updateBotActionById: updateBotActionById,
    deleteBotActionById: deleteBotActionById,
    getBotActionToRep: getBotActionToRep ,
    getactionPosbackById : getactionPosbackById
}
