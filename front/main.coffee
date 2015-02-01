$ ->
    ###
    all class def must be encapsulated inside $.ready()
    otherwise templates from page.html won't be available.
    ###
    
    #FormView = require './views/form_view.coffee'
    #Form = require './models/form.coffee'

    Header = require './views/header.coffee'
    Pages = require './collections/pages.coffee'
    RemindmePage = require './models/remindme_page.coffee'
    AboutPage = require './models/about_page.coffee'


    class AppView extends Backbone.View

        events:
            'changePage': 'onChangePage'

        initialize: ->
            console.log 'Initializing app'

            remindme = new RemindmePage()
            about = new AboutPage()
            @pages = new Pages([remindme, about])

            @header = new Header
                pages: @pages

            @initListener()
            @render()

        initListener: ->
            # allow app functions to be triggered with events
            app = @
            Backbone.on 'all', (name)->
                app[name].apply app, arguments if name in _.functions(app)

        showFirstPage: ->
            Backbone.trigger 'changePage', @pages.first()

        render: ->
            @header.render()
            Backbone.trigger 'rendered'
            @

        changePage: (e, page)->
            page.get('view').render()
            @header.renderLinks()

    _app = new AppView()
    Backbone.trigger 'showFirstPage'
