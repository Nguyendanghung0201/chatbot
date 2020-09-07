var express = require('express');
var router = express.Router();
var BotService = require('../controller/bot/bot-service');
var PageService = require('../controller/page/page-Service');
const pageService = require('../controller/page/page-Service');
var BotPageService = require('../controller/bot-page/bot-page-service');
const customersService = require('../controller/customers/customers-service');

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
      "code": 500,
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
      "code": 404,
      "msg": "error",
      "data": []
    })
  } else {
    let result = await pageService.getPageByFbAccount(fb_id);
    res.status(200).json({
      "status": true,
      "code": 200,
      "msg": "success",
      "data": result
    })
  }
})

router.get('/get-infor-page/:id', async (req, res) => {
  let pageId = req.params.id;
  if (pageId) {
    let page = await PageService.getPageByid(pageId);
    if (page) {
      res.status(200).json({
        "status": true,
        "code": 0,
        "msg": "success",
        "data": [page]
      })
    } else {
      res.status(200).json({
        "status": false,
        "code": 404,
        "msg": "error",
        "data": []
      })
    }

  } else {
    res.status(200).json({
      "status": false,
      "code": 700,
      "msg": "error",
      "data": []
    })
  }
})


router.post('/add-page-bot', async (req, res) => {
  let body = req.body;
  let pageId = body.page_id;
  let bot_id = body.bot_id;
  let user_id = '1262649734';
  try {
    let page = await pageService.getPageByid(pageId);
    let bot = await BotService.getBotById(user_id, bot_id);
    if (page && bot) {
      let result = await BotPageService.getChatBotPage(pageId, bot_id);
      if (result) {
        //  chatbot exits on pages
        res.status(200).json({
          "status": false,
          "code": 404,
          "msg": "error",
          "data": []
        })
      } else {
        // insert into db
        let page = await BotPageService.createBotForPage(body);
        res.status(200).json({
          "status": true,
          "code": 200,
          "msg": "success",
          "data": page
        })
      }
    } else {
      res.status(200).json({
        "status": false,
        "code": 404,
        "msg": "error",
        "data": []
      })
    }
  } catch (e) {
    res.status(200).json({
      "status": false,
      "code": 404,
      "msg": "error",
      "data": []
    })
  }
})

router.post('/delete-page-bot', async (req, res) => {
  let user_id = '1262649734';
  let page_id = req.body.page_id;
  let bot_id = req.body.bot_id;
  try {
    if (page_id && bot_id) {
      let result = await BotPageService.deleteChatBotPage(page_id, bot_id)
      res.status(200).json({
        "status": true,
        "code": 200,
        "msg": "success",
        "data": result
      })
    } else {
      res.status(200).json({
        "status": false,
        "code": 404,
        "msg": "error",
        "data": []
      })
    }
  } catch (e) {
    res.status(200).json({
      "status": false,
      "code": 404,
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
        "code": 408,
        "msg": "error",
        "data": []
      })
    }
  } catch (e) {
    res.status(200).json({
      "status": false,
      "code": 406,
      "msg": "error",
      "data": []
    })
  }
})

router.post('/delete-customers', async (req, res) => {
  let user_id = '1262649734';
  let id = req.params.id;
  let page_id = req.body.page_id ;
  let sender_id = req.body.sender_id ;
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



module.exports = router;
