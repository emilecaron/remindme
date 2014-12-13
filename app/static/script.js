
$(function(){

  var Form = Backbone.Model.extend({

    defaults: function() {
      return {email:'smilzor@gmail.com',date:'1991-05-10'}; // Debug values
      return {date: '', email:''};
    },

    valid: function() {
        return true;
        console.log('Trying to validate data...');
        // Catch html validation, not null OR regex
    },

  });
  

  var MsgView = Backbone.View.extend({

    el:  $("#msg-div"),
    //id: 'msg-',

    // Cache the template function
    template: _.template($('#msg-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .close"      : "close"
    },

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
      $("#msg-div").append(this.el);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    // Remove the msg, destroy the model.
    close: function() {
      console.log('Model destroy time');
      this.model.destroy();
    }

  });

  var FormView = Backbone.View.extend({
    
    el: $('#form-div'),

    template: _.template($('#form-template').html()),

    events: {
      "click .btn": "postData"
    },


    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.email = this.$('#email');
      this.date = this.$('#date');
      return this;
    },

    postData: function(e) {
      // Post model data to server
      this.model.set({
        email: this.email.val(), 
        date: this.date.val()
      });
      if (!this.model.valid()) return;

      console.log('posting data');

      //$.post('http://localhost:5000/api/register', this.model.toJSON(), this.onReply, 'json').always(function() {
      $.post('http://localhost:5000/api/register', this.model.toJSON()).done(function(data) {
        //this.msg = new MsgView({model: new Backbone.Model(data)}).render();
        this.msg = new Backbone.Model(data);

      }).fail(function(){
        //this.msg = new MsgView({model: new Backbone.Model()}).render()
        this.msg = new Backbone.Model({
          type: "danger",
          title :"Sorry!",
          msg: "server is taking a break."
        });
      }).always(function(){
        console.log(this.msg);
        this.msg = new MsgView({model: this.msg}).render();
      });
    },

    onReply: function(data) {
        // Create msg
         
    }

  });

  var AppView = Backbone.View.extend({

    el: $("#site-wrapper"),

    initialize: function() {
        console.log('Init appView');
        this.form = new FormView({model: new Form}).render();
    }

  });


  var App = new AppView;

});

