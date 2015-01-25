(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/emile/personal/remindme/front/collections/pages.coffee":[function(require,module,exports){
var Page, Pages,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Page = require('../models/page.coffee');

Pages = (function(_super) {
  __extends(Pages, _super);

  function Pages() {
    return Pages.__super__.constructor.apply(this, arguments);
  }

  Pages.prototype.model = Page;

  return Pages;

})(Backbone.Collection);

module.exports = Pages;



},{"../models/page.coffee":"/home/emile/personal/remindme/front/models/page.coffee"}],"/home/emile/personal/remindme/front/main.coffee":[function(require,module,exports){
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {

  /*
  all class def must be encapsulated inside $.ready()
  otherwise templates from page.html won't be available.
   */
  var AppView, Header, Pages, RemindmePage;
  Header = require('./views/header.coffee');
  Pages = require('./collections/pages.coffee');
  RemindmePage = require('./models/remindme_page.coffee');
  AppView = (function(_super) {
    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.events = {
      'changePage': 'onChangePage'
    };

    AppView.prototype.initialize = function() {
      var remindme;
      console.log('Initializing app');
      remindme = new RemindmePage();
      this.pages = new Pages([remindme]);
      this.header = new Header();
      return Backbone.on('all', function(name) {
        console.log('proxy');
        return this.trigger(name);
      });
    };

    AppView.prototype.render = function() {
      console.log('Rendering appplication.');
      return this.header.render();
    };

    AppView.prototype.onPageChange = function(page) {
      return console.log('event received in main:', page);
    };

    return AppView;

  })(Backbone.View);
  window.app = new AppView();
  return window.app.render();
});



},{"./collections/pages.coffee":"/home/emile/personal/remindme/front/collections/pages.coffee","./models/remindme_page.coffee":"/home/emile/personal/remindme/front/models/remindme_page.coffee","./views/header.coffee":"/home/emile/personal/remindme/front/views/header.coffee"}],"/home/emile/personal/remindme/front/models/page.coffee":[function(require,module,exports){
var Page,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Page = (function(_super) {
  __extends(Page, _super);

  function Page() {
    return Page.__super__.constructor.apply(this, arguments);
  }

  Page.prototype.defaults = {
    title: 'untitled page'
  };

  return Page;

})(Backbone.Model);

module.exports = Page;



},{}],"/home/emile/personal/remindme/front/models/remindme_page.coffee":[function(require,module,exports){
var Page, RemindmePage,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Page = require('./page.coffee');

RemindmePage = (function(_super) {
  __extends(RemindmePage, _super);

  function RemindmePage() {
    return RemindmePage.__super__.constructor.apply(this, arguments);
  }

  RemindmePage.prototype.initialize = function() {
    return this.set({
      'title': 'Remind me'
    });
  };

  return RemindmePage;

})(Page);

module.exports = RemindmePage;



},{"./page.coffee":"/home/emile/personal/remindme/front/models/page.coffee"}],"/home/emile/personal/remindme/front/views/header.coffee":[function(require,module,exports){
var Header, PageLinkView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Header = (function(_super) {
  __extends(Header, _super);

  function Header() {
    return Header.__super__.constructor.apply(this, arguments);
  }

  Header.prototype.el = '#header';

  Header.prototype.ui = {
    links: '#header-links'
  };

  Header.prototype.template = _.template($('#header-template').html());

  Header.prototype.render = function() {
    this.$el.html(this.template);
    return this.renderLinks();
  };

  Header.prototype.renderLinks = function() {
    var _el;
    _el = $(this.ui.links);
    _el.html('');
    return window.app.pages.forEach(function(page) {
      var linkView;
      linkView = new PageLinkView({
        model: page
      });
      return _el.append(linkView.render().el);
    });
  };

  return Header;

})(Backbone.View);

PageLinkView = (function(_super) {
  __extends(PageLinkView, _super);

  function PageLinkView() {
    return PageLinkView.__super__.constructor.apply(this, arguments);
  }

  PageLinkView.prototype.tagName = 'div';

  PageLinkView.prototype.className = 'header-link header-el';

  PageLinkView.prototype.events = {
    'click': 'onClick'
  };

  PageLinkView.prototype.render = function() {
    this.$el.html(this.model.get('title'));
    return this;
  };

  PageLinkView.prototype.onClick = function() {
    console.log('Click', this.model.get('title'));
    return Backbone.trigger('changePage', this.model);
  };

  return PageLinkView;

})(Backbone.View);

module.exports = Header;



},{}]},{},["/home/emile/personal/remindme/front/main.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvZW1pbGUvcGVyc29uYWwvcmVtaW5kbWUvZnJvbnQvY29sbGVjdGlvbnMvcGFnZXMuY29mZmVlIiwiL2hvbWUvZW1pbGUvcGVyc29uYWwvcmVtaW5kbWUvZnJvbnQvbWFpbi5jb2ZmZWUiLCIvaG9tZS9lbWlsZS9wZXJzb25hbC9yZW1pbmRtZS9mcm9udC9tb2RlbHMvcGFnZS5jb2ZmZWUiLCIvaG9tZS9lbWlsZS9wZXJzb25hbC9yZW1pbmRtZS9mcm9udC9tb2RlbHMvcmVtaW5kbWVfcGFnZS5jb2ZmZWUiLCIvaG9tZS9lbWlsZS9wZXJzb25hbC9yZW1pbmRtZS9mcm9udC92aWV3cy9oZWFkZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSxXQUFBO0VBQUE7aVNBQUE7O0FBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSx1QkFBUixDQUFQLENBQUE7O0FBQUE7QUFJSSwwQkFBQSxDQUFBOzs7O0dBQUE7O0FBQUEsa0JBQUEsS0FBQSxHQUFPLElBQVAsQ0FBQTs7ZUFBQTs7R0FGZ0IsUUFBUSxDQUFDLFdBRjdCLENBQUE7O0FBQUEsTUFRTSxDQUFDLE9BQVAsR0FBaUIsS0FSakIsQ0FBQTs7Ozs7QUNBQSxJQUFBO2lTQUFBOztBQUFBLENBQUEsQ0FBRSxTQUFBLEdBQUE7QUFDRTtBQUFBOzs7S0FBQTtBQUFBLE1BQUEsb0NBQUE7QUFBQSxFQVFBLE1BQUEsR0FBUyxPQUFBLENBQVEsdUJBQVIsQ0FSVCxDQUFBO0FBQUEsRUFTQSxLQUFBLEdBQVEsT0FBQSxDQUFRLDRCQUFSLENBVFIsQ0FBQTtBQUFBLEVBVUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSwrQkFBUixDQVZmLENBQUE7QUFBQSxFQWFNO0FBRUYsOEJBQUEsQ0FBQTs7OztLQUFBOztBQUFBLHNCQUFBLE1B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LE9BQVAsR0FBaUIsTUF4Q2pCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiUGFnZSA9IHJlcXVpcmUgJy4uL21vZGVscy9wYWdlLmNvZmZlZSdcblxuY2xhc3MgUGFnZXMgZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG5cbiAgICBtb2RlbDogUGFnZVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlc1xuIiwiJCAtPlxuICAgICMjI1xuICAgIGFsbCBjbGFzcyBkZWYgbXVzdCBiZSBlbmNhcHN1bGF0ZWQgaW5zaWRlICQucmVhZHkoKVxuICAgIG90aGVyd2lzZSB0ZW1wbGF0ZXMgZnJvbSBwYWdlLmh0bWwgd29uJ3QgYmUgYXZhaWxhYmxlLlxuICAgICMjI1xuICAgIFxuICAgICNGb3JtVmlldyA9IHJlcXVpcmUgJy4vdmlld3MvZm9ybV92aWV3LmNvZmZlZSdcbiAgICAjRm9ybSA9IHJlcXVpcmUgJy4vbW9kZWxzL2Zvcm0uY29mZmVlJ1xuXG4gICAgSGVhZGVyID0gcmVxdWlyZSAnLi92aWV3cy9oZWFkZXIuY29mZmVlJ1xuICAgIFBhZ2VzID0gcmVxdWlyZSAnLi9jb2xsZWN0aW9ucy9wYWdlcy5jb2ZmZWUnXG4gICAgUmVtaW5kbWVQYWdlID0gcmVxdWlyZSAnLi9tb2RlbHMvcmVtaW5kbWVfcGFnZS5jb2ZmZWUnXG5cblxuICAgIGNsYXNzIEFwcFZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICAgICAgZXZlbnRzOlxuICAgICAgICAgICAgJ2NoYW5nZVBhZ2UnOiAnb25DaGFuZ2VQYWdlJ1xuXG4gICAgICAgIGluaXRpYWxpemU6IC0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnSW5pdGlhbGl6aW5nIGFwcCdcbiAgICAgICAgICAgIHJlbWluZG1lID0gbmV3IFJlbWluZG1lUGFnZSgpXG4gICAgICAgICAgICBAcGFnZXMgPSBuZXcgUGFnZXMoW3JlbWluZG1lXSlcbiAgICAgICAgICAgIEBoZWFkZXIgPSBuZXcgSGVhZGVyKClcbiAgICAgICAgICAgIEJhY2tib25lLm9uICdhbGwnLCAobmFtZSktPlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdwcm94eSdcbiAgICAgICAgICAgICAgICBAdHJpZ2dlciBuYW1lXG5cbiAgICAgICAgcmVuZGVyOiAtPlxuICAgICAgICAgICAgY29uc29sZS5sb2cgJ1JlbmRlcmluZyBhcHBwbGljYXRpb24uJ1xuICAgICAgICAgICAgQGhlYWRlci5yZW5kZXIoKVxuXG4gICAgICAgIG9uUGFnZUNoYW5nZTogKHBhZ2UpLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdldmVudCByZWNlaXZlZCBpbiBtYWluOicsIHBhZ2VcblxuICAgIHdpbmRvdy5hcHAgPSBuZXcgQXBwVmlldygpXG4gICAgd2luZG93LmFwcC5yZW5kZXIoKVxuXG4iLCJcbmNsYXNzIFBhZ2UgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXG4gICAgZGVmYXVsdHM6XG4gICAgICAgIHRpdGxlOiAndW50aXRsZWQgcGFnZSdcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlXG4iLCJcblBhZ2UgPSByZXF1aXJlICcuL3BhZ2UuY29mZmVlJ1xuXG5jbGFzcyBSZW1pbmRtZVBhZ2UgZXh0ZW5kcyBQYWdlXG4gICAgXG4gICAgaW5pdGlhbGl6ZTogLT5cbiAgICAgICAgQHNldFxuICAgICAgICAgICAgJ3RpdGxlJzogJ1JlbWluZCBtZSdcblxubW9kdWxlLmV4cG9ydHMgPSBSZW1pbmRtZVBhZ2VcbiIsIlxuY2xhc3MgSGVhZGVyIGV4dGVuZHMgQmFja2JvbmUuVmlld1xuXG4gICAgZWw6ICcjaGVhZGVyJ1xuXG4gICAgdWk6XG4gICAgICAgIGxpbmtzOiAnI2hlYWRlci1saW5rcydcblxuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlICQoJyNoZWFkZXItdGVtcGxhdGUnKS5odG1sKClcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQCRlbC5odG1sIEB0ZW1wbGF0ZVxuICAgICAgICBAcmVuZGVyTGlua3MoKVxuXG4gICAgcmVuZGVyTGlua3M6IC0+XG4gICAgICAgIF9lbCA9ICQgQHVpLmxpbmtzXG4gICAgICAgIF9lbC5odG1sICcnXG5cbiAgICAgICAgd2luZG93LmFwcC5wYWdlcy5mb3JFYWNoIChwYWdlKSAtPlxuICAgICAgICAgICBsaW5rVmlldyA9IG5ldyBQYWdlTGlua1ZpZXdcbiAgICAgICAgICAgICAgICBtb2RlbDogcGFnZVxuICAgICAgICAgICBfZWwuYXBwZW5kIGxpbmtWaWV3LnJlbmRlcigpLmVsXG5cblxuY2xhc3MgUGFnZUxpbmtWaWV3IGV4dGVuZHMgQmFja2JvbmUuVmlld1xuICAgIHRhZ05hbWU6ICdkaXYnXG4gICAgY2xhc3NOYW1lOiAnaGVhZGVyLWxpbmsgaGVhZGVyLWVsJ1xuXG4gICAgZXZlbnRzOlxuICAgICAgICAnY2xpY2snOiAnb25DbGljaydcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQCRlbC5odG1sIEBtb2RlbC5nZXQgJ3RpdGxlJ1xuICAgICAgICBAXG5cbiAgICBvbkNsaWNrOiAtPlxuICAgICAgICBjb25zb2xlLmxvZyAnQ2xpY2snLCBAbW9kZWwuZ2V0ICd0aXRsZSdcbiAgICAgICAgQmFja2JvbmUudHJpZ2dlciAnY2hhbmdlUGFnZScsIEBtb2RlbFxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJcbiJdfQ==
