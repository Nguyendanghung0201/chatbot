let table = 'page';
let fileds = ['users.fb_id', 'users.username', 'users.avt as fb_avt', 'page.page_id',
    'page.name', 'page.avt', 'page.access_token', "page.user_id", "page.status"]
module.exports = {
    getAllPage: async (id) => {
        return global.db.select().table(table)
    },

    getPageByid: async (id) => {
        return global.db.select([
            'page.name', 'page.page_id', "page.avt", 'page.status', 'page.user_id',
            'users.user_id', 'users.username',
            global.db.raw('GROUP_CONCAT(chatbotpages.bot_id) as bot_id')
        ]).table(table).leftJoin('users', 'users.fb_id', '=', 'page.user_id').leftJoin('chatbotpages', 'page.page_id', '=', 'chatbotpages.page_id', function () {
            this.on('chatbotpages.status', '>', 0)
        }).leftJoin('bots', 'bots.id', '=', 'chatbotpages.bot_id', function () {
            this.on('bots.status', '>', 0)
        }).where('page.page_id', id).groupBy('page.name', 'page.page_id')
    }
    ,
    CreateNewPage: async (page) => {
        return global.db(table).insert(page)
    },
    getPageByFbAccount: async (id) => {
        return global.db.select(['users.fb_id', 'users.username', 'users.avt as fb_avt', 'page.page_id',
            'page.name', 'page.avt', 'page.access_token', "page.user_id", "page.status",
            global.db.raw('GROUP_CONCAT(chatbotpages.bot_id) as bot_id')]).table(table).leftJoin('users', 'users.fb_id', '=', 'page.user_id').leftJoin('chatbotpages', 'page.page_id', '=', 'chatbotpages.page_id').where('page.user_id', id).groupBy('page.page_id')
    },
    getPageByMydasAccount: async (id) => {
        return global.db.select().table('users').leftJoin('page', 'users.fb_id', '=', 'page.user_id').where('users.user_id', id).andWhere('page.status', '>', 0);
    },
    getpageBypage_id: async (page_id) => {
        return global.db.select().table(table).where('page_id', page_id).first()
    },
    updatePageBypage_id: async (page_id, status) => {
        return global.db.table(table).where('page_id', page_id).update('status', status)
    },
    updatepageCreateAccountByPage_id: async (listpages, user_id) => {

        return global.db.table(table).where('user_id', user_id).whereNotIn('page_id', listpages).update('status', 0)
    },
    updatePageNewPages: async (listpages, user_id) => {
        return global.db.table(table).where('user_id', user_id).whereIn('page_id', listpages).update('status', 2)
    }
}