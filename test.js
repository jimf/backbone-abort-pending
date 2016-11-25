var test = require('tape')
var Backbone = require('backbone')
var abortPending = require('./')

Backbone.$ = require('jquery')
abortPending(Backbone)

var User = Backbone.Model.extend({})
var Users = Backbone.Collection.extend({
  model: User,
  url: 'http://jsonplaceholder.typicode.com/users'
})

test('default Backbone behavior', function (t) {
  var users = new Users()

  var xhr1 = users.fetch()
  var xhr2 = users.fetch()

  t.equal(xhr1.state(), 'pending')
  t.equal(xhr2.state(), 'pending')

  t.end()
})

test('behavior with abortPending:true', function (t) {
  var users = new Users()

  var xhr1 = users.fetch()
  var xhr2 = users.fetch({ abortPending: true })

  t.equal(xhr1.state(), 'rejected')
  t.equal(xhr1.statusText, 'abort')
  t.equal(xhr2.state(), 'pending')

  t.end()
})

test('different models/controllers', function (t) {
  var users1 = new Users()
  var users2 = new Users()

  var xhr1 = users1.fetch()
  var xhr2 = users2.fetch({ abortPending: true })

  t.equal(xhr1.state(), 'pending')
  t.equal(xhr2.state(), 'pending')

  t.end()
})

test('different request methods', function (t) {
  var users = new Users([
    { id: 1 },
    { id: 2 }
  ])

  var xhr1 = users.at(0).fetch()
  var xhr2 = users.at(1).destroy({ abortPending: true })

  t.equal(xhr1.state(), 'pending')
  t.equal(xhr2.state(), 'pending')

  t.end()
})
