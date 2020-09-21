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

const getpageBypage_id = async (page_id) => {
    return await PageModels.getpageBypage_id(page_id)
}

const updatePageBypage_id = async (page_id, status) => {
    return await PageModels.updatePageBypage_id(page_id, status)
}

const updateCreateFresherAccount = async (listpages, user_id) => {
    await PageModels.updatepageCreateAccountByPage_id(listpages, user_id)
    return await PageModels.updatePageNewPages(listpages, user_id)
}
module.exports = {
    createPageBot: createPageBot,
    getPageByid: getPageByid,
    getPageByFbAccount: getPageByFbAccount,
    getPageByMydasAccount: getPageByMydasAccount,
    getpageBypage_id: getpageBypage_id,
    updatePageBypage_id: updatePageBypage_id,
    updateCreateFresherAccount: updateCreateFresherAccount
}