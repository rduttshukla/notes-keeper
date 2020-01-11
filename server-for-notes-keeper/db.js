var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/notes', function() {
    console.log('mongodb connected')
})

module.exports = mongoose