
class MsgView extends Backbone.View

  template: _.template $('#msg-template').html()

  events:
    "click .close"      : "close"

  initialize: ->
    @listenTo @model, 'destroy', @remove

  render: ->
    console.log 'rendering msg'
    @$el.html @template @model.toJSON()
    @

  close: ->
    @model.destroy()


module.exports = MsgView
