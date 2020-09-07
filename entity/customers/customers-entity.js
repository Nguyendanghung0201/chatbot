let table = 'customers';
let fields = ['page_id', 'id', 'gender', 'name', 'avatar']
module.exports = {
    createNewCustomers: async (customers) => {
        return global.db(table).insert(customers)
    },
    getCustomerBySendId: async (page_id, send_id) => {
        return global.db(table).select(fields).where('page_id', page_id).andWhere('send_id', send_id).first();
    },

    getCustomersByPageId: async (page_id) => {
        return global.db(table).select(fields).where('page_id', page_id)
    },

    deleteCustomersById: async (page_id, send_id) => {
        return global.db(table).where('page_id', page_id).andWhere('send_id', send_id).del()
    }
}