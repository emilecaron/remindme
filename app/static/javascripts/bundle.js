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
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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
        console.log('Event caught:', name, arguments);
        if (__indexOf.call(_.functions(_app), name) >= 0) {
          return _app[name].apply(_app, arguments);
        }
      });
    };

    AppView.prototype.showFirstPage = function() {
      return Backbone.trigger('changePage', this.pages.first());
    };

    AppView.prototype.render = function() {
      console.log('Rendering application.');
      this.header.render();
      return Backbone.trigger('rendered');
    };

    AppView.prototype.changePage = function(e, page) {
      var pageView;
      console.log('changepage');
      this.active = page;
      pageView = new PageView({
        model: page
      });
      pageView.render();
      this.$el.html(pageView.el);
      this.header.renderLinks();
      return Backbone.trigger('rendered');
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



},{"./collections/pages.coffee":"/home/emile/personal/remindme/front/collections/pages.coffee","./models/about_page.coffee":"/home/emile/personal/remindme/front/models/about_page.coffee","./models/remindme_page.coffee":"/home/emile/personal/remindme/front/models/remindme_page.coffee","./views/header.coffee":"/home/emile/personal/remindme/front/views/header.coffee","./views/page_view.coffee":"/home/emile/personal/remindme/front/views/page_view.coffee"}],"/home/emile/personal/remindme/front/models/about_page.coffee":[function(require,module,exports){
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



},{"./page.coffee":"/home/emile/personal/remindme/front/models/page.coffee"}],"/home/emile/personal/remindme/front/models/page.coffee":[function(require,module,exports){
var Page,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Page = (function(_super) {
  __extends(Page, _super);

  function Page() {
    return Page.__super__.constructor.apply(this, arguments);
  }


  /*
  Pages should extend this class
  Every page should have:
      - An html attribute which will be rendered directly
          OR
      - A set of functions in page.panels object.
        Template with same id as the functions name will be loaded
        Code from the function will be executed when panel is rendered
   */

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

  RemindmePage.prototype.defaults = function() {
    return {
      title: 'Remind me',
      panels: {
        'rme_welcome': function() {
          return $('#no_button').click(function() {
            return Backbone.trigger('switchPanel', 'rme_date');
          });
        },
        'rme_date': function() {
          return $('.datepicker').datepicker().on('changeDate', function(e) {
            Backbone.trigger('setPageData', {
              'date': e.date
            });
            return Backbone.trigger('switchPanel', 'rme_email');
          });
        },
        'rme_email': function() {
          return console.log(pageData);
        }
      }
    };
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
    if (!this.fg) {
      this.fb_html = $('.fb-share-button').html();
    }
    this.$el.html(this.template);
    $('.fb-share-button').html(this.fb_html);
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



},{}],"/home/emile/personal/remindme/front/views/page_view.coffee":[function(require,module,exports){
var Page, PanelView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

PanelView = require('./panel_view.coffee');

Page = (function(_super) {
  __extends(Page, _super);

  function Page() {
    return Page.__super__.constructor.apply(this, arguments);
  }

  Page.prototype.title = 'undefined_page';

  Page.prototype.initialize = function() {
    var panels;
    Backbone.on('switchPanel', this.switchPanel, this);
    Backbone.on('rendered', this.loadPanelJs, this);
    Backbone.on('setPageData', function(data) {
      return console.log('setData', data, this);
    });
    panels = this.model.get('panels');
    if (panels) {
      return this.switchPanel(_.first(_.keys(panels)));
    }
  };

  Page.prototype.render = function() {
    if (this.model.get('html')) {
      this.renderHtml();
    }
    if (this.model.get('activePanel')) {
      this.renderActivePanel();
    }
    return Backbone.trigger('rendered');
  };

  Page.prototype.renderHtml = function() {
    return this.$el.html(this.model.get('html'));
  };

  Page.prototype.renderActivePanel = function() {
    return this.$el.html(this.model.get('activePanel').render().el);
  };

  Page.prototype.switchPanel = function(name) {
    var activePanel, js;
    if (__indexOf.call(_.functions(this.model.get('panels')), name) >= 0) {
      activePanel = new PanelView();
      js = (this.model.get('panels'))[name] || null;
      activePanel.setTemplateFromId(name, js);
      this.model.set('activePanel', activePanel);
      return this.render();
    }
  };

  Page.prototype.loadPanelJs = function() {
    var pageData, pan;
    console.log('handler', this.model);
    pageData = {
      yo: 'lo'
    };
    pan = this.model.get('activePanel');
    if (pan) {
      return pan.loadJs();
    }
  };

  return Page;

})(Backbone.View);

module.exports = Page;



},{"./panel_view.coffee":"/home/emile/personal/remindme/front/views/panel_view.coffee"}],"/home/emile/personal/remindme/front/views/panel_view.coffee":[function(require,module,exports){
var Panel, PanelView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PanelView = require('./panel_view.coffee');

Panel = (function(_super) {
  __extends(Panel, _super);

  function Panel() {
    return Panel.__super__.constructor.apply(this, arguments);
  }

  Panel.prototype.render = function() {
    console.log('rendering panel', this.template());
    this.$el.html(this.template());
    return this;
  };

  Panel.prototype.setTemplateFromId = function(id, js) {
    this.template = _.template($('#' + id).html());
    this.loadJs = js;
    return console.log('js', js);
  };

  return Panel;

})(Backbone.View);

module.exports = Panel;



},{"./panel_view.coffee":"/home/emile/personal/remindme/front/views/panel_view.coffee"}]},{},["/home/emile/personal/remindme/front/main.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvZW1pbGUvcGVyc29uYWwvcmVtaW5kbWUvZnJvbnQvY29sbGVjdGlvbnMvcGFnZXMuY29mZmVlIiwiL2hvbWUvZW1pbGUvcGVyc29uYWwvcmVtaW5kbWUvZnJvbnQvbWFpbi5jb2ZmZWUiLCIvaG9tZS9lbWlsZS9wZXJzb25hbC9yZW1pbmRtZS9mcm9udC9tb2RlbHMvYWJvdXRfcGFnZS5jb2ZmZWUiLCIvaG9tZS9lbWlsZS9wZXJzb25hbC9yZW1pbmRtZS9mcm9udC9tb2RlbHMvcGFnZS5jb2ZmZWUiLCIvaG9tZS9lbWlsZS9wZXJzb25hbC9yZW1pbmRtZS9mcm9udC9tb2RlbHMvcmVtaW5kbWVfcGFnZS5jb2ZmZWUiLCIvaG9tZS9lbWlsZS9wZXJzb25hbC9yZW1pbmRtZS9mcm9udC92aWV3cy9oZWFkZXIuY29mZmVlIiwiL2hvbWUvZW1pbGUvcGVyc29uYWwvcmVtaW5kbWUvZnJvbnQvdmlld3MvcGFnZV92aWV3LmNvZmZlZSIsIi9ob21lL2VtaWxlL3BlcnNvbmFsL3JlbWluZG1lL2Zyb250L3ZpZXdzL3BhbmVsX3ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSxXQUFBO0VBQUE7aVNBQUE7O0FBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSx1QkFBUixDQUFQLENBQUE7O0FBQUE7QUFJSSwwQkFBQSxDQUFBOzs7O0dBQUE7O0FBQUEsa0JBQUEsS0FBQSxHQUFPLElBQVAsQ0FBQTs7ZUFBQTs7R0FGZ0IsUUFBUSxDQUFDLFdBRjdCLENBQUE7O0FBQUEsTUFRTSxDQUFDLE9BQVAsR0FBaUIsS0FSakIsQ0FBQTs7Ozs7QUNBQSxJQUFBOzt1SkFBQTs7QUFBQSxDQUFBLENBQUUsU0FBQSxHQUFBO0FBQ0U7QUFBQTs7O0tBQUE7QUFBQSxNQUFBLHlEQUFB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QSxDQS9CYixDQUFBOztjQUFBOztHQUZlLFFBQVEsQ0FBQyxLQUY1QixDQUFBOztBQUFBLE1BNENNLENBQUMsT0FBUCxHQUFpQixJQTVDakIsQ0FBQTs7Ozs7QUNBQSxJQUFBLGdCQUFBO0VBQUE7aVNBQUE7O0FBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxxQkFBUixDQUFaLENBQUE7O0FBQUE7QUFJSSwwQkFBQSxDQUFBOzs7O0dBQUE7O0FBQUEsa0JBQUEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNKLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQixJQUFDLENBQUEsUUFBRCxDQUFBLENBQS9CLENBQUEsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsSUFBQyxDQUFBLFFBQUQsQ0FBQSxDQUFWLENBREEsQ0FBQTtXQUVBLEtBSEk7RUFBQSxDQUFSLENBQUE7O0FBQUEsa0JBS0EsaUJBQUEsR0FBbUIsU0FBQyxFQUFELEVBQUssRUFBTCxHQUFBO0FBQ2YsSUFBQSxJQUFDLENBQUEsUUFBRCxHQUFZLENBQUMsQ0FBQyxRQUFGLENBQVcsQ0FBQSxDQUFFLEdBQUEsR0FBTSxFQUFSLENBQVcsQ0FBQyxJQUFaLENBQUEsQ0FBWCxDQUFaLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsRUFEVixDQUFBO1dBRUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaLEVBQWtCLEVBQWxCLEVBSGU7RUFBQSxDQUxuQixDQUFBOztlQUFBOztHQUZnQixRQUFRLENBQUMsS0FGN0IsQ0FBQTs7QUFBQSxNQWVNLENBQUMsT0FBUCxHQUFpQixLQWZqQixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlBhZ2UgPSByZXF1aXJlICcuLi9tb2RlbHMvcGFnZS5jb2ZmZWUnXG5cbmNsYXNzIFBhZ2VzIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuXG4gICAgbW9kZWw6IFBhZ2VcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZXNcbiIsIiQgLT5cbiAgICAjIyNcbiAgICBhbGwgY2xhc3MgZGVmIG11c3QgYmUgZW5jYXBzdWxhdGVkIGluc2lkZSAkLnJlYWR5KClcbiAgICBvdGhlcndpc2UgdGVtcGxhdGVzIGZyb20gcGFnZS5odG1sIHdvbid0IGJlIGF2YWlsYWJsZS5cbiAgICAjIyNcbiAgICBcbiAgICAjRm9ybVZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL2Zvcm1fdmlldy5jb2ZmZWUnXG4gICAgI0Zvcm0gPSByZXF1aXJlICcuL21vZGVscy9mb3JtLmNvZmZlZSdcblxuICAgIEhlYWRlciA9IHJlcXVpcmUgJy4vdmlld3MvaGVhZGVyLmNvZmZlZSdcbiAgICBQYWdlcyA9IHJlcXVpcmUgJy4vY29sbGVjdGlvbnMvcGFnZXMuY29mZmVlJ1xuICAgIFJlbWluZG1lUGFnZSA9IHJlcXVpcmUgJy4vbW9kZWxzL3JlbWluZG1lX3BhZ2UuY29mZmVlJ1xuICAgIEFib3V0UGFnZSA9IHJlcXVpcmUgJy4vbW9kZWxzL2Fib3V0X3BhZ2UuY29mZmVlJ1xuICAgIFBhZ2VWaWV3ID0gcmVxdWlyZSAnLi92aWV3cy9wYWdlX3ZpZXcuY29mZmVlJ1xuXG5cbiAgICBjbGFzcyBBcHBWaWV3IGV4dGVuZHMgQmFja2JvbmUuVmlld1xuXG4gICAgICAgIGVsOiAnI3BhZ2UnXG5cbiAgICAgICAgZXZlbnRzOlxuICAgICAgICAgICAgJ2NoYW5nZVBhZ2UnOiAnb25DaGFuZ2VQYWdlJ1xuXG4gICAgICAgIGluaXRpYWxpemU6IC0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnSW5pdGlhbGl6aW5nIGFwcCdcblxuICAgICAgICAgICAgcmVtaW5kbWUgPSBuZXcgUmVtaW5kbWVQYWdlKClcbiAgICAgICAgICAgIGFib3V0ID0gbmV3IEFib3V0UGFnZSgpXG4gICAgICAgICAgICBAcGFnZXMgPSBuZXcgUGFnZXMoW3JlbWluZG1lLCBhYm91dF0pXG4gICAgICAgICAgICBAaGVhZGVyID0gbmV3IEhlYWRlcigpXG5cbiAgICAgICAgICAgIEBpbml0TGlzdGVuZXIoKVxuXG5cbiAgICAgICAgaW5pdExpc3RlbmVyOiAtPlxuICAgICAgICAgICAgX2FwcCA9IEBcbiAgICAgICAgICAgIEJhY2tib25lLm9uICdhbGwnLCAobmFtZSktPlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdFdmVudCBjYXVnaHQ6JywgbmFtZSwgYXJndW1lbnRzXG4gICAgICAgICAgICAgICAgaWYgbmFtZSBpbiBfLmZ1bmN0aW9ucyhfYXBwKVxuICAgICAgICAgICAgICAgICAgICBfYXBwW25hbWVdLmFwcGx5IF9hcHAsIGFyZ3VtZW50c1xuXG4gICAgICAgIHNob3dGaXJzdFBhZ2U6IC0+XG4gICAgICAgICAgICBCYWNrYm9uZS50cmlnZ2VyICdjaGFuZ2VQYWdlJywgQHBhZ2VzLmZpcnN0KClcblxuICAgICAgICByZW5kZXI6IC0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnUmVuZGVyaW5nIGFwcGxpY2F0aW9uLidcbiAgICAgICAgICAgIEBoZWFkZXIucmVuZGVyKClcbiAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3JlbmRlcmVkJ1xuXG4gICAgICAgIGNoYW5nZVBhZ2U6IChlLCBwYWdlKS0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnY2hhbmdlcGFnZSdcbiAgICAgICAgICAgIEBhY3RpdmUgPSBwYWdlXG4gICAgICAgICAgICBwYWdlVmlldyA9IG5ldyBQYWdlVmlld1xuICAgICAgICAgICAgICAgIG1vZGVsOiBwYWdlXG4gICAgICAgICAgICBwYWdlVmlldy5yZW5kZXIoKVxuICAgICAgICAgICAgQCRlbC5odG1sIHBhZ2VWaWV3LmVsXG4gICAgICAgICAgICBAaGVhZGVyLnJlbmRlckxpbmtzKClcbiAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3JlbmRlcmVkJ1xuXG4gICAgICAgIGFjdGl2ZVBhZ2U6IC0+XG4gICAgICAgICAgICBAYWN0aXZlXG5cblxuICAgIHdpbmRvdy5hcHAgPSBuZXcgQXBwVmlldygpXG4gICAgd2luZG93LmFwcC5yZW5kZXIoKVxuICAgIHdpbmRvdy5hcHAuc2hvd0ZpcnN0UGFnZSgpXG4iLCJQYWdlID0gcmVxdWlyZSAnLi9wYWdlLmNvZmZlZSdcblxuY2xhc3MgQWJvdXRtZVBhZ2UgZXh0ZW5kcyBQYWdlXG4gICAgXG4gICAgZGVmYXVsdHM6IC0+XG4gICAgICAgICd0aXRsZSc6ICdBYm91dCdcbiAgICAgICAgJ2h0bWwnOiAnXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBIZXksIGlcXCdtIFpvem9yLiBDaGVjayBvdXQgbXkgZ2l0aHViIDxhIGhyZWY9XCJodHRwOi8vZ2l0aHViLmNvbS9lbWlsZWNhcm9uXCI+aGVyZTwvYT4hXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cD5UaGlzIGFwcCB3YXMgYnVpbHQgdXNpbmcgPGEgaHJlZj1cImh0dHA6Ly9mbGFzay5wb2Nvby5vcmcvXCI+Rmxhc2s8L2E+LCA8YSBocmVmPVwiaHR0cDovL2JhY2tib25lanMub3JnL1wiPkJhY2tib25lPC9hPiwgPGEgaHJlZj1cImh0dHA6Ly9nZXRib290c3RyYXAuY29tL1wiPkJvb3RzdHJhcDwvYT4gYW5kIG1vcmUuPC9wPlxuICAgICAgICAnXG5cbm1vZHVsZS5leHBvcnRzID0gQWJvdXRtZVBhZ2UiLCJcbmNsYXNzIFBhZ2UgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICAgICMjI1xuICAgIFBhZ2VzIHNob3VsZCBleHRlbmQgdGhpcyBjbGFzc1xuICAgIEV2ZXJ5IHBhZ2Ugc2hvdWxkIGhhdmU6XG4gICAgICAgIC0gQW4gaHRtbCBhdHRyaWJ1dGUgd2hpY2ggd2lsbCBiZSByZW5kZXJlZCBkaXJlY3RseVxuICAgICAgICAgICAgT1JcbiAgICAgICAgLSBBIHNldCBvZiBmdW5jdGlvbnMgaW4gcGFnZS5wYW5lbHMgb2JqZWN0LlxuICAgICAgICAgIFRlbXBsYXRlIHdpdGggc2FtZSBpZCBhcyB0aGUgZnVuY3Rpb25zIG5hbWUgd2lsbCBiZSBsb2FkZWRcbiAgICAgICAgICBDb2RlIGZyb20gdGhlIGZ1bmN0aW9uIHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiBwYW5lbCBpcyByZW5kZXJlZFxuICAgICMjI1xuXG4gICAgZGVmYXVsdHM6XG4gICAgICAgIHRpdGxlOiAndW50aXRsZWQgcGFnZSdcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxuXG4gICAgaXNBY3RpdmU6IC0+XG4gICAgICAgIEBnZXQoJ2FjdGl2ZScpXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VcbiIsIlxuUGFnZSA9IHJlcXVpcmUgJy4vcGFnZS5jb2ZmZWUnXG5cbmNsYXNzIFJlbWluZG1lUGFnZSBleHRlbmRzIFBhZ2VcbiAgICBcbiAgICBkZWZhdWx0czogLT5cbiAgICAgICAgdGl0bGU6ICdSZW1pbmQgbWUnXG4gICAgICAgIHBhbmVsczpcbiAgICAgICAgICAgICdybWVfd2VsY29tZSc6IC0+XG4gICAgICAgICAgICAgICAgJCgnI25vX2J1dHRvbicpLmNsaWNrIC0+XG4gICAgICAgICAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3N3aXRjaFBhbmVsJywgJ3JtZV9kYXRlJ1xuXG4gICAgICAgICAgICAncm1lX2RhdGUnOiAtPlxuICAgICAgICAgICAgICAgICQoJy5kYXRlcGlja2VyJykuZGF0ZXBpY2tlcigpLm9uICdjaGFuZ2VEYXRlJywgKGUpLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3NldFBhZ2VEYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0ZSc6IGUuZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlciAnc3dpdGNoUGFuZWwnLCAncm1lX2VtYWlsJ1xuXG4gICAgICAgICAgICAncm1lX2VtYWlsJzogLT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyBwYWdlRGF0YVxuICAgIFxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbWluZG1lUGFnZVxuIiwiXG5jbGFzcyBIZWFkZXIgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICBlbDogJyNoZWFkZXInXG5cbiAgICB1aTpcbiAgICAgICAgbGlua3M6ICcjaGVhZGVyLWxpbmtzJ1xuXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUgJCgnI2hlYWRlci10ZW1wbGF0ZScpLmh0bWwoKVxuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICAjIEF2b2lkIGxvc2luZyBmYl9idXR0b24gaHRtbFxuICAgICAgICBAZmJfaHRtbCA9ICQoJy5mYi1zaGFyZS1idXR0b24nKS5odG1sKCkgaWYgbm90IEBmZ1xuICAgICAgICBcbiAgICAgICAgQCRlbC5odG1sIEB0ZW1wbGF0ZVxuICAgICAgICAkKCcuZmItc2hhcmUtYnV0dG9uJykuaHRtbChAZmJfaHRtbClcbiAgICAgICAgQHJlbmRlckxpbmtzKClcblxuICAgIHJlbmRlckxpbmtzOiAtPlxuICAgICAgICBfZWwgPSAkIEB1aS5saW5rc1xuICAgICAgICBfZWwuaHRtbCAnJ1xuXG4gICAgICAgIHdpbmRvdy5hcHAucGFnZXMuZm9yRWFjaCAocGFnZSkgLT5cbiAgICAgICAgICAgbGlua1ZpZXcgPSBuZXcgUGFnZUxpbmtWaWV3XG4gICAgICAgICAgICAgICAgbW9kZWw6IHBhZ2VcbiAgICAgICAgICAgX2VsLmFwcGVuZCBsaW5rVmlldy5yZW5kZXIoKS5lbFxuXG5cbmNsYXNzIFBhZ2VMaW5rVmlldyBleHRlbmRzIEJhY2tib25lLlZpZXdcbiAgICB0YWdOYW1lOiAnbGknXG5cbiAgICBldmVudHM6XG4gICAgICAgICdjbGljayc6ICdvbkNsaWNrJ1xuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBAJGVsLmh0bWwgXCI8YT5cIiArIEBtb2RlbC5nZXQoJ3RpdGxlJykgKyBcIjwvYT5cIlxuICAgICAgICBpZiBAbW9kZWwgPT0gd2luZG93LmFwcC5hY3RpdmVQYWdlKClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nICd5ZXMnXG4gICAgICAgICAgICBAJGVsLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICAgIEBcblxuICAgIG9uQ2xpY2s6IC0+XG4gICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ2NoYW5nZVBhZ2UnLCBAbW9kZWxcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyXG4iLCJQYW5lbFZpZXcgPSByZXF1aXJlICcuL3BhbmVsX3ZpZXcuY29mZmVlJ1xuXG5jbGFzcyBQYWdlIGV4dGVuZHMgQmFja2JvbmUuVmlld1xuXG4gICAgdGl0bGU6ICd1bmRlZmluZWRfcGFnZSdcblxuICAgIGluaXRpYWxpemU6IC0+XG4gICAgICAgIEJhY2tib25lLm9uICdzd2l0Y2hQYW5lbCcsIEBzd2l0Y2hQYW5lbCwgQFxuICAgICAgICBCYWNrYm9uZS5vbiAncmVuZGVyZWQnLCBAbG9hZFBhbmVsSnMsIEBcbiAgICAgICAgQmFja2JvbmUub24gJ3NldFBhZ2VEYXRhJywgKGRhdGEpIC0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnc2V0RGF0YScsIGRhdGFcbiAgICAgICAgICAgICwgQFxuXG4gICAgICAgIHBhbmVscyA9IEBtb2RlbC5nZXQgJ3BhbmVscydcbiAgICAgICAgQHN3aXRjaFBhbmVsIF8uZmlyc3QgXy5rZXlzIHBhbmVscyBpZiBwYW5lbHNcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQHJlbmRlckh0bWwoKSBpZiBAbW9kZWwuZ2V0ICdodG1sJ1xuICAgICAgICBAcmVuZGVyQWN0aXZlUGFuZWwoKSBpZiBAbW9kZWwuZ2V0ICdhY3RpdmVQYW5lbCdcbiAgICAgICAgQmFja2JvbmUudHJpZ2dlciAncmVuZGVyZWQnXG4gICAgXG4gICAgcmVuZGVySHRtbDogLT5cbiAgICAgICAgQCRlbC5odG1sIEBtb2RlbC5nZXQgJ2h0bWwnXG5cbiAgICByZW5kZXJBY3RpdmVQYW5lbDogLT5cbiAgICAgICAgQCRlbC5odG1sIEBtb2RlbC5nZXQoJ2FjdGl2ZVBhbmVsJykucmVuZGVyKCkuZWxcblxuICAgIHN3aXRjaFBhbmVsOiAobmFtZSktPlxuICAgICAgICBpZiBuYW1lIGluIF8uZnVuY3Rpb25zIEBtb2RlbC5nZXQgJ3BhbmVscydcbiAgICAgICAgICAgIGFjdGl2ZVBhbmVsID0gbmV3IFBhbmVsVmlldygpXG4gICAgICAgICAgICBqcyA9IChAbW9kZWwuZ2V0ICdwYW5lbHMnKVtuYW1lXSBvciBudWxsXG4gICAgICAgICAgICBhY3RpdmVQYW5lbC5zZXRUZW1wbGF0ZUZyb21JZCBuYW1lLCBqc1xuICAgICAgICAgICAgQG1vZGVsLnNldCAnYWN0aXZlUGFuZWwnLCBhY3RpdmVQYW5lbFxuICAgICAgICAgICAgQHJlbmRlcigpXG5cbiAgICBsb2FkUGFuZWxKczogLT5cbiAgICAgICAgY29uc29sZS5sb2cgJ2hhbmRsZXInLCBAbW9kZWxcbiAgICAgICAgcGFnZURhdGEgPVxuICAgICAgICAgICAgeW86ICdsbydcbiAgICAgICAgcGFuID0gQG1vZGVsLmdldCgnYWN0aXZlUGFuZWwnKVxuICAgICAgICBwYW4ubG9hZEpzKCkgaWYgcGFuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VcbiIsIlBhbmVsVmlldyA9IHJlcXVpcmUgJy4vcGFuZWxfdmlldy5jb2ZmZWUnXG5cbmNsYXNzIFBhbmVsIGV4dGVuZHMgQmFja2JvbmUuVmlld1xuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBjb25zb2xlLmxvZyAncmVuZGVyaW5nIHBhbmVsJywgQHRlbXBsYXRlKClcbiAgICAgICAgQCRlbC5odG1sIEB0ZW1wbGF0ZSgpXG4gICAgICAgIEBcbiAgICBcbiAgICBzZXRUZW1wbGF0ZUZyb21JZDogKGlkLCBqcyktPlxuICAgICAgICBAdGVtcGxhdGUgPSBfLnRlbXBsYXRlICQoJyMnICsgaWQpLmh0bWwoKVxuICAgICAgICBAbG9hZEpzID0ganNcbiAgICAgICAgY29uc29sZS5sb2cgJ2pzJywganNcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhbmVsIl19
