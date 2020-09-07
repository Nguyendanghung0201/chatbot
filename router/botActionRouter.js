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
            "code": 680,
            "msg": "error",
            "data": []
        })
    }

})

router.post('/create-bot-action', async (req, res) => {
    let user_id = '1262649734';
    let action = req.body;
    try {
        if (action.receive) {
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
                "code": 682,
                "msg": "error",
                "data": []
            })
        }

    } catch (e) {
        res.status(200).json({
            "status": false,
            "code": 681,
            "msg": "error",
            "data": []
        })
    }
})

router.get('/delete-bot-action/:id', async (req, res) => {
    let user_id = '1262649734';
    let id = req.params.id;
    try {
        if (id) {
            let result = await BotActionService.deleteBotActionById(user_id, id);
            res.status(200).json({
                "status": true,
                "code": 200,
                "msg": "success",
                "data": result
            })
        } else {
            res.status(200).json({
                "status": false,
                "code": 681,
                "msg": "error",
                "data": []
            })
        }


    } catch (e) {
        res.status(200).json({
            "status": false,
            "code": 682,
            "msg": "error",
            "data": []
        })
    }
})

router.post('/update-bot-action', async (req, res) => {
    let user_id = '1262649734';
    let data = req.body;
    try {
        if (data.id) {
            let result = await BotActionService.updateBotActionById(user_id, data.id, data.action);
            res.status(200).json({
                "status": true,
                "code": 200,
                "msg": "success",
                "data": result
            })
        } else {
            res.status(200).json({
                "status": false,
                "code": 681,
                "msg": "error",
                "data": []
            })
        }

    } catch (e) {
        res.status(200).json({
            "status": false,
            "code": 682,
            "msg": "error",
            "data": []
        })
    }
})
module.exports = router;