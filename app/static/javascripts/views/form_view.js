var MsgView = require('./message_view.js');

module.exports = Backbone.View.extend({
    
    el: $('#form-div'),

    template: _.template($('#form-template').html()),

    events: {
      "click .btn": "submit"
    },

    initialize: function() {
      this.listenTo(this.model, 'error', this.onSyncError);
      this.listenTo(this.model, 'sync', this.onSync);
      this.listenTo(this.model, 'invalid', this.onValidationError);
      this.listenTo(this.model, 'destroy', this.remove);
    },


    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.email = this.$('#email');
      this.date = this.$('#date');
      return this;
    },

    showMsg: function(data){
      console.log(data);
      this.msg && this.msg.remove()

      msgModel = new Backbone.Model(data);
      this.msg = new MsgView({model: msgModel}).render().el
      $('#msg-div').append(this.msg);
    },

    onSyncError: function(_, data){
      this.showMsg({
          type: "danger",
          title: "Sorry!",
          msg: (data.status === 409)? "already registered": "server is taking a break."
      });
    },

    onValidationError: function(model, error){
      this.showMsg({
          type: 'warning',
          title: '',
          msg: error
      });
    },

    onSync: function(_, data){
      this.showMsg({
          type: "success",
          title: data.email,
          msg: "registered successfully!"
      });
    },

    submit: function(e) {
      this.model.save({
        email: this.email.val(), 
        date: this.date.val()
      });
    }
});
