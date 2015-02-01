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

  Pages.prototype.initialize = function() {
    return Backbone.on('changePage', this.setActivePage, this);
  };

  Pages.prototype.setActivePage = function(page) {
    return this.active = page;
  };

  return Pages;

})(Backbone.Collection);

module.exports = Pages;



},{"../models/page.coffee":"/home/emile/workspace/remindme/front/models/page.coffee"}],"/home/emile/workspace/remindme/front/main.coffee":[function(require,module,exports){
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

$(function() {

  /*
  all class def must be encapsulated inside $.ready()
  otherwise templates from page.html won't be available.
   */
  var AboutPage, AppView, Header, PageView, Pages, RemindmePage, app;
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
      this.header = new Header({
        pages: this.pages
      });
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
  app = new AppView();
  app.render();
  return app.showFirstPage();
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


  /*
  Pages should extend this class
  Every page should have:
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

  Header.prototype.initialize = function(options) {
    return this.pages = options.pages;
  };

  Header.prototype.render = function() {
    if (!this.fg) {
      this.fb_html = $('.fb-share-button').html();
    }
    this.$el.html(this.template);
    $('.fb-share-button').html(this.fb_html);
    return this.renderLinks();
  };

  Header.prototype.renderLinks = function() {
    var activePage, _el;
    _el = $(this.ui.links);
    _el.html('');
    activePage = this.pages.active;
    return this.pages.forEach(function(page) {
      var linkView;
      linkView = new PageLinkView({
        model: page,
        isActive: page === activePage
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

  PageLinkView.prototype.initialize = function(options) {
    return this.options = options;
  };

  PageLinkView.prototype.render = function() {
    this.$el.html("<a>" + this.model.get('title') + "</a>");
    if (this.options.isActive) {
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



},{"./panel_view.coffee":"/home/emile/workspace/remindme/front/views/panel_view.coffee"}],"/home/emile/workspace/remindme/front/views/panel_view.coffee":[function(require,module,exports){
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
    this.$el.html(this.template());
    return this;
  };

  Panel.prototype.setTemplateFromId = function(id, js) {
    this.template = _.template($('#' + id).html());
    return this.loadJs = js;
  };

  return Panel;

})(Backbone.View);

module.exports = Panel;



},{"./panel_view.coffee":"/home/emile/workspace/remindme/front/views/panel_view.coffee"}]},{},["/home/emile/workspace/remindme/front/main.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L2NvbGxlY3Rpb25zL3BhZ2VzLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC9tYWluLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC9tb2RlbHMvYWJvdXRfcGFnZS5jb2ZmZWUiLCIvaG9tZS9lbWlsZS93b3Jrc3BhY2UvcmVtaW5kbWUvZnJvbnQvbW9kZWxzL3BhZ2UuY29mZmVlIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L21vZGVscy9yZW1pbmRtZV9wYWdlLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC92aWV3cy9oZWFkZXIuY29mZmVlIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L3ZpZXdzL3BhZ2Vfdmlldy5jb2ZmZWUiLCIvaG9tZS9lbWlsZS93b3Jrc3BhY2UvcmVtaW5kbWUvZnJvbnQvdmlld3MvcGFuZWxfdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLFdBQUE7RUFBQTtpU0FBQTs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLHVCQUFSLENBQVAsQ0FBQTs7QUFBQTtBQUlJLDBCQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSxrQkFBQSxLQUFBLEdBQU8sSUFBUCxDQUFBOztBQUFBLGtCQUVBLFVBQUEsR0FBWSxTQUFBLEdBQUE7V0FDUixRQUFRLENBQUMsRUFBVCxDQUFZLFlBQVosRUFBMEIsSUFBQyxDQUFBLGFBQTNCLEVBQTBDLElBQTFDLEVBRFE7RUFBQSxDQUZaLENBQUE7O0FBQUEsa0JBS0EsYUFBQSxHQUFlLFNBQUMs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QSxDQUpuQixDQUFBOztlQUFBOztHQUZnQixRQUFRLENBQUMsS0FGN0IsQ0FBQTs7QUFBQSxNQWFNLENBQUMsT0FBUCxHQUFpQixLQWJqQixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlBhZ2UgPSByZXF1aXJlICcuLi9tb2RlbHMvcGFnZS5jb2ZmZWUnXG5cbmNsYXNzIFBhZ2VzIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuXG4gICAgbW9kZWw6IFBhZ2VcblxuICAgIGluaXRpYWxpemU6IC0+XG4gICAgICAgIEJhY2tib25lLm9uICdjaGFuZ2VQYWdlJywgQHNldEFjdGl2ZVBhZ2UsIEBcblxuICAgIHNldEFjdGl2ZVBhZ2U6IChwYWdlKS0+XG4gICAgICAgIEBhY3RpdmUgPSBwYWdlXG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZXNcbiIsIiQgLT5cbiAgICAjIyNcbiAgICBhbGwgY2xhc3MgZGVmIG11c3QgYmUgZW5jYXBzdWxhdGVkIGluc2lkZSAkLnJlYWR5KClcbiAgICBvdGhlcndpc2UgdGVtcGxhdGVzIGZyb20gcGFnZS5odG1sIHdvbid0IGJlIGF2YWlsYWJsZS5cbiAgICAjIyNcbiAgICBcbiAgICAjRm9ybVZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL2Zvcm1fdmlldy5jb2ZmZWUnXG4gICAgI0Zvcm0gPSByZXF1aXJlICcuL21vZGVscy9mb3JtLmNvZmZlZSdcblxuICAgIEhlYWRlciA9IHJlcXVpcmUgJy4vdmlld3MvaGVhZGVyLmNvZmZlZSdcbiAgICBQYWdlcyA9IHJlcXVpcmUgJy4vY29sbGVjdGlvbnMvcGFnZXMuY29mZmVlJ1xuICAgIFJlbWluZG1lUGFnZSA9IHJlcXVpcmUgJy4vbW9kZWxzL3JlbWluZG1lX3BhZ2UuY29mZmVlJ1xuICAgIEFib3V0UGFnZSA9IHJlcXVpcmUgJy4vbW9kZWxzL2Fib3V0X3BhZ2UuY29mZmVlJ1xuICAgIFBhZ2VWaWV3ID0gcmVxdWlyZSAnLi92aWV3cy9wYWdlX3ZpZXcuY29mZmVlJ1xuXG5cbiAgICBjbGFzcyBBcHBWaWV3IGV4dGVuZHMgQmFja2JvbmUuVmlld1xuXG4gICAgICAgIGVsOiAnI3BhZ2UnXG5cbiAgICAgICAgZXZlbnRzOlxuICAgICAgICAgICAgJ2NoYW5nZVBhZ2UnOiAnb25DaGFuZ2VQYWdlJ1xuXG4gICAgICAgIGluaXRpYWxpemU6IC0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnSW5pdGlhbGl6aW5nIGFwcCdcblxuICAgICAgICAgICAgcmVtaW5kbWUgPSBuZXcgUmVtaW5kbWVQYWdlKClcbiAgICAgICAgICAgIGFib3V0ID0gbmV3IEFib3V0UGFnZSgpXG4gICAgICAgICAgICBAcGFnZXMgPSBuZXcgUGFnZXMoW3JlbWluZG1lLCBhYm91dF0pXG4gICAgICAgICAgICBAaGVhZGVyID0gbmV3IEhlYWRlclxuICAgICAgICAgICAgICAgIHBhZ2VzOiBAcGFnZXNcblxuICAgICAgICAgICAgQGluaXRMaXN0ZW5lcigpXG5cblxuICAgICAgICBpbml0TGlzdGVuZXI6IC0+XG4gICAgICAgICAgICBfYXBwID0gQFxuICAgICAgICAgICAgQmFja2JvbmUub24gJ2FsbCcsIChuYW1lKS0+XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgJ0V2ZW50IGNhdWdodDonLCBuYW1lLCBhcmd1bWVudHNcbiAgICAgICAgICAgICAgICBpZiBuYW1lIGluIF8uZnVuY3Rpb25zKF9hcHApXG4gICAgICAgICAgICAgICAgICAgIF9hcHBbbmFtZV0uYXBwbHkgX2FwcCwgYXJndW1lbnRzXG5cbiAgICAgICAgc2hvd0ZpcnN0UGFnZTogLT5cbiAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ2NoYW5nZVBhZ2UnLCBAcGFnZXMuZmlyc3QoKVxuXG4gICAgICAgIHJlbmRlcjogLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdSZW5kZXJpbmcgYXBwbGljYXRpb24uJ1xuICAgICAgICAgICAgQGhlYWRlci5yZW5kZXIoKVxuICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlciAncmVuZGVyZWQnXG5cbiAgICAgICAgY2hhbmdlUGFnZTogKGUsIHBhZ2UpLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdjaGFuZ2VwYWdlJ1xuICAgICAgICAgICAgQGFjdGl2ZSA9IHBhZ2VcbiAgICAgICAgICAgIHBhZ2VWaWV3ID0gbmV3IFBhZ2VWaWV3XG4gICAgICAgICAgICAgICAgbW9kZWw6IHBhZ2VcbiAgICAgICAgICAgIHBhZ2VWaWV3LnJlbmRlcigpXG4gICAgICAgICAgICBAJGVsLmh0bWwgcGFnZVZpZXcuZWxcbiAgICAgICAgICAgIEBoZWFkZXIucmVuZGVyTGlua3MoKVxuICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlciAncmVuZGVyZWQnXG5cbiAgICAgICAgYWN0aXZlUGFnZTogLT5cbiAgICAgICAgICAgIEBhY3RpdmVcblxuXG4gICAgYXBwID0gbmV3IEFwcFZpZXcoKVxuICAgIGFwcC5yZW5kZXIoKVxuICAgIGFwcC5zaG93Rmlyc3RQYWdlKClcbiIsIlBhZ2UgPSByZXF1aXJlICcuL3BhZ2UuY29mZmVlJ1xuXG5jbGFzcyBBYm91dG1lUGFnZSBleHRlbmRzIFBhZ2VcbiAgICBcbiAgICBkZWZhdWx0czogLT5cbiAgICAgICAgJ3RpdGxlJzogJ0Fib3V0J1xuICAgICAgICAnaHRtbCc6ICdcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEhleSwgaVxcJ20gWm96b3IuIENoZWNrIG91dCBteSBnaXRodWIgPGEgaHJlZj1cImh0dHA6Ly9naXRodWIuY29tL2VtaWxlY2Fyb25cIj5oZXJlPC9hPiFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwPlRoaXMgYXBwIHdhcyBidWlsdCB1c2luZyA8YSBocmVmPVwiaHR0cDovL2ZsYXNrLnBvY29vLm9yZy9cIj5GbGFzazwvYT4sIDxhIGhyZWY9XCJodHRwOi8vYmFja2JvbmVqcy5vcmcvXCI+QmFja2JvbmU8L2E+LCA8YSBocmVmPVwiaHR0cDovL2dldGJvb3RzdHJhcC5jb20vXCI+Qm9vdHN0cmFwPC9hPiBhbmQgbW9yZS48L3A+XG4gICAgICAgICdcblxubW9kdWxlLmV4cG9ydHMgPSBBYm91dG1lUGFnZSIsIlxuY2xhc3MgUGFnZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gICAgIyMjXG4gICAgUGFnZXMgc2hvdWxkIGV4dGVuZCB0aGlzIGNsYXNzXG4gICAgRXZlcnkgcGFnZSBzaG91bGQgaGF2ZTpcbiAgICAgICAgLSBBIHNldCBvZiBmdW5jdGlvbnMgaW4gcGFnZS5wYW5lbHMgb2JqZWN0LlxuICAgICAgICAgIFRlbXBsYXRlIHdpdGggc2FtZSBpZCBhcyB0aGUgZnVuY3Rpb25zIG5hbWUgd2lsbCBiZSBsb2FkZWRcbiAgICAgICAgICBDb2RlIGZyb20gdGhlIGZ1bmN0aW9uIHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiBwYW5lbCBpcyByZW5kZXJlZFxuICAgICMjI1xuXG4gICAgZGVmYXVsdHM6XG4gICAgICAgIHRpdGxlOiAndW50aXRsZWQgcGFnZSdcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxuXG4gICAgaXNBY3RpdmU6IC0+XG4gICAgICAgIEBnZXQoJ2FjdGl2ZScpXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VcbiIsIlxuUGFnZSA9IHJlcXVpcmUgJy4vcGFnZS5jb2ZmZWUnXG5cbmNsYXNzIFJlbWluZG1lUGFnZSBleHRlbmRzIFBhZ2VcbiAgICBcbiAgICBkZWZhdWx0czogLT5cbiAgICAgICAgdGl0bGU6ICdSZW1pbmQgbWUnXG4gICAgICAgIHBhbmVsczpcbiAgICAgICAgICAgICdybWVfd2VsY29tZSc6IC0+XG4gICAgICAgICAgICAgICAgJCgnI25vX2J1dHRvbicpLmNsaWNrIC0+XG4gICAgICAgICAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3N3aXRjaFBhbmVsJywgJ3JtZV9kYXRlJ1xuXG4gICAgICAgICAgICAncm1lX2RhdGUnOiAtPlxuICAgICAgICAgICAgICAgICQoJy5kYXRlcGlja2VyJykuZGF0ZXBpY2tlcigpLm9uICdjaGFuZ2VEYXRlJywgKGUpLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3NldFBhZ2VEYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0ZSc6IGUuZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlciAnc3dpdGNoUGFuZWwnLCAncm1lX2VtYWlsJ1xuXG4gICAgICAgICAgICAncm1lX2VtYWlsJzogLT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyBwYWdlRGF0YVxuICAgIFxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbWluZG1lUGFnZVxuIiwiXG5jbGFzcyBIZWFkZXIgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICBlbDogJyNoZWFkZXInXG5cbiAgICB1aTpcbiAgICAgICAgbGlua3M6ICcjaGVhZGVyLWxpbmtzJ1xuXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUgJCgnI2hlYWRlci10ZW1wbGF0ZScpLmh0bWwoKVxuXG4gICAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpLT5cbiAgICAgICAgQHBhZ2VzID0gb3B0aW9ucy5wYWdlc1xuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICAjIEF2b2lkIGxvc2luZyBmYl9idXR0b24gaHRtbFxuICAgICAgICBAZmJfaHRtbCA9ICQoJy5mYi1zaGFyZS1idXR0b24nKS5odG1sKCkgaWYgbm90IEBmZ1xuICAgICAgICBAJGVsLmh0bWwgQHRlbXBsYXRlXG4gICAgICAgICQoJy5mYi1zaGFyZS1idXR0b24nKS5odG1sKEBmYl9odG1sKVxuICAgICAgICBAcmVuZGVyTGlua3MoKVxuXG4gICAgcmVuZGVyTGlua3M6IC0+XG4gICAgICAgIF9lbCA9ICQgQHVpLmxpbmtzXG4gICAgICAgIF9lbC5odG1sICcnXG5cbiAgICAgICAgYWN0aXZlUGFnZSA9IEBwYWdlcy5hY3RpdmVcbiAgICAgICAgQHBhZ2VzLmZvckVhY2ggKHBhZ2UpIC0+XG4gICAgICAgICAgIGxpbmtWaWV3ID0gbmV3IFBhZ2VMaW5rVmlld1xuICAgICAgICAgICAgICAgIG1vZGVsOiBwYWdlXG4gICAgICAgICAgICAgICAgaXNBY3RpdmU6IHBhZ2UgPT0gYWN0aXZlUGFnZVxuICAgICAgICAgICBfZWwuYXBwZW5kIGxpbmtWaWV3LnJlbmRlcigpLmVsXG5cblxuY2xhc3MgUGFnZUxpbmtWaWV3IGV4dGVuZHMgQmFja2JvbmUuVmlld1xuICAgIHRhZ05hbWU6ICdsaSdcblxuICAgIGV2ZW50czpcbiAgICAgICAgJ2NsaWNrJzogJ29uQ2xpY2snXG5cbiAgICBpbml0aWFsaXplOiAob3B0aW9ucyktPlxuICAgICAgICBAb3B0aW9ucyA9IG9wdGlvbnNcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQCRlbC5odG1sIFwiPGE+XCIgKyBAbW9kZWwuZ2V0KCd0aXRsZScpICsgXCI8L2E+XCJcbiAgICAgICAgQCRlbC5hZGRDbGFzcyAnYWN0aXZlJyBpZiBAb3B0aW9ucy5pc0FjdGl2ZVxuICAgICAgICBAXG5cbiAgICBvbkNsaWNrOiAtPlxuICAgICAgICBCYWNrYm9uZS50cmlnZ2VyICdjaGFuZ2VQYWdlJywgQG1vZGVsXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclxuIiwiUGFuZWxWaWV3ID0gcmVxdWlyZSAnLi9wYW5lbF92aWV3LmNvZmZlZSdcblxuY2xhc3MgUGFnZSBleHRlbmRzIEJhY2tib25lLlZpZXdcblxuICAgIHRpdGxlOiAndW5kZWZpbmVkX3BhZ2UnXG5cbiAgICBpbml0aWFsaXplOiAtPlxuICAgICAgICBCYWNrYm9uZS5vbiAnc3dpdGNoUGFuZWwnLCBAc3dpdGNoUGFuZWwsIEBcbiAgICAgICAgQmFja2JvbmUub24gJ3JlbmRlcmVkJywgQGxvYWRQYW5lbEpzLCBAXG4gICAgICAgIEJhY2tib25lLm9uICdzZXRQYWdlRGF0YScsIChkYXRhKSAtPlxuICAgICAgICAgICAgY29uc29sZS5sb2cgJ3NldERhdGEnLCBkYXRhXG4gICAgICAgICAgICAsIEBcblxuICAgICAgICBwYW5lbHMgPSBAbW9kZWwuZ2V0ICdwYW5lbHMnXG4gICAgICAgIEBzd2l0Y2hQYW5lbCBfLmZpcnN0IF8ua2V5cyBwYW5lbHMgaWYgcGFuZWxzXG5cbiAgICByZW5kZXI6IC0+XG4gICAgICAgIEByZW5kZXJIdG1sKCkgaWYgQG1vZGVsLmdldCAnaHRtbCdcbiAgICAgICAgQHJlbmRlckFjdGl2ZVBhbmVsKCkgaWYgQG1vZGVsLmdldCAnYWN0aXZlUGFuZWwnXG4gICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3JlbmRlcmVkJ1xuICAgIFxuICAgIHJlbmRlckh0bWw6IC0+XG4gICAgICAgIEAkZWwuaHRtbCBAbW9kZWwuZ2V0ICdodG1sJ1xuXG4gICAgcmVuZGVyQWN0aXZlUGFuZWw6IC0+XG4gICAgICAgIEAkZWwuaHRtbCBAbW9kZWwuZ2V0KCdhY3RpdmVQYW5lbCcpLnJlbmRlcigpLmVsXG5cbiAgICBzd2l0Y2hQYW5lbDogKG5hbWUpLT5cbiAgICAgICAgaWYgbmFtZSBpbiBfLmZ1bmN0aW9ucyBAbW9kZWwuZ2V0ICdwYW5lbHMnXG4gICAgICAgICAgICBhY3RpdmVQYW5lbCA9IG5ldyBQYW5lbFZpZXcoKVxuICAgICAgICAgICAganMgPSAoQG1vZGVsLmdldCAncGFuZWxzJylbbmFtZV0gb3IgbnVsbFxuICAgICAgICAgICAgYWN0aXZlUGFuZWwuc2V0VGVtcGxhdGVGcm9tSWQgbmFtZSwganNcbiAgICAgICAgICAgIEBtb2RlbC5zZXQgJ2FjdGl2ZVBhbmVsJywgYWN0aXZlUGFuZWxcbiAgICAgICAgICAgIEByZW5kZXIoKVxuXG4gICAgbG9hZFBhbmVsSnM6IC0+XG4gICAgICAgIGNvbnNvbGUubG9nICdoYW5kbGVyJywgQG1vZGVsXG4gICAgICAgIHBhZ2VEYXRhID1cbiAgICAgICAgICAgIHlvOiAnbG8nXG4gICAgICAgIHBhbiA9IEBtb2RlbC5nZXQoJ2FjdGl2ZVBhbmVsJylcbiAgICAgICAgcGFuLmxvYWRKcygpIGlmIHBhblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlXG4iLCJQYW5lbFZpZXcgPSByZXF1aXJlICcuL3BhbmVsX3ZpZXcuY29mZmVlJ1xuXG5jbGFzcyBQYW5lbCBleHRlbmRzIEJhY2tib25lLlZpZXdcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQCRlbC5odG1sIEB0ZW1wbGF0ZSgpXG4gICAgICAgIEBcbiAgICBcbiAgICBzZXRUZW1wbGF0ZUZyb21JZDogKGlkLCBqcyktPlxuICAgICAgICBAdGVtcGxhdGUgPSBfLnRlbXBsYXRlICQoJyMnICsgaWQpLmh0bWwoKVxuICAgICAgICBAbG9hZEpzID0ganNcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhbmVsIl19
