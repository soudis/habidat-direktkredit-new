const Contract = require('../models/Contract');

/**
 * Login page (HTML)
 */
exports.getContracts = (req, res) => {
    Contract.find({}).exec()
        .then((contracts) => {
            res.render('contract/list', {contracts: contracts, title: 'Veträge'});
        })
};
