$ ->
    ###
    all class def must be encapsulated inside $.ready()
    otherwise templates from page.html won't be available.
    ###
    
    FormView = require './views/form_view.coffee'
    Form = require './models/form.coffee'


    class AppView extends Backbone.View

        el: $ "#site-wrapper"

        events:
            'all': "debug"

        debug: (a)->
          console.log a

        render: ->
            form = new FormView
                model: new Form()
            form.render()

    App = new AppView().render()

