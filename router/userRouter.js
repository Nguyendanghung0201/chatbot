var express = require('express');
var router = express.Router();
var UserService = require('../controller/user/user-Service');
var PageService = require('../controller/page/page-Service');
const request = require('request-promise');
const pageService = require('../controller/page/page-Service');
const Bot = require('../controller/customers/customers-service')
router.post('/create-account-fb', async (req, res) => {
  let user = req.body;
  user.user_id = '1262649734';
  try {
    if (!user.user_id || !user.fb_id || !user.access_token) {
      res.status(200).json({
        "status": false,
        "code": 1000,
        "msg": "error",
        "data": []
      })
    } else {
      let token = await handleToken(user.access_token)
      user.access_token = token.access_token;
      await UserService.createNewUser(user);
      await handleGetPageList(user.fb_id, user.access_token);
      res.status(200).json({
        "status": true,
        "code": 200,
        "msg": "success",
        "data": [user]
      })
    }
  } catch (e) {
    console.log(e)
    res.json({
      "status": false,
      "code": 700,
      "msg": "error",
      "data": []
    })
  }

})



async function handleToken(shortToken) {
  let url = `https://graph.facebook.com/v4.0/oauth/access_token?grant_type=fb_exchange_token&client_id=433249420965191&client_secret=418ebba440510c7c4c6bf73aaf7cef58&fb_exchange_token=${shortToken}`
  const options = {
    method: 'GET',
    uri: url,
  };
  let result = await request(options);
  return JSON.parse(result)
}

async function handerSubscribed_apps(page_id, access_token) {
  let url = `https://graph.facebook.com/${page_id}/subscribed_apps?subscribed_fields=messages,messaging_postbacks&access_token=${access_token}`;
  const option = {
    method: 'POST',
    uri: url,
    
  };
  let result = await request(option);
  return JSON.parse(result)
}


router.post('/subscribed_apps', async (req, res) => {
  
  let data = req.body;
  if (!data.page_id) {
    res.status(200).json({
      "status": false,
      "code": 1001,
      "msg": "error",
      "data": []
    })
  } else {
    try {
    
      let page = await pageService.getpageBypage_id(data.page_id)
      if (page) {
        await handerSubscribed_apps(data.page_id, page.access_token);
        await pageService.updatePageBypage_id(data.page_id, 1)
        res.status(200).json({
          "status": true,
          "code": 200,
          "msg": "success",
          "data": ''
        })
      } else {
        res.status(200).json({
          "status": false,
          "code": 1015,
          "msg": "error",
          "data": ''
        })
      }

    } catch (e) {
      console.log(e)
      res.status(200).json({
        "status": false,
        "code": 700,
        "msg": "error",
        "data": ''
      })
    }
  }
})

async function handleGetPageList(user_id, token) {

  let url = `https://graph.facebook.com/${user_id}/accounts?fields=picture,name,access_token&access_token=${token}`;
  const options = {
    method: 'GET',
    uri: url,
  };
  let result = await request(options);
  let pages = JSON.parse(result).data.map(e => {
    return {
      page_id: e.id,
      avt: e.picture.data.url,
      access_token: e.access_token,
      status: 2,
      name: e.name,
      user_id: user_id
    }

  });
  
  if (pages.length > 0) {
    let dataPage = await pageService.getPageByFbAccount(user_id);
    let listPageExits = dataPage.map(e => {
      return e.page_id
    });
    let newPage = pages.filter(function (e) {
      if (listPageExits.includes(e.page_id)) {
        return false
      } else {
        return true
      }
    })
    let listpageupdate = pages.map(e=>{
      return e.page_id
    })
    await pageService.updateCreateFresherAccount(listpageupdate,user_id )
    if (newPage.length > 0) {

      if (newPage.length === 1) {
        return await PageService.createPageBot(newPage[0])
      } else {
        return await PageService.createPageBot(newPage)
      }

    } else {
      return 'not have new page';
    }

  }

}
router.get('/get-list-account-fb', async (req, res) => {
  let id = '1262649734';
  if (!id) {
    res.json({
      "status": false,
      "code": 1002,
      "msg": "error",
      "data": ''
    })
  }
  let user = await UserService.getListFbAccountByMydas(id);
  res.json({
    "status": true,
    "code": 200,
    "msg": "success",
    "data": user
  })
})

router.get('/test', async (req, res) => {
  let resd = await Bot.getCustomerBySendId('116463323504860', '3064385566992160')
  res.json({
    'res': resd
  })
})


module.exports = router;