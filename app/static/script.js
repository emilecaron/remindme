
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

    //el:  $("#msg-div"),
    id: 'msg',

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
      "keypress #email":  "submitOnEnter",
      "change": "postOnChange"
    },

    initialize: function() {
      console.log('init formView');
    },

    render: function() {
      console.log('render formView');
      this.$el.html(this.template(this.model.toJSON()));
      this.email = this.$('#email');
      this.date = this.$('#date');
      return this;
    },

    submitOnEnter: function(e) {
      // Update model with form data on <ENTER>
      if (e.keyCode != 13) return;

      this.model.set({
        "email": this.email.val(), 
        "date": this.date.val()
      });
    },

    postOnChange: function() {
      // Post data to server on model change
      console.log('posting data');

      if (!this.model.valid()) return;

      $.post('http://localhost:5000/api/register', this.model.toJSON(), this.onReply, 'json').always(function() {
        console.log('loaded');
      });
    },

    onReply: function(data) {
        // Create msg
        console.log(data);
        var view = new MsgView({model: new Backbone.Model(data)}).render(); 
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

