(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/emile/workspace/remindme/front/collections/pages.coffee":[function(require,module,exports){
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



},{"../models/page.coffee":"/home/emile/workspace/remindme/front/models/page.coffee"}],"/home/emile/workspace/remindme/front/main.coffee":[function(require,module,exports){
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {

  /*
  all class def must be encapsulated inside $.ready()
  otherwise templates from page.html won't be available.
   */
  var AboutPage, AppView, Header, PageView, Pages, RemindmePage;
  Header = require('./views/header.coffee');
  Pages = require('./collections/pages.coffee');
  RemindmePage = require('./models/remindme_page.coffee');
  AboutPage = require('./models/about_page.coffee');
  PageView = require('./views/page_view.coffee');
  AppView = (function(_super) {
    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.el = '#page';

    AppView.prototype.events = {
      'changePage': 'onChangePage'
    };

    AppView.prototype.initialize = function() {
      var about, remindme;
      console.log('Initializing app');
      remindme = new RemindmePage();
      about = new AboutPage();
      this.pages = new Pages([remindme, about]);
      this.header = new Header();
      return this.initListener();
    };

    AppView.prototype.initListener = function() {
      var _app;
      _app = this;
      return Backbone.on('all', function(name) {
        console.log(arguments);
        return _app[name].apply(_app, arguments);
      });
    };

    AppView.prototype.showFirstPage = function() {
      return Backbone.trigger('changePage', this.pages.first());
    };

    AppView.prototype.render = function() {
      console.log('Rendering application.');
      return this.header.render();
    };

    AppView.prototype.changePage = function(e, page) {
      var pageView;
      this.active = page;
      pageView = new PageView({
        model: page
      });
      pageView.render();
      this.$el.html(pageView.el);
      return this.header.renderLinks();
    };

    AppView.prototype.activePage = function() {
      return this.active;
    };

    return AppView;

  })(Backbone.View);
  window.app = new AppView();
  window.app.render();
  return window.app.showFirstPage();
});



},{"./collections/pages.coffee":"/home/emile/workspace/remindme/front/collections/pages.coffee","./models/about_page.coffee":"/home/emile/workspace/remindme/front/models/about_page.coffee","./models/remindme_page.coffee":"/home/emile/workspace/remindme/front/models/remindme_page.coffee","./views/header.coffee":"/home/emile/workspace/remindme/front/views/header.coffee","./views/page_view.coffee":"/home/emile/workspace/remindme/front/views/page_view.coffee"}],"/home/emile/workspace/remindme/front/models/about_page.coffee":[function(require,module,exports){
var AboutmePage, Page,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Page = require('./page.coffee');

AboutmePage = (function(_super) {
  __extends(AboutmePage, _super);

  function AboutmePage() {
    return AboutmePage.__super__.constructor.apply(this, arguments);
  }

  AboutmePage.prototype.defaults = function() {
    return {
      'title': 'About',
      'html': '<p> Hey, i\'m Zozor. Check out my github <a href="http://github.com/emilecaron">here</a>! </p> <p>This app was built using <a href="http://flask.pocoo.org/">Flask</a>, <a href="http://backbonejs.org/">Backbone</a>, <a href="http://getbootstrap.com/">Bootstrap</a> and more.</p>'
    };
  };

  return AboutmePage;

})(Page);

module.exports = AboutmePage;



},{"./page.coffee":"/home/emile/workspace/remindme/front/models/page.coffee"}],"/home/emile/workspace/remindme/front/models/page.coffee":[function(require,module,exports){
var Page,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Page = (function(_super) {
  __extends(Page, _super);

  function Page() {
    return Page.__super__.constructor.apply(this, arguments);
  }

  Page.prototype.defaults = {
    title: 'untitled page',
    active: false
  };

  Page.prototype.isActive = function() {
    return this.get('active');
  };

  return Page;

})(Backbone.Model);

module.exports = Page;



},{}],"/home/emile/workspace/remindme/front/models/remindme_page.coffee":[function(require,module,exports){
var Page, RemindmePage,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Page = require('./page.coffee');

RemindmePage = (function(_super) {
  __extends(RemindmePage, _super);

  function RemindmePage() {
    return RemindmePage.__super__.constructor.apply(this, arguments);
  }

  RemindmePage.prototype.defaults = function() {
    return {
      'title': 'Remind me',
      'html': '<h1>Hello world!</h1>'
    };
  };

  return RemindmePage;

})(Page);

module.exports = RemindmePage;



},{"./page.coffee":"/home/emile/workspace/remindme/front/models/page.coffee"}],"/home/emile/workspace/remindme/front/views/header.coffee":[function(require,module,exports){
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

  PageLinkView.prototype.tagName = 'li';

  PageLinkView.prototype.events = {
    'click': 'onClick'
  };

  PageLinkView.prototype.render = function() {
    this.$el.html("<a>" + this.model.get('title') + "</a>");
    if (this.model === window.app.activePage()) {
      console.log('yes');
      this.$el.addClass('active');
    }
    return this;
  };

  PageLinkView.prototype.onClick = function() {
    return Backbone.trigger('changePage', this.model);
  };

  return PageLinkView;

})(Backbone.View);

