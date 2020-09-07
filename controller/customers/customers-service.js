const CustomersModel = require('../../entity/customers/customers-entity');

const CreateNewCustomers = async (customer) => {
    let send = await CustomersModel.getCustomerBySendId(customer.page_id, customer.send_id);
    if (!send) {
        return CustomersModel.createNewCustomers(customer)
    } else {
        return true
    }
}
const getCustomerBySendId = async (page_id, send_id) => {
    return await CustomersModel.getCustomerBySendId(page_id, send_id)
}

const getCustomersByPageId = async (page_id) => {
    return await CustomersModel.getCustomersByPageId(page_id)
}

const deleteCustomersById = async (page_id, send_id)=>{
    return await CustomersModel.deleteCustomersById(page_id, send_id)
}
module.exports = {
    CreateNewCustomers: CreateNewCustomers,
    getCustomerBySendId: getCustomerBySendId,
    getCustomersByPageId: getCustomersByPageId ,
    deleteCustomersById : deleteCustomersById
}