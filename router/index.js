var express = require('express');
var router = express.Router();
var UserService = require('../controller/user/user-Service');
var BotService = require('../controller/bot/bot-service');
var PageService = require('../controller/page/page-Service');
const request = require('request-promise');
const pageService = require('../controller/page/page-Service');


router.post('/login/facebook', async (req, res) => {
  let user = req.body;
  if (user.fb_id) {
    await UserService.createNewUser(user)
    res.status(200).json({ result: 'ok' })
  } else {
    res.json({ result: 'data not exit' })
  }
})

router.post('/get-long-token', (req, res) => {
  //  get long live access_token
  let shortToken = req.body.token;
  let url = `https://graph.facebook.com/v4.0/oauth/access_token?grant_type=fb_exchange_token&client_id=433249420965191&client_secret=418ebba440510c7c4c6bf73aaf7cef58&fb_exchange_token=${shortToken}`
  const options = {
    method: 'GET',
    uri: url,
  };
  request(options)
    .then(fbRes => {
      const parsedRes = JSON.parse(fbRes)
     
      res.json(parsedRes);
    })
})




module.exports = router;