PanelView = require './panel_view.coffee'

class Page extends Backbone.View

    el: '#page'

    title: 'default title'

    initialize: ->
        Backbone.on 'switchPanel', @switchPanel, @

        panels = @model.get 'panels'
        @switchPanel _.first _.keys panels if panels

    render: ->
        @$el.html @model.get('activePanel').render().el
        console.log $ '#no_button'
        console.log 'triggering page rendered'
        Backbone.trigger 'page_rendered'

    switchPanel: (name)->
        console.log 'switching panel', name
        if name in _.functions @model.get 'panels'
            activePanel = new PanelView
                model: new Backbone.Model
                    name: name
                    code: @model.get('panels')[name]
            @model.set 'activePanel', activePanel
            @render()



module.exports = Page
