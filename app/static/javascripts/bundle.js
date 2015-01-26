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

    AppView.prototype.render = function() {
      console.log('Rendering application.');
      return this.header.render();
    };

    AppView.prototype.changePage = function(e, page) {
      var pageView;
      this.active = page;
      console.log('AAAA', this.active);
      pageView = new PageView({
        model: page
      });
      pageView.render();
      this.$el.html(pageView.el);
      return this.header.render();
    };

    AppView.prototype.activePage = function() {
      console.log('ac', this.active);
      return this.active;
    };

    AppView.prototype.showFirstPage = function() {
      return Backbone.trigger('changePage', this.pages.first());
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
    console.log('good', this);
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
    console.log('yolo', window.app.activePage(), this.model);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L2NvbGxlY3Rpb25zL3BhZ2VzLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC9tYWluLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC9tb2RlbHMvYWJvdXRfcGFnZS5jb2ZmZWUiLCIvaG9tZS9lbWlsZS93b3Jrc3BhY2UvcmVtaW5kbWUvZnJvbnQvbW9kZWxzL3BhZ2UuY29mZmVlIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L21vZGVscy9yZW1pbmRtZV9wYWdlLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC92aWV3cy9oZWFkZXIuY29mZmVlIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L3ZpZXdzL3BhZ2Vfdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLFdBQUE7RUFBQTtpU0FBQTs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLHVCQUFSLENBQVAsQ0FBQTs7QUFBQTtBQUlJLDBCQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSxrQkFBQSxLQUFBLEdBQU8sSUFBUCxDQUFBOztlQUFBOztHQUZnQixRQUFRLENBQUMsV0FGN0IsQ0FBQTs7QUFBQSxNQVFNLENBQUMsT0FBUCxHQUFpQixLQVJqQixDQUFBOzs7OztBQ0FBLElBQUE7aVNBQUE7O0FBQUEsQ0FBQSxDQUFFLFNBQUEsR0FBQTtBQUNFO0FBQUE7OztLQUFBO0FBQUEsTUFBQSx5REFBQTtBQUFBLEVBUUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSx1QkFBUixDQVJULENBQUE7QUFBQSxFQVNB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LEtBQUEsR0FBTyxnQkFBUCxDQUFBOztBQUFBLGlCQUVBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFFSixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBQyxDQUFBLEtBQWIsQ0FBQSxDQUFBO0FBQ0EsSUFBQSxJQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLE1BQVgsQ0FBSDtBQUNJLE1BQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsTUFBWCxDQUFWLENBQUEsQ0FESjtLQURBO1dBR0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxJQUFqQyxFQUxJO0VBQUEsQ0FGUixDQUFBOztjQUFBOztHQUZlLFFBQVEsQ0FBQyxLQUE1QixDQUFBOztBQUFBLE1BWU0sQ0FBQyxPQUFQLEdBQWlCLElBWmpCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiUGFnZSA9IHJlcXVpcmUgJy4uL21vZGVscy9wYWdlLmNvZmZlZSdcblxuY2xhc3MgUGFnZXMgZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG5cbiAgICBtb2RlbDogUGFnZVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlc1xuIiwiJCAtPlxuICAgICMjI1xuICAgIGFsbCBjbGFzcyBkZWYgbXVzdCBiZSBlbmNhcHN1bGF0ZWQgaW5zaWRlICQucmVhZHkoKVxuICAgIG90aGVyd2lzZSB0ZW1wbGF0ZXMgZnJvbSBwYWdlLmh0bWwgd29uJ3QgYmUgYXZhaWxhYmxlLlxuICAgICMjI1xuICAgIFxuICAgICNGb3JtVmlldyA9IHJlcXVpcmUgJy4vdmlld3MvZm9ybV92aWV3LmNvZmZlZSdcbiAgICAjRm9ybSA9IHJlcXVpcmUgJy4vbW9kZWxzL2Zvcm0uY29mZmVlJ1xuXG4gICAgSGVhZGVyID0gcmVxdWlyZSAnLi92aWV3cy9oZWFkZXIuY29mZmVlJ1xuICAgIFBhZ2VzID0gcmVxdWlyZSAnLi9jb2xsZWN0aW9ucy9wYWdlcy5jb2ZmZWUnXG4gICAgUmVtaW5kbWVQYWdlID0gcmVxdWlyZSAnLi9tb2RlbHMvcmVtaW5kbWVfcGFnZS5jb2ZmZWUnXG4gICAgQWJvdXRQYWdlID0gcmVxdWlyZSAnLi9tb2RlbHMvYWJvdXRfcGFnZS5jb2ZmZWUnXG4gICAgUGFnZVZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL3BhZ2Vfdmlldy5jb2ZmZWUnXG5cblxuICAgIGNsYXNzIEFwcFZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICAgICAgZWw6ICcjcGFnZSdcblxuICAgICAgICBldmVudHM6XG4gICAgICAgICAgICAnY2hhbmdlUGFnZSc6ICdvbkNoYW5nZVBhZ2UnXG5cbiAgICAgICAgaW5pdGlhbGl6ZTogLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdJbml0aWFsaXppbmcgYXBwJ1xuXG4gICAgICAgICAgICByZW1pbmRtZSA9IG5ldyBSZW1pbmRtZVBhZ2UoKVxuICAgICAgICAgICAgYWJvdXQgPSBuZXcgQWJvdXRQYWdlKClcbiAgICAgICAgICAgIEBwYWdlcyA9IG5ldyBQYWdlcyhbcmVtaW5kbWUsIGFib3V0XSlcbiAgICAgICAgICAgIEBoZWFkZXIgPSBuZXcgSGVhZGVyKClcblxuICAgICAgICAgICAgQGluaXRMaXN0ZW5lcigpXG5cblxuICAgICAgICBpbml0TGlzdGVuZXI6IC0+XG4gICAgICAgICAgICBfYXBwID0gQFxuICAgICAgICAgICAgQmFja2JvbmUub24gJ2FsbCcsIChuYW1lKS0+XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgYXJndW1lbnRzXG4gICAgICAgICAgICAgICAgX2FwcFtuYW1lXS5hcHBseShfYXBwLCBhcmd1bWVudHMpXG5cbiAgICAgICAgcmVuZGVyOiAtPlxuICAgICAgICAgICAgY29uc29sZS5sb2cgJ1JlbmRlcmluZyBhcHBsaWNhdGlvbi4nXG4gICAgICAgICAgICBAaGVhZGVyLnJlbmRlcigpXG5cbiAgICAgICAgY2hhbmdlUGFnZTogKGUsIHBhZ2UpLT5cbiAgICAgICAgICAgIEBhY3RpdmUgPSBwYWdlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnQUFBQScsIEBhY3RpdmVcbiAgICAgICAgICAgIHBhZ2VWaWV3ID0gbmV3IFBhZ2VWaWV3XG4gICAgICAgICAgICAgICAgbW9kZWw6IHBhZ2VcbiAgICAgICAgICAgIHBhZ2VWaWV3LnJlbmRlcigpXG4gICAgICAgICAgICBAJGVsLmh0bWwgcGFnZVZpZXcuZWxcbiAgICAgICAgICAgIEBoZWFkZXIucmVuZGVyKClcblxuICAgICAgICBhY3RpdmVQYWdlOiAtPlxuICAgICAgICAgICAgY29uc29sZS5sb2cgJ2FjJywgQGFjdGl2ZVxuICAgICAgICAgICAgQGFjdGl2ZVxuXG4gICAgICAgIHNob3dGaXJzdFBhZ2U6IC0+XG4gICAgICAgICAgICBCYWNrYm9uZS50cmlnZ2VyICdjaGFuZ2VQYWdlJywgQHBhZ2VzLmZpcnN0KClcblxuXG4gICAgd2luZG93LmFwcCA9IG5ldyBBcHBWaWV3KClcbiAgICB3aW5kb3cuYXBwLnJlbmRlcigpXG4gICAgd2luZG93LmFwcC5zaG93Rmlyc3RQYWdlKClcblxuIiwiUGFnZSA9IHJlcXVpcmUgJy4vcGFnZS5jb2ZmZWUnXG5cbmNsYXNzIEFib3V0bWVQYWdlIGV4dGVuZHMgUGFnZVxuICAgIFxuICAgIGRlZmF1bHRzOiAtPlxuICAgICAgICAndGl0bGUnOiAnQWJvdXQnXG4gICAgICAgICdodG1sJzogJ1xuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgSGV5LCBpXFwnbSBab3pvci4gQ2hlY2sgb3V0IG15IGdpdGh1YiA8YSBocmVmPVwiaHR0cDovL2dpdGh1Yi5jb20vZW1pbGVjYXJvblwiPmhlcmU8L2E+IVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPHA+VGhpcyBhcHAgd2FzIGJ1aWx0IHVzaW5nIDxhIGhyZWY9XCJodHRwOi8vZmxhc2sucG9jb28ub3JnL1wiPkZsYXNrPC9hPiwgPGEgaHJlZj1cImh0dHA6Ly9iYWNrYm9uZWpzLm9yZy9cIj5CYWNrYm9uZTwvYT4sIDxhIGhyZWY9XCJodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9cIj5Cb290c3RyYXA8L2E+IGFuZCBtb3JlLjwvcD5cbiAgICAgICAgJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFib3V0bWVQYWdlIiwiXG5jbGFzcyBQYWdlIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblxuICAgIGRlZmF1bHRzOlxuICAgICAgICB0aXRsZTogJ3VudGl0bGVkIHBhZ2UnXG4gICAgICAgIGFjdGl2ZTogZmFsc2VcblxuICAgIGlzQWN0aXZlOiAtPlxuICAgICAgICBAZ2V0KCdhY3RpdmUnKVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlXG4iLCJcblBhZ2UgPSByZXF1aXJlICcuL3BhZ2UuY29mZmVlJ1xuXG5jbGFzcyBSZW1pbmRtZVBhZ2UgZXh0ZW5kcyBQYWdlXG4gICAgXG4gICAgZGVmYXVsdHM6IC0+XG4gICAgICAgICd0aXRsZSc6ICdSZW1pbmQgbWUnXG4gICAgICAgICdodG1sJzogJzxoMT5IZWxsbyB3b3JsZCE8L2gxPidcblxubW9kdWxlLmV4cG9ydHMgPSBSZW1pbmRtZVBhZ2VcbiIsIlxuY2xhc3MgSGVhZGVyIGV4dGVuZHMgQmFja2JvbmUuVmlld1xuXG4gICAgZWw6ICcjaGVhZGVyJ1xuXG4gICAgdWk6XG4gICAgICAgIGxpbmtzOiAnI2hlYWRlci1saW5rcydcblxuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlICQoJyNoZWFkZXItdGVtcGxhdGUnKS5odG1sKClcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQCRlbC5odG1sIEB0ZW1wbGF0ZVxuICAgICAgICBAcmVuZGVyTGlua3MoKVxuXG4gICAgcmVuZGVyTGlua3M6IC0+XG4gICAgICAgIF9lbCA9ICQgQHVpLmxpbmtzXG4gICAgICAgIF9lbC5odG1sICcnXG5cbiAgICAgICAgY29uc29sZS5sb2cgJ2dvb2QnLCBAXG4gICAgICAgIHdpbmRvdy5hcHAucGFnZXMuZm9yRWFjaCAocGFnZSkgLT5cbiAgICAgICAgICAgbGlua1ZpZXcgPSBuZXcgUGFnZUxpbmtWaWV3XG4gICAgICAgICAgICAgICAgbW9kZWw6IHBhZ2VcbiAgICAgICAgICAgX2VsLmFwcGVuZCBsaW5rVmlldy5yZW5kZXIoKS5lbFxuXG5cbmNsYXNzIFBhZ2VMaW5rVmlldyBleHRlbmRzIEJhY2tib25lLlZpZXdcbiAgICB0YWdOYW1lOiAnbGknXG5cbiAgICBldmVudHM6XG4gICAgICAgICdjbGljayc6ICdvbkNsaWNrJ1xuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBAJGVsLmh0bWwgXCI8YT5cIiArIEBtb2RlbC5nZXQoJ3RpdGxlJykgKyBcIjwvYT5cIlxuICAgICAgICBjb25zb2xlLmxvZyAneW9sbycsIHdpbmRvdy5hcHAuYWN0aXZlUGFnZSgpLCBAbW9kZWxcbiAgICAgICAgaWYgQG1vZGVsID09IHdpbmRvdy5hcHAuYWN0aXZlUGFnZSgpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAneWVzJ1xuICAgICAgICAgICAgQCRlbC5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgICAgICBAXG5cbiAgICBvbkNsaWNrOiAtPlxuICAgICAgICBCYWNrYm9uZS50cmlnZ2VyICdjaGFuZ2VQYWdlJywgQG1vZGVsXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclxuIiwiXG5jbGFzcyBQYWdlIGV4dGVuZHMgQmFja2JvbmUuVmlld1xuXG4gICAgdGl0bGU6ICd1bmRlZmluZWRfcGFnZSdcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgIyBTaW1wbGUgcGFnZVxuICAgICAgICBjb25zb2xlLmxvZyBAbW9kZWxcbiAgICAgICAgaWYgQG1vZGVsLmdldCgnaHRtbCcpXG4gICAgICAgICAgICBAJGVsLmh0bWwgQG1vZGVsLmdldCgnaHRtbCcpXG4gICAgICAgIGNvbnNvbGUubG9nICdub3RoaW5nIHRvIHJlbmRlcicsIEBcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VcbiJdfQ==
