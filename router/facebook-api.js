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
    res.status(200).send('EVENT_RECEIVED');
    // Iterates over each entry - there may be multiple if batched
    if (body.entry[0].messaging[0].message) {
      let PageId = body.entry[0].id;
      let content = body.entry[0].messaging[0].message.text;
      let senderId = body.entry[0].messaging[0].sender.id;

      // get bots from page id
      let bots = await BotPageService.getListBotReplyByPage_id(PageId);
      let sender = await customersService.getCustomerBySendId(PageId, senderId);
      var infor;
      if (!sender) {
        let customers = await getInforCustomers(PageId, senderId);
        let customer = {
          page_id: PageId,
          send_id: senderId,
          gender: customers.gender ? customers.gender : '',
          name: customers.last_name,
          full_name: customers.name,
          avatar: customers.profile_pic,
        }
        infor = customers;
        await customerService.CreateNewCustomers(customer)
      } else {
        infor = sender
      }

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
          reply(senderId, message, bots[0].access_token, infor)
        }

      }
      // insert new customer when contact page


    } else if (body.entry[0].messaging[0].postback) {
      let PageId = body.entry[0].id;
      let senderId = body.entry[0].messaging[0].sender.id;

      let id_action = body.entry[0].messaging[0].postback.payload;
      let action = await botActionService.getactionPosbackById(id_action);
      let page = await pageService.getPageByid(PageId);
      let sender = await customersService.getCustomerBySendId(PageId, senderId);
      if (action && page) {
        reply(senderId, action, page.access_token, sender)
      }

      // send postback
    }

    // Returns a '200 OK' response to all requests

  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

function reply(senderId, message, access_token, infor) {
  var reply;
  var arrayOptions;
  var buttons;
  switch (message.type) {
    // type text
    case 'text':
      reply = {
        'text': message.reply.replace('{{name}}', infor.name).replace('{{full_name}}', infor.full_name).replace('{{gender}}', infor.gender == 'male' ? 'anh' : 'chị')
      }
      break
    // type quick
    case 'quick':
      buttons = JSON.parse(message.buttons)
      arrayOptions = buttons.map(e => {
        return {
          "content_type": e.text,
          "title": e.title,
          "payload": e.payload,
        }
      })
      reply = {
        "text": message.title.replace('{{name}}', infor.name).replace('{{full_name}}', infor.name).replace('{{gender}}', infor.gender == 'male' ? 'anh' : 'chị'),
        "quick_replies": arrayOptions
      }
      break

    case 'generic':
      buttons = JSON.parse(message.buttons)
      arrayOptions = buttons.map(e => {
        if (e.type === 'postback') {
          return {
            "type": e.type,
            "title": e.title,
            "payload": e.payload,
          }
        } else {
          return {
            "type": e.type,
            "title": e.title,
            "url": e.url,
          }
        }

      })

      reply = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": message.title.replace('{{name}}', infor.name).replace('{{full_name}}', infor.name).replace('{{gender}}', infor.gender == 'male' ? 'anh' : 'chị'),
              "subtitle": message.subtitle,
              "image_url": message.images,
              "buttons": arrayOptions
            }]
          }
        }
      }
      break;
  }
  sendMessage(senderId, reply, access_token)
}


// send message 
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
// get infor customers for new contact
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


router.get('/test', (req, res) => {

  let mess = {
    "text": "Pick a color:",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "Red",
        "payload": "<POSTBACK_PAYLOAD>",
        "image_url": "http://example.com/img/red.png"
      }, {
        "content_type": "text",
        "title": "Green",
        "payload": "<POSTBACK_PAYLOAD>",
        "image_url": "http://example.com/img/green.png"
      },
      {
        "content_type": "text",
        "title": "white",
        "payload": "<POSTBACK_PAYLOAD>",
        "image_url": "http://example.com/img/red.png"
      }, {
        "content_type": "text",
        "title": "Black",
        "payload": "<POSTBACK_PAYLOAD>",
        "image_url": "http://example.com/img/green.png"
      }
    ]
  }

  sendMessage('3231693413595497', mess, 'EAAGKCb3V9UcBAF8vM2LmaiMExKq0Od6ypnvXHabZBlvP1AX5f1qhNecOjnRwWUFetFktH6pTzYWE5ovAebhWiA2ZCard0YwIGkdOZCxdy039ZBSoVNkiTyIy0W8tWmUp05e0yNDh0DIggr8E1NQcqcKpnGSMdeZBJrAiG4CcQcgZDZD')
  res.json({ ok: 'ok' })
})

module.exports = router;