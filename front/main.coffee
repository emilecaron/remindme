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
    PageView = require './views/page_view.coffee'


    class AppView extends Backbone.View

        el: '#page'

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


        initListener: ->
            _app = @
            Backbone.on 'all', (name)->
                console.log 'Event caught:', name, arguments
                if name in _.functions(_app)
                    _app[name].apply _app, arguments

        showFirstPage: ->
            Backbone.trigger 'changePage', @pages.first()

        render: ->
            console.log 'Rendering application.'
            @header.render()
            Backbone.trigger 'rendered'

        changePage: (e, page)->
            console.log 'changepage'
            @active = page
            pageView = new PageView
                model: page
            pageView.render()
            @$el.html pageView.el
            @header.renderLinks()
            Backbone.trigger 'rendered'

        activePage: ->
            @active


    app = new AppView()
    app.render()
    app.showFirstPage()
