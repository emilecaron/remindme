
module.exports = Backbone.View.extend({

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

