const db = require("../models");

module.exports = {
    addSource: function(req, res) {
        console.log(req.body.source)
        db.Protege
            .findByIdAndUpdate({ _id: req.params.id}, { $push: { sources: req.body.source}})
            .then(dbProtege => res.json(dbProtege))
            .catch(err => res.status(422).json(err))
    }
}