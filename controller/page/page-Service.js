const PageModels = require('../../entity/Pages/page-entity')
const createPageBot = async (page) => {

    await PageModels.CreateNewPage(page)
}
const getPageByid = async (id) => {
    return await PageModels.getPageByid(id)
}

const getPageByFbAccount = async (id) => {
    return await PageModels.getPageByFbAccount(id)
}
const getPageByMydasAccount = async (id) => {
    return await PageModels.getPageByMydasAccount(id)
}
module.exports = {
    createPageBot: createPageBot,
    getPageByid: getPageByid,
    getPageByFbAccount: getPageByFbAccount,
    getPageByMydasAccount: getPageByMydasAccount
}