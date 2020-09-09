var express = require('express');
const request = require('request-promise');
const BotService = require('../controller/bot/bot-service');
const BotPageService = require('../controller/bot-page/bot-page-service')
const botActionService = require('../controller/bot-action/bot-action-service');
var router = express.Router();
const customerService = require('../controller/customers/customers-service');
const pageService = require('../controller/page/page-Service');
const customersService = require('../controller/customers/customers-service');
router.get('/webhook', (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "EAAh8BtLFPpUBAMpJb9mjOHK2AqfexPZC7cUa8EEI64FdE3ozRC4Dm5ahcSu6E9lt8piZBrN8OVfZBde7eQMqBrGi0OoAJSjA2z5MHXC83tdIAPSb0YIYWcRLkNIovYJLMacHngEy4YrIhyFyfPHMKNeV3ZCfSF4MNoVk9EvIxZA49pTZCi6Dm4nna4Fgc0BHwZD"
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
router.post('/webhook', async (req, res) => {
  let body = req.body;
  // Checks this is an event from a page subscription
  if (body.object === 'page') {
    // Iterates over each entry - there may be multiple if batched
    if (body.entry[0].messaging[0].message) {
      console.log('tin nhắn đến')
      let PageId = body.entry[0].id;
      let content = body.entry[0].messaging[0].message.text;
      let senderId = body.entry[0].messaging[0].sender.id;
      // get bots from page id
      let bots = await BotPageService.getListBotReplyByPage_id(PageId);

      if (bots[0]) {
        // page have bot with chattings
        let replys = [];
        bots.forEach(e => {
          replys = replys.concat(JSON.parse(e.botaction_id))
        })
        // get message chatting from content receive 
        let message = await botActionService.getBotActionToRep(replys, content)
        if (message) {
          // reply
          reply(senderId, message, bots[0].access_token)
        }

      }
      console.log(PageId)
      console.log(senderId)
      let sender = await customersService.getCustomerBySendId(PageId, senderId);
      console.log(sender)
      if (!sender) {
        let customers = await getInforCustomers(PageId, senderId);
        let customer = {
          page_id: PageId,
          send_id: senderId,
          gender: customers.gender ? customers.gender : '',
          name: customers.name,
          avatar: customers.profile_pic,
        }
        await customerService.CreateNewCustomers(customer)
      }

    } else if (body.entry[0].messaging[0].postback) {
      // send postback
    }

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

function reply(senderId, message, access_token) {
  var reply;
  var arrayOptions;
  switch (message.type) {
    case 'text':
      reply = {
        'text': message.reply
      }
      break
    case 'quick':
      arrayOptions = message.buttons.split(",").map(e => {
        return {
          "content_type": "text",
          "title": e,
          "payload": "xxx",
        }
      })
      reply = {
        "text": message.title,
        "quick_replies": arrayOptions
      }
      break
    case 'template':
      arrayOptions = message.buttons.split(",").map(e => {
        return {
          "type": "postback",
          "title": e,
          "payload": e,
        }
      })

      reply = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": message.title,
              "subtitle": message.subtitle,
              "image_url": message.images,
              "buttons": arrayOptions
            }]
          }
        }
      }
      break
  }
  sendMessage(senderId, reply, access_token)
}
function sendMessage(senderId, message, page_token) {
  let body = {
    'url': 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      'access_token': page_token,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: message
    }
  };

  request(body, (err, res, body) => {
    if (!err) {
      console.log(!err)
    }
  })
}
async function getInforCustomers(page_id, send_id) {
  let page = await pageService.getPageByid(page_id);
  if (page) {
    let url = `https://graph.facebook.com/${send_id}?fields=first_name,gender,name,last_name,profile_pic&access_token=${page.access_token}`;
    const option = {
      method: 'GET',
      uri: url,
    };
    let result = await request(option);
    return JSON.parse(result)
  }

}

router.post('/send-all-customers', async(req, res)=>{
  let user_id = '1262649734';
  let page_id = req.body.page_id ;
  let content = req.body.content ;


})




module.exports = router;