import express from 'express';
import db from '../db.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import orderModel from '../models/order.js'

import sampleData from '../sample/sampleData.js';
import 'dotenv/config.js';
import pkg from 'crypto-js';
import Base64 from 'crypto-js/enc-base64.js';

import {createLinePayClient} from 'line-pay-merchant'
import { create } from '../models/order.js';

const { HmacSHA256 } = pkg
const router = express.Router();

const {
  LINEPAY_CHANNEL_ID,
  LINEPAY_VERSION,
  LINEPAY_SITE,
  LINEPAY_CHANNEL_SECRET_KEY,
  LINEPAY_RETURN_HOST,
  LINEPAY_RETURN_CONFIRM_URL,
  LINEPAY_RETURN_CANCEL_URL,
} = process.env;

console.log(sampleData);

const linePayClient = createLinePayClient({
    channelId: process.env.LINE_PAY_CHANNEL_ID,
    channelSecretKey: process.env.LINE_PAY_CHANNEL_SECRET,
    env: process.env.NODE_ENV,
})

const orders = {};

/* 與LINE PAY Order */
router.post('/createOrder', async (req, res) => {

    //產生order id
    const orderId = uuidv4();
    const pId = uuidv4();
    const order = {
        orderId: orderId,
        currency: 'TWD',
        amount: req.body.amount,
        packages: [
            {
                id: pId,
                amount: req.body.amount,
                products: req.body.products,
            },
        ],
        options: { display: { locale: 'zh_TW'}},
    }

    //存取訂單資料
    const newOrder = await orderModel.create({
        order_id: orderId,
        amount: req.body.amount,
        order_info: JSON.stringify(order),
        status: 'pending',
        created: +new Date(),
    })

    res.json(order)

})

router.get('/checkTransaction', async (req, res) => {
    const transactionId = req.query.transactionId

    try {
        const linePayResponse = await linePayClient.checkPaymentStatus.send({
            transactionId: transactionId,
            params: {},
        })

        res.json(linePayResponse.body)
    }catch (e){
        res.json({ error: e})
    }
})

router.get('/confirm', async (req, res) => {
    const transactionId = req.query.transactionId

    //get transaction from db
    const record = await orderModel.findOne({ transaction_id: transactionId })
    console.log('L83-record', record);

    const transaction = JSON.parse(record.reservation)
    const amount = transaction.amount

    try{
        //最後確認
        const linePayResponse = await linePayClient.comfirm.send({
            transactionId: transactionId,
            body:{
                currency: 'TWD',
                amount: amount,
            },
        })

        console.log('L102-', linePayResponse);

        transaction.confirmBody = linePayResponse.body

        //status: 'pending' | 'paid' | 'cancel' | 'fail' | 'error'
        let status = 'paid';

        if(linePayResponse.body.returnCode !== '0000'){
            status = 'fail'
        }

        //update db status
        const result = await orderModel.update({
            order_id: record.order_id,
            status: status,
            return_code : linePayResponse.body.returnCode,
            confirm: JSON.stringify(linePayResponse.body),
        })

        res.json(linePayResponse.body)
    } catch(e) {
        res.json({ error: e })
    }
})

router.get('/reserve', async (req, res) => {
    const redirectUrls = {
        confirmUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CONFIRM_URL}`,
        cancelUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CANCEL_URL}`,
    }

    if (!req.query.orderId){
        throw new Error('orderId 不存在')
    }

    const orderId = req.query.orderId

    //find order from db
    const orderRecord = await orderModel.findById(orderId)

    //order_info紀錄要向line pay請求的訂單json
    const order =  JSON.parse(orderRecord.order_info)

    console.log('Order got. Detail is following.');

    try {
        const linePayResponse = await linePayClient.request.send({
            body: { ...order, redirectUrls },
        })

        const reservation = JSON.parse(JSON.stringify(order))
        reservation.returnCode = linePayResponse.body.returnCode
        reservation.returnMessage = linePayResponse.body.returnMessage
        reservation.transactionId = linePayResponse.body.info.transactionId
        reservation.paymentAccessToken = linePayResponse.body.info.paymentAccessToken

        console.log('Reservation is made. Detail is following.')
        console.log(reservation);

        const newRecord = await orderModel.update({
            order_id: orderId,
            reservation: JSON.stringify(reservation),
            transaction_id: reservation.transactionId,
        })

        console.log(newRecord);

        res.redirect(linePayResponse.body.info.paymentUrl.web)
    } catch (e){
        console.log('error', e);
    }

})

export default router