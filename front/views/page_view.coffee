PanelView = require './panel_view.coffee'

class Page extends Backbone.View

    el: '#page'

    title: 'undefined_page'

    initialize: ->
        Backbone.on 'switchPanel', @switchPanel, @

        panels = @model.get 'panels'
        @switchPanel _.first _.keys panels if panels

    render: ->
        @$el.html @model.get('activePanel').render().el
        #Backbone.trigger 'rendered'

    switchPanel: (name)->
        if name in _.functions @model.get 'panels'
            activePanel = new PanelView
                model: new Backbone.Model
                    name: name
                    code: @model.get('panels')[name]
            @model.set 'activePanel', activePanel

    loadPanelJs: ->
        console.log 'handler', @model
        pan = @model.get('activePanel')
        pan.loadJs() if pan



module.exports = Page
