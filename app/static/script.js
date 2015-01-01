
$(function(){

  var Form = Backbone.Model.extend({

    url: 'http://localhost:5000/api/register',

    defaults: function() {
      return {email:'smilzor@gmail.com',date:'1991-05-10'}; // Debug values
      return {date: '', email:''};
    },

    validate: function(attrs, options) {
      // Using Mongoengine email validation
      var emailRe = /(^[-!#$%&'*+\/=?^_`{}|~0-9A-Z]+(\.[-!#$%&'*+\/=?^_`{}|~0-9A-Z]+)*|^"([\001-\010\013\014\016-\037!#-\[\]-\177]|\\[\001-011\013\014\016-\177])*")@(?:[A-Z0-9](?:[A-Z0-9-]{0,253}[A-Z0-9])?\.)+[A-Z]{2,22}$/i
      if (!attrs.email.match(emailRe))
        return attrs.email + " isn't a valid email"; 

      return null;
    },

  });
  

  var MsgView = Backbone.View.extend({

    template: _.template($('#msg-template').html()),

    events: {
      "click .close"      : "close"
    },

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      console.log('rendering msg');
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    close: function() {
      this.model.destroy();
    }

  });

  var FormView = Backbone.View.extend({
    
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

  var AppView = Backbone.View.extend({

    el: $("#site-wrapper"),

    initialize: function() {
        new FormView({model: new Form}).render();
    }

  });

  var App = new AppView;

});

