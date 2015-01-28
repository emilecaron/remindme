PanelView = require './panel_view.coffee'

class Panel extends Backbone.View

    render: ->
        console.log 'rendering panel', @template()
        @$el.html @template()
        @
    
    setTemplateFromId: (id, js)->
        @template = _.template $('#' + id).html()
        @loadJs = js
        console.log 'js', js


module.exports = Panel