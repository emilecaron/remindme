module.exports = Backbone.Model.extend({

  url: '/api/register',

  defaults: function() {
    return {
        email: 'example@email.com',
        date: '2015-01-31'
    };
  },

  validate: function(attrs, options) {
    // Using Mongoengine email validation
    var emailRe = /(^[-!#$%&'*+\/=?^_`{}|~0-9A-Z]+(\.[-!#$%&'*+\/=?^_`{}|~0-9A-Z]+)*|^"([\001-\010\013\014\016-\037!#-\[\]-\177]|\\[\001-011\013\014\016-\177])*")@(?:[A-Z0-9](?:[A-Z0-9-]{0,253}[A-Z0-9])?\.)+[A-Z]{2,22}$/i
    if (!attrs.email.match(emailRe))
      return attrs.email + " isn't a valid email"; 

    return null;
  },

});
