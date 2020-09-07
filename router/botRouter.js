var express = require('express');
var router = express.Router();
var BotService = require('../controller/bot/bot-service');
var BotActionService = require('../controller/bot-action/bot-action-service');


router.post('/create-bot', async (req, res) => {
    let data = req.body;
    let user_id = '1262649734';
    let botname = data.botname;
    try {
        if (!user_id || !botname) {
            res.status(200).json({
                "status": false,
                "code": 660,
                "msg": "error",
                "data": []
            })
        } else {
            let bot = {
                user_id,
                botname
            }
            let result = await BotService.createNewBot(bot);
            if (result === false) {
                res.status(200).json({
                    "status": false,
                    "code": 661,
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
            "code": 664,
            "msg": "error",
            "data": []
        })
    }

})

router.get('/delete-bot/:id', async (req, res) => {
    let user_id = "1262649734";
    let bot = req.params.id;
    try {
        if (!bot) {
            res.status(200).json({
                "status": false,
                "code": 663,
                "msg": "error",
                "data": []
            })
        } else {
            let result = await BotService.deleteBotByUser(user_id, bot)
            res.status(200).json({
                "status": true,
                "code": 200,
                "msg": "success",
                "data": [result]
            })
        }

    } catch (e) {
        console.log(e)
        res.status(200).json({
            "status": false,
            "code": 404,
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
                "code": 663,
                "msg": "error",
                "data": []
            })
        } else {
            let bot = await BotService.getBotById(user_id, bot_id);
            if (!bot) {
                res.status(200).json({
                    "status": false,
                    "code": 664,
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
                        "data": bot
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
        console.log(e)
        res.status(200).json({
            "status": false,
            "code": 665,
            "msg": "error",
            "data": []
        })
    }
})
router.post('/update-bot', async (req, res) => {
    let user_id = '1262649734';
    let bot = req.body;
    try {
        let result = await BotService.updateBotById(user_id, bot.id, bot.infor)
        res.status(200).json({
            "status": true,
            "code": 200,
            "msg": "success",
            "data": [result]
        })
    } catch (e) {
        res.status(200).json({
            "status": false,
            "code": 666,
            "msg": "error",
            "data": []
        })
    }

})

router.get('/list-bot', async(req, res)=>{
    let user_id = '1262649734';
    try{
        let result = await BotService.getAllBotByUser(user_id);
        res.status(200).json({
            "status": true,
            "code": 200,
            "msg": "success",
            "data": result
        })

    }catch(e){
        res.status(200).json({
            "status": false,
            "code": 666,
            "msg": "error",
            "data": []
        })
    }
})

module.exports = router;