PanelView = require './panel_view.coffee'

class Panel extends Backbone.View

    initialize: ->
        Backbone.on 'page_rendered', @loadPanelJs, @

    template: ->
        selector = '#' + @model.get 'name'
        _.template $(selector).html()

    render: ->
        @$el.html @template()
        @
    
    loadPanelJs: ->
        console.log 'Loading panel Javascrpt'
        @model.get('code').call @


module.exports = Panel
