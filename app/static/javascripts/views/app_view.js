var FormView = require('./form_view.js');
var Form = require('../models/form.js');

module.exports = Backbone.View.extend({

    el: $("#site-wrapper"),

    render: function() {
        new FormView({
            model: new Form()
        }).render();

        return this;
    }

  });