module.exports = Header;



},{}],"/home/emile/workspace/remindme/front/views/page_view.coffee":[function(require,module,exports){
var Page,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Page = (function(_super) {
  __extends(Page, _super);

  function Page() {
    return Page.__super__.constructor.apply(this, arguments);
  }

  Page.prototype.title = 'undefined_page';

  Page.prototype.render = function() {
    console.log(this.model);
    if (this.model.get('html')) {
      this.$el.html(this.model.get('html'));
    }
    return console.log('nothing to render', this);
  };

  return Page;

})(Backbone.View);

module.exports = Page;



},{}]},{},["/home/emile/workspace/remindme/front/main.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L2NvbGxlY3Rpb25zL3BhZ2VzLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC9tYWluLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC9tb2RlbHMvYWJvdXRfcGFnZS5jb2ZmZWUiLCIvaG9tZS9lbWlsZS93b3Jrc3BhY2UvcmVtaW5kbWUvZnJvbnQvbW9kZWxzL3BhZ2UuY29mZmVlIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L21vZGVscy9yZW1pbmRtZV9wYWdlLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC92aWV3cy9oZWFkZXIuY29mZmVlIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L3ZpZXdzL3BhZ2Vfdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLFdBQUE7RUFBQTtpU0FBQTs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLHVCQUFSLENBQVAsQ0FBQTs7QUFBQTtBQUlJLDBCQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSxrQkFBQSxLQUFBLEdBQU8sSUFBUCxDQUFBOztlQUFBOztHQUZnQixRQUFRLENBQUMsV0FGN0IsQ0FBQTs7QUFBQSxNQVFNLENBQUMsT0FBUCxHQUFpQixLQVJqQixDQUFBOzs7OztBQ0FBLElBQUE7aVNBQUE7O0FBQUEsQ0FBQSxDQUFFLFNBQUEsR0FBQTtBQUNFO0FBQUE7OztLQUFBO0FBQUEsTUFBQSx5REFBQTtBQUFBLEVBUUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSx1QkFBUixDQVJULENBQUE7QUFBQSxFQVNB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QyxFQUxJO0VBQUEsQ0FGUixDQUFBOztjQUFBOztHQUZlLFFBQVEsQ0FBQyxLQUE1QixDQUFBOztBQUFBLE1BWU0sQ0FBQyxPQUFQLEdBQWlCLElBWmpCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiUGFnZSA9IHJlcXVpcmUgJy4uL21vZGVscy9wYWdlLmNvZmZlZSdcblxuY2xhc3MgUGFnZXMgZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG5cbiAgICBtb2RlbDogUGFnZVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlc1xuIiwiJCAtPlxuICAgICMjI1xuICAgIGFsbCBjbGFzcyBkZWYgbXVzdCBiZSBlbmNhcHN1bGF0ZWQgaW5zaWRlICQucmVhZHkoKVxuICAgIG90aGVyd2lzZSB0ZW1wbGF0ZXMgZnJvbSBwYWdlLmh0bWwgd29uJ3QgYmUgYXZhaWxhYmxlLlxuICAgICMjI1xuICAgIFxuICAgICNGb3JtVmlldyA9IHJlcXVpcmUgJy4vdmlld3MvZm9ybV92aWV3LmNvZmZlZSdcbiAgICAjRm9ybSA9IHJlcXVpcmUgJy4vbW9kZWxzL2Zvcm0uY29mZmVlJ1xuXG4gICAgSGVhZGVyID0gcmVxdWlyZSAnLi92aWV3cy9oZWFkZXIuY29mZmVlJ1xuICAgIFBhZ2VzID0gcmVxdWlyZSAnLi9jb2xsZWN0aW9ucy9wYWdlcy5jb2ZmZWUnXG4gICAgUmVtaW5kbWVQYWdlID0gcmVxdWlyZSAnLi9tb2RlbHMvcmVtaW5kbWVfcGFnZS5jb2ZmZWUnXG4gICAgQWJvdXRQYWdlID0gcmVxdWlyZSAnLi9tb2RlbHMvYWJvdXRfcGFnZS5jb2ZmZWUnXG4gICAgUGFnZVZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL3BhZ2Vfdmlldy5jb2ZmZWUnXG5cblxuICAgIGNsYXNzIEFwcFZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICAgICAgZWw6ICcjcGFnZSdcblxuICAgICAgICBldmVudHM6XG4gICAgICAgICAgICAnY2hhbmdlUGFnZSc6ICdvbkNoYW5nZVBhZ2UnXG5cbiAgICAgICAgaW5pdGlhbGl6ZTogLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdJbml0aWFsaXppbmcgYXBwJ1xuXG4gICAgICAgICAgICByZW1pbmRtZSA9IG5ldyBSZW1pbmRtZVBhZ2UoKVxuICAgICAgICAgICAgYWJvdXQgPSBuZXcgQWJvdXRQYWdlKClcbiAgICAgICAgICAgIEBwYWdlcyA9IG5ldyBQYWdlcyhbcmVtaW5kbWUsIGFib3V0XSlcbiAgICAgICAgICAgIEBoZWFkZXIgPSBuZXcgSGVhZGVyKClcblxuICAgICAgICAgICAgQGluaXRMaXN0ZW5lcigpXG5cblxuICAgICAgICBpbml0TGlzdGVuZXI6IC0+XG4gICAgICAgICAgICBfYXBwID0gQFxuICAgICAgICAgICAgQmFja2JvbmUub24gJ2FsbCcsIChuYW1lKS0+XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgYXJndW1lbnRzXG4gICAgICAgICAgICAgICAgX2FwcFtuYW1lXS5hcHBseShfYXBwLCBhcmd1bWVudHMpXG5cbiAgICAgICAgc2hvd0ZpcnN0UGFnZTogLT5cbiAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ2NoYW5nZVBhZ2UnLCBAcGFnZXMuZmlyc3QoKVxuXG4gICAgICAgIHJlbmRlcjogLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdSZW5kZXJpbmcgYXBwbGljYXRpb24uJ1xuICAgICAgICAgICAgQGhlYWRlci5yZW5kZXIoKVxuXG4gICAgICAgIGNoYW5nZVBhZ2U6IChlLCBwYWdlKS0+XG4gICAgICAgICAgICBAYWN0aXZlID0gcGFnZVxuICAgICAgICAgICAgcGFnZVZpZXcgPSBuZXcgUGFnZVZpZXdcbiAgICAgICAgICAgICAgICBtb2RlbDogcGFnZVxuICAgICAgICAgICAgcGFnZVZpZXcucmVuZGVyKClcbiAgICAgICAgICAgIEAkZWwuaHRtbCBwYWdlVmlldy5lbFxuICAgICAgICAgICAgQGhlYWRlci5yZW5kZXJMaW5rcygpXG5cbiAgICAgICAgYWN0aXZlUGFnZTogLT5cbiAgICAgICAgICAgIEBhY3RpdmVcblxuXG4gICAgd2luZG93LmFwcCA9IG5ldyBBcHBWaWV3KClcbiAgICB3aW5kb3cuYXBwLnJlbmRlcigpXG4gICAgd2luZG93LmFwcC5zaG93Rmlyc3RQYWdlKClcbiIsIlBhZ2UgPSByZXF1aXJlICcuL3BhZ2UuY29mZmVlJ1xuXG5jbGFzcyBBYm91dG1lUGFnZSBleHRlbmRzIFBhZ2VcbiAgICBcbiAgICBkZWZhdWx0czogLT5cbiAgICAgICAgJ3RpdGxlJzogJ0Fib3V0J1xuICAgICAgICAnaHRtbCc6ICdcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEhleSwgaVxcJ20gWm96b3IuIENoZWNrIG91dCBteSBnaXRodWIgPGEgaHJlZj1cImh0dHA6Ly9naXRodWIuY29tL2VtaWxlY2Fyb25cIj5oZXJlPC9hPiFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwPlRoaXMgYXBwIHdhcyBidWlsdCB1c2luZyA8YSBocmVmPVwiaHR0cDovL2ZsYXNrLnBvY29vLm9yZy9cIj5GbGFzazwvYT4sIDxhIGhyZWY9XCJodHRwOi8vYmFja2JvbmVqcy5vcmcvXCI+QmFja2JvbmU8L2E+LCA8YSBocmVmPVwiaHR0cDovL2dldGJvb3RzdHJhcC5jb20vXCI+Qm9vdHN0cmFwPC9hPiBhbmQgbW9yZS48L3A+XG4gICAgICAgICdcblxubW9kdWxlLmV4cG9ydHMgPSBBYm91dG1lUGFnZSIsIlxuY2xhc3MgUGFnZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cbiAgICBkZWZhdWx0czpcbiAgICAgICAgdGl0bGU6ICd1bnRpdGxlZCBwYWdlJ1xuICAgICAgICBhY3RpdmU6IGZhbHNlXG5cbiAgICBpc0FjdGl2ZTogLT5cbiAgICAgICAgQGdldCgnYWN0aXZlJylcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZVxuIiwiXG5QYWdlID0gcmVxdWlyZSAnLi9wYWdlLmNvZmZlZSdcblxuY2xhc3MgUmVtaW5kbWVQYWdlIGV4dGVuZHMgUGFnZVxuICAgIFxuICAgIGRlZmF1bHRzOiAtPlxuICAgICAgICAndGl0bGUnOiAnUmVtaW5kIG1lJ1xuICAgICAgICAnaHRtbCc6ICc8aDE+SGVsbG8gd29ybGQhPC9oMT4nXG5cbm1vZHVsZS5leHBvcnRzID0gUmVtaW5kbWVQYWdlXG4iLCJcbmNsYXNzIEhlYWRlciBleHRlbmRzIEJhY2tib25lLlZpZXdcblxuICAgIGVsOiAnI2hlYWRlcidcblxuICAgIHVpOlxuICAgICAgICBsaW5rczogJyNoZWFkZXItbGlua3MnXG5cbiAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZSAkKCcjaGVhZGVyLXRlbXBsYXRlJykuaHRtbCgpXG5cbiAgICByZW5kZXI6IC0+XG4gICAgICAgIEAkZWwuaHRtbCBAdGVtcGxhdGVcbiAgICAgICAgQHJlbmRlckxpbmtzKClcblxuICAgIHJlbmRlckxpbmtzOiAtPlxuICAgICAgICBfZWwgPSAkIEB1aS5saW5rc1xuICAgICAgICBfZWwuaHRtbCAnJ1xuXG4gICAgICAgIHdpbmRvdy5hcHAucGFnZXMuZm9yRWFjaCAocGFnZSkgLT5cbiAgICAgICAgICAgbGlua1ZpZXcgPSBuZXcgUGFnZUxpbmtWaWV3XG4gICAgICAgICAgICAgICAgbW9kZWw6IHBhZ2VcbiAgICAgICAgICAgX2VsLmFwcGVuZCBsaW5rVmlldy5yZW5kZXIoKS5lbFxuXG5cbmNsYXNzIFBhZ2VMaW5rVmlldyBleHRlbmRzIEJhY2tib25lLlZpZXdcbiAgICB0YWdOYW1lOiAnbGknXG5cbiAgICBldmVudHM6XG4gICAgICAgICdjbGljayc6ICdvbkNsaWNrJ1xuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBAJGVsLmh0bWwgXCI8YT5cIiArIEBtb2RlbC5nZXQoJ3RpdGxlJykgKyBcIjwvYT5cIlxuICAgICAgICBpZiBAbW9kZWwgPT0gd2luZG93LmFwcC5hY3RpdmVQYWdlKClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nICd5ZXMnXG4gICAgICAgICAgICBAJGVsLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICAgIEBcblxuICAgIG9uQ2xpY2s6IC0+XG4gICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ2NoYW5nZVBhZ2UnLCBAbW9kZWxcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyXG4iLCJcbmNsYXNzIFBhZ2UgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICB0aXRsZTogJ3VuZGVmaW5lZF9wYWdlJ1xuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICAjIFNpbXBsZSBwYWdlXG4gICAgICAgIGNvbnNvbGUubG9nIEBtb2RlbFxuICAgICAgICBpZiBAbW9kZWwuZ2V0KCdodG1sJylcbiAgICAgICAgICAgIEAkZWwuaHRtbCBAbW9kZWwuZ2V0KCdodG1sJylcbiAgICAgICAgY29uc29sZS5sb2cgJ25vdGhpbmcgdG8gcmVuZGVyJywgQFxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZVxuIl19
