var express = require('express');
var router = express.Router();
var BotService = require('../controller/bot/bot-service');
var PageService = require('../controller/page/page-Service');
const pageService = require('../controller/page/page-Service');
var BotPageService = require('../controller/bot-page/bot-page-service');
const customersService = require('../controller/customers/customers-service');
const request = require('request-promise');
const botPageService = require('../controller/bot-page/bot-page-service');

router.get('/list-pages', async (req, res) => {
  let id = '1262649734';
  if (id) {
    let result = await pageService.getPageByMydasAccount(id)
    res.status(200).json({
      "status": true,
      "code": 200,
      "msg": "success",
      "data": [result]
    })
  } else {
    res.status(200).json({
      "status": false,
      "code": 1002,
      "msg": "error",
      "data": []
    })
  }
})

router.get('/list-pages-by-fb/:id', async (req, res) => {
  let user_id = '1262649734';
  let fb_id = req.params.id;
  if (!fb_id) {
    res.status(200).json({
      "status": false,
      "code": 1002,
      "msg": "error",
      "data": []
    })
  } else {
    let listpage = await pageService.getPageByFbAccount(fb_id);
    if(listpage){
    let infor = {
      fb_id : listpage[0].fb_id,
      username :listpage[0].username ,
      fb_avt : listpage[0].fb_avt
    }
    res.status(200).json({
      "status": true,
      "code": 200,
      "msg": "success",
      "data": {infor , listpage}
    })
  }else{
    res.status(200).json({
      "status": false,
      "code": 1020,
      "msg": "error",
      "data": ''
    })
  }
  }
})

router.get('/get-infor-page/:id', async (req, res) => {
  let pageId = req.params.id;
  if (pageId) {
    let page = await PageService.getPageByid(pageId);
    if (page) {
      res.status(200).json({
        "status": true,
        "code": 200,
        "msg": "success",
        "data": [page]
      })
    } else {
      res.status(200).json({
        "status": false,
        "code": 1004,
        "msg": "error",
        "data": []
      })
    }

  } else {
    res.status(200).json({
      "status": false,
      "code": 1003,
      "msg": "error",
      "data": []
    })
  }
})


router.post('/update-page-bot', async (req, res) => {
  let body = req.body;
  let pageId = body.page_id;
  let bot_list = body.bot_id;

  let bot_id = bot_list.split(',')

  let user_id = '1262649734';

  try {
    if (pageId) {
      let result = await BotPageService.getListBotByBot(pageId, bot_id);
      let bot = result.map(e => {
        return e.bot_id
      });

      let newBot = bot_id.filter((e) => {
        if (bot.includes(parseInt(e)) || e === '') {
          return false
        } else {
          return true
        }
      }).map(e => {
        return {
          page_id: pageId,
          bot_id: e
        }
      })
      if (newBot.length > 0) {
        await botPageService.createBotForPage(newBot)
        res.status(200).json({
          "status": true,
          "code": 200,
          "msg": "error",
          "data": [newBot]
        })
      } else {
        res.status(200).json({
          "status": true,
          "code": 200,
          "msg": "error",
          "data": []
        })
      }


    } else {
      res.status(200).json({
        "status": false,
        "code": 1006,
        "msg": "error",
        "data": []
      })
    }
  } catch (e) {
    res.status(200).json({
      "status": false,
      "code": 700,
      "msg": "error",
      "data": []
    })
  }
})


router.get('/get-list-customers/:id', async (req, res) => {
  let user_id = '1262649734';
  let page_id = req.params.id;
  try {
    if (page_id) {
      let customers = await customersService.getCustomersByPageId(page_id);
      res.status(200).json({
        "status": true,
        "code": 200,
        "msg": "success",
        "data": customers
      })
    } else {
      res.status(200).json({
        "status": false,
        "code": 1003,
        "msg": "error",
        "data": []
      })
    }
  } catch (e) {
    res.status(200).json({
      "status": false,
      "code": 700,
      "msg": "error",
      "data": []
    })
  }
})

