const CustomersModel = require('../../entity/customers/customers-entity');

const CreateNewCustomers = async (customer) => {
    let send = await CustomersModel.getCustomerBySendId(customer.page_id, customer.send_id);
    if (!send) {
        return CustomersModel.createNewCustomers(customer)
    } else {
        return true
    }
}
const getCustomerBySendId = async (page_id, send_) => {
    return await CustomersModel.getCustomerBySendId(page_id, send_)
}

module.exports = {
    CreateNewCustomers: CreateNewCustomers,
    getCustomerBySendId: getCustomerBySendId
}