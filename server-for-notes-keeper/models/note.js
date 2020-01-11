var db = require('../db')

var Note = db.model('Note', {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now } 
})
module.exports = Note