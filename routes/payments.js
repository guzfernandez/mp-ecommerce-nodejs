var router = require('express').Router();
var MyRequests = require('../MyRequests');
var mercadopago = require('mercadopago')

mercadopago.configure({
    access_token: process.env.MP_TOKEN,
    integrator_id: process.env.INTEGRATOR_ID
});

router.post('/new_payment', async function(req, res) {
    var imgUrl = process.env.IMG_URL + (req.body.img_url.replace('./assets/', ''))
    var item = {
        id: '1234',
        title: req.body.title,
        description: 'Dispositivo móvil de Tienda e-commerce',
        picture_url: imgUrl,
        quantity: 1,
        unit_price: Number(req.body.price)
    }

    var preference = generatePreference(item);
    console.log(preference);

    /*mercadopago.configurations.setAccessToken(process.env.MP_TOKEN);
    mercadopago.configurations.setIntegratorId(process.env.INTEGRATOR_ID)*/

    /*mercadopago.preferences.create(preference)
    .then(function(response){
        console.log(JSON.stringify(response));
        return res.redirect(response.body.init_point)
    }).catch(function(error){
        console.error(error);
        return res.json({success: false})
    });*/

    MyRequests.newMercadoPagoPreference(preference, function(error, result){
        if(error){
            console.error(error);
            return res.json({success: false})
        }
        console.log(result);
        return res.redirect(result.init_point)
    })
});

router.get('/payment_success', async function(req, res) {
    console.log("---SUCCESS---");
    console.log(req.query);
    res.render('payment_success', req.query);
});

router.get('/payment_pending', async function(req, res) {
    console.log("---PENDING---");
    console.log(req.query);
    res.render('payment_pending', req.query);
});

router.get('/payment_error', async function(req, res) {
    console.log("---ERROR---");
    console.log(req.query);
    res.render('payment_error', req.query);
});

router.get('/wh_mercado_pago', async function(req, res) {
    console.log("---GET NOTIFICATION---");
    console.log(req.query);
    return res.status(200).json({success: true})
});

router.post('/wh_mercado_pago', async function(req, res) {
    console.log("---POST NOTIFICATION---");
    console.log(req.query);
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    return res.status(200).json({success: true})
});

function generatePreference(item){
    var preference = {}
    var items = []
    items.push(item)

    var payer = {
        name: 'Lalo',
        first_name: 'Lalo',
        surname: 'Landa',
        last_name: 'Landa',
        email: 'test_user_46542185@testuser.com',
        phone: {
            area_code: '52',
            number: 5549737300
        },

        identification: {
            type: 'DNI',
            number: '22334445'
        },

        address: {
            street_name: 'Insurgentes Sur',
            street_number: 1602,
            zip_code: '03940'
        }
    }

    preference.back_urls = {
        'success': process.env.MP_BACK_URL_SUCCESS,
        'failure': process.env.MP_BACK_URL_ERROR,
        'pending': process.env.MP_BACK_URL_PENDING
    }
    preference.payment_methods = {
        excluded_payment_methods: [
            {
                id: 'diners'
            }
        ],
        excluded_payment_types: [
            {
                id: 'atm'
            }
        ],
        installments: 6
    }

    preference.auto_return = 'approved'
    preference.items = items
    preference.payer = payer
    preference.external_reference = 'guzfernandez97@gmail.com'
    preference.notification_url = process.env.NOTIFICATION_URL;
    
    return preference;
}

module.exports = router;