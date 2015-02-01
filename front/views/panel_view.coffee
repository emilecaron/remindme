PanelView = require './panel_view.coffee'

class Panel extends Backbone.View

    template: ->
        selector = '#' + @model.get 'name'
        _.template $(selector).html()

    render: ->
        @$el.html @template()
        console.log 'fun', @$el.html()
        fun = @model.get 'code'
        fun.call @
        @
    
    setTemplateFromId: (id, js)->
        @template = _.template $('#' + id).html()
        @loadJs = js


module.exports = Panel