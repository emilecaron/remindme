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
            @header = new Header()

            @initListener()


        initListener: ->
            _app = @
            Backbone.on 'all', (name)->
                console.log arguments
                _app[name].apply(_app, arguments)

        render: ->
            console.log 'Rendering application.'
            @header.render()

        changePage: (e, page)->
            @active = page
            console.log 'AAAA', @active
            pageView = new PageView
                model: page
            pageView.render()
            @$el.html pageView.el
            @header.render()

        activePage: ->
            console.log 'ac', @active
            @active

        showFirstPage: ->
            Backbone.trigger 'changePage', @pages.first()


    window.app = new AppView()
    window.app.render()
    window.app.showFirstPage()

