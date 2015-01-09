var FormView = require('./form_view.js');
var Form = require('../models/form.js');

module.exports = Backbone.View.extend({

    el: $("#site-wrapper"),

    initialize: function() {
        new FormView({model: new Form}).render();
    }

  });
