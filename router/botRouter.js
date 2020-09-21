var express = require('express');
var router = express.Router();
var BotService = require('../controller/bot/bot-service');
var BotActionService = require('../controller/bot-action/bot-action-service');
const botActionService = require('../controller/bot-action/bot-action-service');


router.post('/create-bot', async (req, res) => {
    let data = req.body;
    let user_id = '1262649734';
    let botname = data.botname;
    try {
        if (!user_id || !botname) {
            res.status(200).json({
                "status": false,
                "code": 1008,
                "msg": "error",
                "data": []
            })
        } else {
            let bot = {
                user_id,
                botname,
                botaction_id: data.botaction_id
            }
            let result = await BotService.createNewBot(bot);
            if (result === false) {
                res.status(200).json({
                    "status": false,
                    "code": 1009,
                    "msg": "error",
                    "data": []
                })
            } else {
                res.status(200).json({
                    "status": true,
                    "code": 200,
                    "msg": "success",
                    "data": result
                })
            }
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

router.get('/get-infor-bot/:id', async (req, res) => {
    let user_id = '1262649734';
    let bot_id = req.params.id;
    try {
        if (!bot_id) {
            res.status(200).json({
                "status": false,
                "code": 1010,
                "msg": "error",
                "data": []
            })
        } else {
            let bot = await BotService.getBotById(user_id, bot_id);
            if (!bot) {
                res.status(200).json({
                    "status": false,
                    "code": 1011,
                    "msg": "error",
                    "data": bot
                })
            } else {
                let action = JSON.parse(bot.botaction_id);
                if (!action) {
                    res.status(200).json({
                        "status": true,
                        "code": 200,
                        "msg": "success",
                        "data": { bot }
                    })
                } else {
                    let actionBot = await BotActionService.getBotAction(action);
                    res.status(200).json({
                        "status": true,
                        "code": 200,
                        "msg": "success",
                        "data": { bot, actionBot }
                    })
                }
            }
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
router.post('/update-bot', async (req, res) => {
    let user_id = '1262649734';
    let bot = req.body;
    let id = bot.id;
    delete bot.id;
    try {
        let result = await BotService.updateBotById(user_id, id, bot)
        res.status(200).json({
            "status": true,
            "code": 200,
            "msg": "success",
            "data": [result]
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

router.get('/list-bot', async (req, res) => {
    let user_id = '1262649734';
    try {
        let result = await BotService.getAllBotByUser(user_id);
        Promise.all(result.map(async (e) => {
            let action_id = JSON.parse(e.botaction_id)     
            let actions = await botActionService.getBotAction(action_id)
            return {
                id: e.id,
                botname: e.botname,
                botaction_id: actions,
                status : e.status
            }
        })).then(values => {
            res.status(200).json({
                "status": true,
                "code": 200,
                "msg": "success",
                "data": values
            })
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

module.exports = router;