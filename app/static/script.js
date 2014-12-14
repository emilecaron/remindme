
$(function(){

  var Form = Backbone.Model.extend({

    url: 'http://localhost:5000/api/register',

    defaults: function() {
      return {email:'smilzor@gmail.com',date:'1991-05-10'}; // Debug values
      return {date: '', email:''};
    },

    validate: function(attrs, options) {
      console.log('validating');
      //might need something here...
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
      this.listenTo(this.model, 'error', this.onMsg);
      this.listenTo(this.model, 'sync', this.onMsg);
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

    onMsg: function(_, rq){
      this.showMsg(
        (rq.status === 201)?
        { // success message
          type: "success",
          title: "Zozor",
          msg: "registered successfully!"
        }:
        { // Error messages
          type: "danger",
          title: "Sorry!",
          msg: {
            409: "already registered",
            500: "server is taking a break."
          }[rq.status || 500]
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

