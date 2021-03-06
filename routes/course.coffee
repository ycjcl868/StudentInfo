express = require "express"
mongoose = require 'mongoose'
router = express.Router()

courseModel = mongoose.model('Course')
gradeModel = mongoose.model('Grade')

# GET home page.
router.get "/", (req, res) ->
    unless req.session.username?
        res.redirect '/'
    query = req.query.query
    courseModel.find("$or": [
        {cname: new RegExp(query)}
        {cno: new RegExp(query)}
        {teacher: new RegExp(query)}
    ],null, {sort:
            'cno': 1
        },
    (err, data)->
        if err?
            console.log(err)
        res.render 'course',
            courses: data
            username: req.session.username
            query: query
            status: ''
    )

#   增加一门课程
router.post "/add", (req, res) ->
    unless req.session.username?
        res.redirect '/'
    _cno = req.body.cno
    _cname = req.body.cname
    _credit = req.body.credit
    _teacher = req.body.teacher
    courseEntity = new courseModel
        cno: _cno
        cname: _cname
        credit: _credit
        teacher: _teacher
    courseEntity.save((err)->
        if err?
            console.log(err)
    )
    res.redirect '/course'

#   删除一门课程
router.get "/delete/:cid", (req, res) ->
    unless req.session.username?
        res.redirect '/'
    cid = req.params.cid
    console.log(cid)
    courseModel.remove(
        {_id: cid},
    (err)->
        if err?
            console.log(err)
    )
    res.redirect '/course'

#   修改一门课程
router.post "/update/:cid", (req, res) ->
    unless req.session.username?
        res.redirect '/'
    cid = req.params.cid
    _cno = req.body.cno
    _cname = req.body.cname
    _credit = req.body.credit
    _teacher = req.body.teacher
    courseModel.findByIdAndUpdate(cid,
        cno: _cno
        cname: _cname
        credit: _credit
        teacher: _teacher
        (err)->
            if err?
                console.log(err)
    )
    res.redirect '/course'

module.exports = router