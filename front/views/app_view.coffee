FormView = require './form_view.coffee'
Form = require '../models/form.coffee'

class AppView extends Backbone.View

    el: $ "#site-wrapper"

    render: ->
        form = new FormView
            model: new Form()
        form.render()

module.exports = AppView
