MsgView = require './message_view.js'


class FormView extends Backbone.View
    
    el: $ '#form-div'

    template: _.template($('#form-template').html())

    events:
      "click .btn": "submit"


    initialize: ->
      @listenTo @model, 'error', @onSyncError
      @listenTo @model, 'sync', @onSync
      @listenTo @model, 'invalid', @onValidationError
      @listenTo @model, 'destroy', @remove

    render: ->
      @$el.html(@template(@model.toJSON()))
      @email = @$ '#email'
      @date = @$ '#date'
      @

    showMsg: (data) ->
      console.log data
      @msg.remove() if @msg

      msgModel = new Backbone.Model(data)
      @msg = new MsgView
          model: msgModel
      $('#msg-div').append @msg.render().el

    onSyncError: (_, data) ->
      @showMsg
          type: "danger"
          title: "Sorry!"
          msg: if data.status == 409 then "already registered" else "server is taking a break."
      

    onValidationError: (model, error) ->
      @showMsg
          type: 'warning'
          title: ''
          msg: error

    onSync: (_, data) ->
      @showMsg
          type: "success"
          title: data.email
          msg: "registered successfully!"

    submit: (e) ->
      @model.save
        email: @email.val()
        date: @date.val()


module.exports = FormView
