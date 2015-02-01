PanelView = require './panel_view.coffee'

class Panel extends Backbone.View

    render: ->
        @$el.html @template()
        @
    
    setTemplateFromId: (id, js)->
        @template = _.template $('#' + id).html()
        @loadJs = js


module.exports = Panel