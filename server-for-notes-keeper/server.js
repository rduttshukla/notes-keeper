// express imports
var express = require('express')
var app = express()
// bodyparser import
var bodyParser = require('body-parser')
// model 'Note' import
var Note = require('./models/note', { root: __dirname })
// bodyParser is in json format
app.use(bodyParser.json())
//fix for CORS policy
app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
//routes for get and post
app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/api/notes', (req, res) => {
    var note = new Note({
        title: req.body.title,
        description: req.body.description
    })
    note.save( (err, note) => {
        if(err) { console.log('something wrong happened') }
        res.send(note)
    })
}).get('/api/notes', (req, res) => {
    Note.find((err, notes) => {
        if (err) { console.log('something wrong happened') }
        res.send(notes);
    })
}).delete('/api/notes/:noteId', (req, res) => {
    Note.findByIdAndRemove(req.params.noteId).then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found by id" + req.params.noteId
            });
        }
        res.json('note deleted successfully');
    }) 
    res.send('Note deleted successfully')
}).put('/api/notes/:noteId', (req, res) => {
    console.log(req.body.title);
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title,
        description: req.body.description
    }, { new: true }).then(note => {
        if(!note) {
            return res.status(404).send({
                message: "note not found by id" + req.params.noteId
            })
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "note not found by id" + req.params.noteId
            })
        }
        return res.send.status(500).send({
            message: "error updating note with id " + req.params.notId
        })
    })
    res.send('note edited successfully')
}).get('/api/notes/:noteId', (req, res) => {
    Note.findById(req.params.noteId, (err, note) => {
        if(err) {
            console.log('something wrong happened')
        }
        res.send(note);
    })
})

app.listen(3000, () => {
    console.log('magic happening on ' + 3000)
})