router.post('/delete-customers', async (req, res) => {
  let user_id = '1262649734';
  let id = req.params.id;
  let page_id = req.body.page_id;
  let sender_id = req.body.sender_id;
  try {
    let customers = await customersService.deleteCustomersById(page_id, sender_id);
    res.status(200).json({
      "status": true,
      "code": 200,
      "msg": "success",
      "data": customers
    })

  } catch (e) {
    res.status(200).json({
      "status": false,
      "code": 406,
      "msg": "error",
      "data": []
    })
  }
})

router.get('/get-list-conversation/:id', async (req, res) => {
  let user_id = '1262649734';
  let page_id = req.params.id;
  try {
    let page = await PageService.getPageByid(page_id);
    let body = {
      'url': `https://graph.facebook.com/v8.0/${page_id}/conversations?fields=id,name,senders&limit=100`,
      qs: {
        'access_token': page.access_token,
      },
      method: 'GET',

    };
    // get converrsations of page
    let result = await request(body);

    let customers_Old = JSON.parse(result).data.map((e) => {
      return {
        send_id: e.senders.data[0].id,
        name: e.senders.data[0].name,
        page_id: page_id
      }
    })
    // customers_Old : customers contact to page before

    if (customers_Old.length > 0) {
      let listSender = customers_Old.map(e => {
        return e.send_id;
      })
      let listCusomer = await customersService.getCustomerByListSendId(listSender);
      if (customers_Old.length > listCusomer.length) {
        let listsender = listCusomer.map(e => {
          return e.send_id
        })
        let newCustomer = customers_Old.filter((e) => {
          if (listsender.includes(e.send_id)) {
            return false
          } else {
            return true
          }
        })
        // filter customer exit on db to insert new
        if (newCustomer.length) {
          await customersService.createListCustomer(newCustomer);
          res.json({
            "status": true,
            "code": 200,
            "msg": "success",
            "data": ''
          })
        } else {
          res.json({
            "status": true,
            "code": 200,
            "msg": "success",
            "data": ''
          })
        }
      } else {
        res.json({
          "status": true,
          "code": 200,
          "msg": "success",
          "data": ''
        })
      }
    } else {
      res.json({
        "status": true,
        "code": 200,
        "msg": "success",
        "data": ''
      })
    }
  } catch (e) {
    res.json({
      "status": false,
      "code": 700,
      "msg": "error",
      "data": ''
    })
  }
})

router.post('/send-message', async (req, res) => {
  let user_id = '1262649734';
  let content = 'hi!! test api' // req.body.content;
  let listpage = ['109203267573632']  // req.body.pages;
  let customers = await customersService.getCustomersByPage(listpage);
  // send all customers in list pages
  Promise.all(customers.map(page => {
    let body = {
      'url': `https://graph.facebook.com/v2.6/me/messages`,
      qs: {
        'access_token': page.access_token,
      },
      method: 'POST',
      json: {
        recipient: {
          id: page.send_id
        },
        message: {
          "text": content
        }
      }
    }
    return request(body)
  }))
    .then(values => {
      res.json({
        "status": true,
        "code": 200,
        "msg": "success",
        "data": values
      })
    }).catch(reason => {
      res.json({
        "status": false,
        "code": 700,
        "msg": "error",
        "data": reason
      })
    });

})

router.post('/update-page', async(req, res) => {

  let page_id = req.body.page_id;
  let status = req.body.status
  if (page_id) {
    let page = await PageService.getpageBypage_id(page_id);
    if (page) {
      await pageService.updatePageBypage_id(page_id, status)
      res.status(200).json({
        "status": true,
        "code": 200,
        "msg": "success",
        "data": ''
      })
    } else {
      res.status(200).json({
        "status": false,
        "code": 1017,
        "msg": "error",
        "data": ''
      })
    }
  } else {
    res.status(200).json({
      "status": false,
      "code": 1018,
      "msg": "error",
      "data": ''
    })
  }
})


module.exports = router;
