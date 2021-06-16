const axios = require('axios').default;

function newMercadoPagoPreference(payload, callback){
    axios.post(`https://api.mercadopago.com/checkout/preferences`, payload, {
        headers: {
            Authorization: 'Bearer ' + process.env.MP_TOKEN,
            'x-integrator-id': 'dev_2e4ad5dd362f11eb809d0242ac130004'
        }
    })
    .then(function(response){
        return callback(null, response.data);
    })
    .catch(function(error){
        return callback(error);
    })
}

module.exports = { newMercadoPagoPreference }