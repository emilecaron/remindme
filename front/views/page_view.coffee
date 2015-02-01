PanelView = require './panel_view.coffee'

class Page extends Backbone.View

    el: '#page'

    title: 'undefined_page'

    initialize: ->
        Backbone.on 'switchPanel', @switchPanel, @
        Backbone.on 'rendered', @loadPanelJs, @
        Backbone.on 'setPageData', (data) ->
            console.log 'setData', data
            , @

        panels = @model.get 'panels'
        @switchPanel _.first _.keys panels if panels

    render: ->
        @$el.html @model.get('activePanel').render().el
        Backbone.trigger 'rendered'

    switchPanel: (name)->
        if name in _.functions @model.get 'panels'
            activePanel = new PanelView()
            js = (@model.get 'panels')[name] or null
            activePanel.setTemplateFromId name, js
            @model.set 'activePanel', activePanel
            @render()

    loadPanelJs: ->
        console.log 'handler', @model
        pageData =
            yo: 'lo'
        pan = @model.get('activePanel')
        pan.loadJs() if pan



module.exports = Page
