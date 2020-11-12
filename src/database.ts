const mongoose = require('mongoose');

const connect = () =>
    mongoose
        .connect('mongodb+srv://akgunberk:Ubor2575_@ttk-ui.esiab.mongodb.net/bionova?retryWrites=true&w=majority',
            { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => {
            console.log('connected to the db');
        }).catch((error) => {
            console.log(error);
        });

export default connect;