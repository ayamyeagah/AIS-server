/* Function for filter data into static or dynamic collection
*/
// const config = require('../config/config');
// const Static = require('../models/static.schema');
// const Dynamic = require('../models/dynamic.schema');

// async function saveTypes(aisParams) {
//     try {
//         if (aisParams === 8) {
//             const staticFields = ['dac', 'fid', 'eni', 'length', 'beam', 'shipType', 'hazardCode', 'draught', 'loadStatus', 'speedQuality', 'courseQuality', 'headingQuality'];
//             const isStatic = staticFields.every(field => aisParams.hasOwnProperty(field));
//             if (isStatic) {
//                 const static = new Static(aisParams);
//                 await static.insertMany();
//             } else {
//                 const dynamic = new Dynamic(aisParams);
//                 await dynamic.insertMany();
//             }
//         } else if ([5, 24].includes(aisParams.type)) {
//             const static = new Static(aisParams);
//             await static.insertMany();
//         } else if ([1, 2, 3, 4, 8, 18].includes(aisParams.type)) {
//             const dynamic = new Dynamic(aisParams);
//             await dynamic.insertMany();
//         }
//     } catch (error) {
//         console.error('Erro saving AIS types:', error);
//     }
// };

// module.exports = saveTypes;

// Anda membutuhkan model 'Dynamic' dan 'Static' yang sudah kita definisikan sebelumnya
const Dynamic = require('../models/dynamic.schema');
const Static = require('../models/static.schema');
const Message = require('../models/message.schema');

module.exports = function distributeData() {
    Message.find().then(messages => {
        messages.forEach(message => {
            const { type, ...data } = message._doc;
            switch (type) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 8:
                case 18:
                    const dynamic = new Dynamic(data);
                    dynamic.insertMany();
                    break;
                case 5:
                case 24:
                    const static = new Static(data);
                    static.insertMany();
                    break;
            }
        });
    }).catch(err => {
        console.error("Error fetching messages: ", err);
    });
}

// Panggil fungsi untuk mendistribusikan data

