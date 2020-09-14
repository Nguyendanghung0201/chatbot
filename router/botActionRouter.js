var express = require('express');
var router = express.Router();
var BotActionService = require('../controller/bot-action/bot-action-service');
const botActionService = require('../controller/bot-action/bot-action-service');

router.get('/get-list-action', async (req, res) => {
    let user_id = '1262649734';
    try {
        let result = await BotActionService.getBotActionByUser(user_id);
        res.status(200).json({
            "status": true,
            "code": 200,
            "msg": "success",
            "data": result
        })
    } catch (e) {
        res.status(200).json({
            "status": false,
            "code": 700,
            "msg": "error",
            "data": []
        })
    }

})

router.get('/get-action/:id', async (req, res) => {
    let user_id = '1262649734';
    let botaction_id = req.params.id;
    try {
        let result = await BotActionService.getactionPosbackById(botaction_id);
        res.status(200).json({
            "status": true,
            "code": 200,
            "msg": "success",
            "data": result
        })
    } catch (e) {
        res.status(200).json({
            "status": false,
            "code": 700,
            "msg": "error",
            "data": []
        })
    }
})

router.post('/create-bot-action', async (req, res) => {
    let user_id = '1262649734';
    let action = req.body;
    action.user_id = user_id;
    try {
        if (action.type) {
            let result = await BotActionService.createBotAction(action)
            res.status(200).json({
                "status": true,
                "code": 200,
                "msg": "success",
                "data": result
            })
        } else {
            res.status(200).json({
                "status": false,
                "code": 1012,
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


router.post('/update-bot-action', async (req, res) => {
    let user_id = '1262649734';
    let data = req.body;
    let id = data.id;
    delete data.id ;
    try {
        if (id) {
            let result = await BotActionService.updateBotActionById(user_id, id, data);
            res.status(200).json({
                "status": true,
                "code": 200,
                "msg": "success",
                "data": result
            })
        } else {
            res.status(200).json({
                "status": false,
                "code": 1013,
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
module.exports = router;