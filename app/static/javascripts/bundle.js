(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {

  /*
  all class def must be encapsulated inside $.ready()
  otherwise templates from page.html won't be available.
   */
  var App, AppView, Form, FormView;
  FormView = require('./views/form_view.coffee');
  Form = require('./models/form.coffee');
  AppView = (function(_super) {
    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.el = $("#site-wrapper");

    AppView.prototype.events = {
      'all': "debug"
    };

    AppView.prototype.debug = function(a) {
      return console.log(a);
    };

    AppView.prototype.render = function() {
      var form;
      form = new FormView({
        model: new Form()
      });
      return form.render();
    };

    return AppView;

  })(Backbone.View);
  return App = new AppView().render();
});



},{"./models/form.coffee":2,"./views/form_view.coffee":3}],2:[function(require,module,exports){
var Form,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Form = (function(_super) {
  __extends(Form, _super);

  function Form() {
    return Form.__super__.constructor.apply(this, arguments);
  }

  Form.prototype.url = '/api/register';

  Form.prototype.defaults = function() {
    return {
      email: 'example@email.com',
      date: '2015-01-31'
    };
  };

  Form.prototype.validationRe = {
    email: /(^[-!#$%&'*+\/=?^_`{}|~0-9A-Z]+(\.[-!#$%&'*+\/=?^_`{}|~0-9A-Z]+)*|^"([\001-\010\013\014\016-\037!#-\[\]-\177]|\\[\001-011\013\014\016-\177])*")@(?:[A-Z0-9](?:[A-Z0-9-]{0,253}[A-Z0-9])?\.)+[A-Z]{2,22}$/i
  };

  Form.prototype.validate = function(attrs, options) {
    if (attrs.email === this.defaults().email) {
      return "You have to enter your email address!";
    } else if (!attrs.email.match(this.validationRe.email)) {
      return attrs.email + " isn't a valid email";
    }
  };

  return Form;

})(Backbone.Model);

module.exports = Form;



},{}],3:[function(require,module,exports){
var FormView, MsgView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MsgView = require('./message_view.coffee');

FormView = (function(_super) {
  __extends(FormView, _super);

  function FormView() {
    return FormView.__super__.constructor.apply(this, arguments);
  }

  FormView.prototype.el = $('#form-div');

  FormView.prototype.template = _.template($('#form-template').html());

  FormView.prototype.events = {
    "click .btn": "submit"
  };

  FormView.prototype.initialize = function() {
    this.folded = true;
    this.listenTo(this.model, 'error', this.onSyncError);
    this.listenTo(this.model, 'sync', this.onSync);
    this.listenTo(this.model, 'invalid', this.onValidationError);
    return this.listenTo(this.model, 'destroy', this.remove);
  };

  FormView.prototype.render = function() {
    var context;
    context = _.extend(this.model.toJSON(), {
      'folded': this.folded
    });
    this.$el.html(this.template(context));
    console.log('context:', context);
    this.email = this.$('#email');
    this.date = this.$('#date');
    return this;
  };

  FormView.prototype.showMsg = function(data) {
    var msgModel;
    console.log(data);
    if (this.msg) {
      this.msg.remove();
    }
    msgModel = new Backbone.Model(data);
    this.msg = new MsgView({
      model: msgModel
    });
    return $('#msg-div').append(this.msg.render().el);
  };

  FormView.prototype.onSyncError = function(_, data) {
    return this.showMsg({
      type: "danger",
      title: "Sorry!",
      msg: data.status === 409 ? "already registered." : "server is taking a break."
    });
  };

  FormView.prototype.onValidationError = function(model, error) {
    return this.showMsg({
      type: 'warning',
      title: '',
      msg: error
    });
  };

  FormView.prototype.onSync = function(_, data) {
    return this.showMsg({
      type: "success",
      title: data.email,
      msg: "registered successfully!"
    });
  };

  FormView.prototype.submit = function(e) {
    if (this.folded) {
      this.folded = false;
      return this.render();
    } else {
      return this.model.save({
        email: this.email.val(),
        date: this.date.val()
      });
    }
  };

  return FormView;

})(Backbone.View);

module.exports = FormView;



},{"./message_view.coffee":4}],4:[function(require,module,exports){
var MsgView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MsgView = (function(_super) {
  __extends(MsgView, _super);

  function MsgView() {
    return MsgView.__super__.constructor.apply(this, arguments);
  }

  MsgView.prototype.template = _.template($('#msg-template').html());

  MsgView.prototype.events = {
    "click .close": "close"
  };

  MsgView.prototype.initialize = function() {
    return this.listenTo(this.model, 'destroy', this.remove);
  };

  MsgView.prototype.render = function() {
    console.log('rendering msg');
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  };

  MsgView.prototype.close = function() {
    return this.model.destroy();
  };

  return MsgView;

})(Backbone.View);

module.exports = MsgView;



},{}]},{},[1]);
