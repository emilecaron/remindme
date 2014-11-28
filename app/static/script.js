
$(function(){
  console.log('Backbone time');

  var Message = Backbone.Model.extend({

    defaults: function() {
      return {
        title: 'TITLE',
        msg: 'MSG',
        hidden: true,
        type: "warning"
      };
    }

  });
  

  var MsgView = Backbone.View.extend({

    el:  $("#msg-div"),

    // Cache the template function
    template: _.template($('#msg-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .close"      : "close"
    },

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    // Remove the msg, destroy the model.
    close: function() {
      this.model.destroy();
    }

  });

  var FormView = Backbone.View.extend({
    
    el: $('#form-div'),

    template: _.template($('#form-template').html()),

    events: {
      "keypress #email":  "submitOnEnter"
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    submitOnEnter: function() {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;
      // send the shit

      console.log('loading');

      var form = {
        "email": $('#email').val(),  // Must do something for that
        "date": $('#date').val()
      };
      $.post('http://localhost:5000/api/register', form, this.onReply, 'json').always(function() {
        console.log('loaded');
        $('#alert').removeClass('hidden');
      });
    },

    onReply: function(data) {
        console.log('reply');
        console.log(data);
        //$('#alert-msg').html(data.msg);
        var view = new MsgView({title: 'Yeah', msg:data.msg});
        this.$("#msg-div").append(view.render().el);
    }

  });

  var AppView = Backbone.View.extend({

    el: $("#site-wrapper"),

    formTemplate: _.template($('#form-template').html()),



    initialize: function() {
        var form = new FormView();

    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
        //
    }
  });


  var App = new AppView;

});






$(document).ready(function() {
    return;
    console.log('ready');

    // bind
    $('form').submit(on_submit)
    $('.close').click(function(){$('#alert').addClass('hidden');})

});
