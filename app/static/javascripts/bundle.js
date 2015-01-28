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
          var view;
          view = this;
          console.log('hello', $('#welcome_button'), document.getElementById("welcome_button"));
          return $('#welcome_button').click(function() {
            console.log('mab', view);
            return Backbone.trigger('switchPanel', 'rme_date');
          });
        },
        'rme_date': function() {
          return console.log('at last');
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
    var pan;
    console.log('handler', this.model);
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



},{"./panel_view.coffee":"/home/emile/workspace/remindme/front/views/panel_view.coffee"}]},{},["/home/emile/workspace/remindme/front/main.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L2NvbGxlY3Rpb25zL3BhZ2VzLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC9tYWluLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC9tb2RlbHMvYWJvdXRfcGFnZS5jb2ZmZWUiLCIvaG9tZS9lbWlsZS93b3Jrc3BhY2UvcmVtaW5kbWUvZnJvbnQvbW9kZWxzL3BhZ2UuY29mZmVlIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L21vZGVscy9yZW1pbmRtZV9wYWdlLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC92aWV3cy9oZWFkZXIuY29mZmVlIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L3ZpZXdzL3BhZ2Vfdmlldy5jb2ZmZWUiLCIvaG9tZS9lbWlsZS93b3Jrc3BhY2UvcmVtaW5kbWUvZnJvbnQvdmlld3MvcGFuZWxfdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLFdBQUE7RUFBQTtpU0FBQTs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLHVCQUFSLENBQVAsQ0FBQTs7QUFBQTtBQUlJLDBCQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSxrQkFBQSxLQUFBLEdBQU8sSUFBUCxDQUFBOztlQUFBOztHQUZnQixRQUFRLENBQUMsV0FGN0IsQ0FBQTs7QUFBQSxNQVFNLENBQUMsT0FBUCxHQUFpQixLQVJqQixDQUFBOzs7OztBQ0FBLElBQUE7O3VKQUFBOztBQUFBLENBQUEsQ0FBRSxTQUFBLEdBQUE7QUFDRTtBQUFBOzs7S0FBQTtBQUFBLE1BQUEseURBQUE7QUFBQSxFQVFBLE1BQUEsR0FBUyxPQUFBLENBQVEsdUJBQVIsQ0FSVCxDQUFBO0FBQUEsRUFTQSxLQUFBLEdBQVEsT0FBQSxDQUFRLDRCQUFSLENBVFIsQ0FBQTtBQUFBLEVBVUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSwrQkFBUixDQVZmLENBQUE7QUFBQSxFQVdBLFNBQUEsR0FBWSxPQUFBLENBQVEsNEJBQVIsQ0FYWixDQUFBO0FBQUEsRUFZQSxRQUFBLEdBQVcsT0FBQSxDQUFRLDBCQUFSLENBWlgsQ0FBQTtBQUFBLEVBZU07QUFFRiw4QkFBQSxDQUFBOzs7O0tBQUE7O0FBQUEsc0JBQUEsRUFBQSxHQUFJLE9BQUosQ0FBQTs7QUFBQSxzQkFFQSxNQUFBLEdBQ0k7QUFBQSxNQUFBLFlBQUEsRUFBYyxjQUFkO0tBSEosQ0FBQTs7QUFBQSxzQkFLQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1IsVUFBQSxlQUFBO0FBQUEsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGtCQUFaLENBQUEsQ0FBQTtBQUFBLE1BRUEsUUFBQSxHQUFlLElBQUEsWUFBQSxDQUFBLENBRmYsQ0FBQTtBQUFBLE1BR0EsS0FBQSxHQUFZLElBQUEsU0FBQSxDQUFBLENBSFosQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLEtBQUEsQ0FBTSxDQUFDLFFBQUQsRUFBVyxLQUFYLENBQU4sQ0FKYixDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsTUFBRCxHQUFjLElBQUEsTUFBQSxDQUFBLENBTGQsQ0FBQTthQU9BLElBQUMsQ0FBQSxZQUFELENBQUEsRUFSUTtJQUFBLENBTFosQ0FBQTs7QUFBQSxzQkFnQkEsWUFBQSxHQUFjLFNBQUEsR0FBQTtBQUNWLFVBQUEsSUFBQTtBQUFBLE1BQUEsSUFBQSxHQUFPLElBQVAsQ0FBQTthQUNBLFFBQVEsQ0FBQyxFQUFULENBQVksS0FBWixFQUFtQixTQUFDLElBQUQsR0FBQTtBQUNmLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLElBQTdCLEVBQW1DLFNBQW5DLENBQUEsQ0FBQTtBQUNBLFFBQUEsSUFBRyxlQUFRLENBQUMsQ0FBQyxTQUFGLENBQVksSUFBWixDQUFSLEVBQUEsSUFBQSxNQUFIO2lCQUNJLElBQUssQ0FBQSxJQUFBLENBQUssQ0FBQyxLQUFYLENBQWlCLElBQWpCLEVBQXVCLFNBQXZCLEVBREo7U0FGZTtNQUFBLENBQW5CLEVBRlU7SUFBQSxDQWhCZCxDQUFBOztBQUFBLHNCQXVCQSxhQUFBLEdBQWUsU0FBQSxHQUFBO2FBQ1gsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsWUFBakIsRUFBK0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFQLENBQUEsQ0FBL0IsRUFEVztJQUFBLENBdkJmLENBQUE7O0FBQUEsc0JBMEJBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDSixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVosQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLE1BQVIsQ0FBQSxDQURBLENBQUE7YUFFQSxRQUFRLENBQUMsT0FBVCxDQUFpQixVQUFqQixFQUhJO0lBQUEsQ0ExQlIsQ0FBQTs7QUFBQSxzQkErQkEsVUFBQSxHQUFZLFNBQUMsQ0FBRCxFQUFJLElBQUosR0FBQTtBQUNSLFVBQUEsUUFBQTtBQUFBLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxZQUFaLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQURWLENBQUE7QUFBQSxNQUVBLFFBQUEsR0FBZSxJQUFBLFFBQUEsQ0FDWDtBQUFBLFFBQUEsS0FBQSxFQUFPLElBQVA7T0FEVyxDQUZmLENBQUE7QUFBQSxNQUlBLFFBQVEsQ0FBQyxNQUFULENBQUEsQ0FKQSxDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxRQUFRLENBQUMsRUFBbkIsQ0FMQSxDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUEsTUFBTSxDQUFDLFdBQVIsQ0FBQSxDQU5BLENBQUE7YUFPQSxRQUFRLENBQUMsT0FBVCxDQUFpQixVQUFqQixFQVJRO0lBQUEsQ0EvQlosQ0FBQTs7QUFBQSxzQkF5Q0EsVUFBQSxHQUFZLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxPQURPO0lBQUEsQ0F6Q1osQ0FBQTs7bUJBQUE7O0tBRmtCLFFBQVEsQ0FBQyxLQWYvQixDQUFBO0FBQUEsRUE4REEsTUFBTSxDQUFDLEdBQVAsR0FBaUIsSUFBQSxPQUFBLENBQUEsQ0E5RGpCLENBQUE7QUFBQSxFQStEQSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQVgsQ0FBQSxDQS9EQSxDQUFBO1NBZ0VBLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBWCxDQUFBLEVBakVGO0FBQUEsQ0FBRixDQUFBLENBQUE7Ozs7O0FDQUEsSUFBQSxpQkFBQTtFQUFBO2lTQUFBOztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsZUFBUixDQUFQLENBQUE7O0FBQUE7QUFJSSxnQ0FBQSxDQUFBOzs7O0dBQUE7O0FBQUEsd0JBQUEsUUFBQSxHQUFVLFNBQUEsR0FBQTtXQUNOO0FBQUEsTUFBQSxPQUFBLEVBQVMsT0FBVDtBQUFBLE1BQ0EsTUFBQSxFQUFRLHVSQURSO01BRE07RUFBQSxDQUFWLENBQUE7O3FCQUFBOztHQUZzQixLQUYxQixDQUFBOztBQUFBLE1BYU0sQ0FBQyxPQUFQLEdBQWlCLFdBYmpCLENBQUE7Ozs7O0FDQ0EsSUFBQSxJQUFBO0VBQUE7aVNBQUE7O0FBQUE7QUFDSSx5QkFBQSxDQUFBOzs7O0dBQUE7O0FBQUE7QUFBQTs7Ozs7Ozs7S0FBQTs7QUFBQSxpQkFVQSxRQUFBLEdBQ0k7QUFBQSxJQUFBLEtBQUEsRUFBTyxlQUFQO0FBQUEsSUFDQSxNQUFBLEVBQVEsS0FEUjtHQVhKLENBQUE7O0FBQUEsaUJBY0EsUUFBQSxHQUFVLFNBQUEsR0FBQTtXQUNOLElBQUMsQ0FBQSxHQUFELENBQUssUUFBTCxFQURNO0VBQUEsQ0FkVixDQUFBOztjQUFBOztHQURlLFFBQVEsQ0FBQyxNQUE1QixDQUFBOztBQUFBLE1Bb0JNLENBQUMsT0FBUCxHQUFpQixJQXBCakIsQ0FBQTs7Ozs7QUNBQSxJQUFBLGtCQUFBO0VBQUE7aVNBQUE7O0FBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxlQUFSLENBQVAsQ0FBQTs7QUFBQTtBQUlJLGlDQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSx5QkFBQSxRQUFBLEdBQVUsU0FBQSxHQUFBO1dBQ047QUFBQSxNQUFBLEtBQUEsRUFBTyxXQUFQO0FBQUEsTUFDQSxNQUFBLEVBQ0k7QUFBQSxRQUFBLGFBQUEsRUFBZSxTQUFBLEdBQUE7QUFDWCxjQUFBLElBQUE7QUFBQSxVQUFBLElBQUEsR0FBTyxJQUFQLENBQUE7QUFBQSxVQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksT0FBWixFQUFxQixDQUFBLENBQUUsaUJBQUYsQ0FBckIsRUFBMkMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQTNDLENBREEsQ0FBQTtpQkFFQSxDQUFBLENBQUUsaUJBQUYsQ0FBb0IsQ0FBQyxLQUFyQixDQUEyQixTQUFBLEdBQUE7QUFDdkIsWUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLEtBQVosRUFBbUIsSUFBbkIsQ0FBQSxDQUFBO21CQUNBLFFBQVEsQ0FBQyxPQUFULENBQWlCLGFBQWpCLEVBQWdDLFVBQWhDLEVBRnVCO1VBQUEsQ0FBM0IsRUFIVztRQUFBLENBQWY7QUFBQSxRQU1BLFVBQUEsRUFBWSxTQUFBLEdBQUE7aUJBQ1IsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaLEVBRFE7UUFBQSxDQU5aO09BRko7TUFETTtFQUFBLENBQVYsQ0FBQTs7c0JBQUE7O0dBRnVCLEtBRjNCLENBQUE7O0FBQUEsTUFpQk0sQ0FBQyxPQUFQLEdBQWlCLFlBakJqQixDQUFBOzs7OztBQ0FBLElBQUEsb0JBQUE7RUFBQTtpU0FBQTs7QUFBQTtBQUVJLDJCQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSxtQkFBQSxFQUFBLEdBQUksU0FBSixDQUFBOztBQUFBLG1CQUVBLEVBQUEsR0FDSTtBQUFBLElBQUEsS0FBQSxFQUFPLGVBQVA7R0FISixDQUFBOztBQUFBLG1CQUtBLFFBQUEsR0FBVSxDQUFDLENBQUMsUUFBRixDQUFXLENBQUEsQ0FBRSxrQkFBRixDQUFxQixDQUFDLElBQXRCLENBQUEsQ0FBWCxDQUxWLENBQUE7O0FBQUEsbUJBT0EsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUVKLElBQUEsSUFBMkMsQ0FBQSxJQUFLLENBQUEsRUFBaEQ7QUFBQSxNQUFBLElBQUMsQ0FBQSxPQUFELEdBQVcsQ0FBQSxDQUFFLGtCQUFGLENBQXFCLENBQUMsSUFBdEIsQ0FBQSxDQUFYLENBQUE7S0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsSUFBQyxDQUFBLFFBQVgsQ0FGQSxDQUFBO0FBQUEsSUFHQSxDQUFBLENBQUUsa0JBQUYsQ0FBcUIsQ0FBQyxJQUF0QixDQUEyQixJQUFDLENBQUEsT0FBNUIsQ0FIQSxDQUFBO1dBSUEsSUFBQyxDQUFBLFdBQUQsQ0FBQSxFQU5JO0VBQUEsQ0FQUixDQUFBOztBQUFBLG1CQWVBLFdBQUEsR0FBYSxTQUFBLEdBQUE7QUFDVCxRQUFBLEdBQUE7QUFBQSxJQUFBLEdBQUEsR0FBTSxDQUFBLENBQUUsSUFBQyxDQUFBLEVBQUUsQ0FBQyxLQUFOLENBQU4sQ0FBQTtBQUFBLElBQ0EsR0FBRyxDQUFDLElBQUosQ0FBUyxFQUFULENBREEsQ0FBQTtXQUdBLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQWpCLENBQXlCLFNBQUMsSUFBRCxHQUFBO0FBQ3RCLFVBQUEsUUFBQTtBQUFBLE1BQUEsUUFBQSxHQUFlLElBQUEsWUFBQSxDQUNWO0FBQUEsUUFBQSxLQUFBLEVBQU8sSUFBUDtPQURVLENBQWYsQ0FBQTthQUVBLEdBQUcsQ0FBQyxNQUFKLENBQVcsUUFBUSxDQUFDLE1BQVQsQ0FBQSxDQUFpQixDQUFDLEVBQTdCLEVBSHNCO0lBQUEsQ0FBekIsRUFKUztFQUFBLENBZmIsQ0FBQTs7Z0JBQUE7O0dBRmlCLFFBQVEsQ0FBQyxLQUE5QixDQUFBOztBQUFBO0FBNEJJLGlDQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSx5QkFBQSxPQUFBLEdBQVMsSUFBVCxDQUFBOztBQUFBLHlCQUVBLE1BQUEsR0FDSTtBQUFBLElBQUEsT0FBQSxFQUFTLFNBQVQ7R0FISixDQUFBOztBQUFBLHlCQUtBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDSixJQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLEtBQUEsR0FBUSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxPQUFYLENBQVIsR0FBOEIsTUFBeEMsQ0FBQSxDQUFBO0FBQ0EsSUFBQSxJQUFHLElBQUMsQ0FBQSxLQUFELEtBQVUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFYLENBQUEsQ0FBYjtBQUNJLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFaLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxRQUFMLENBQWMsUUFBZCxDQURBLENBREo7S0FEQTtXQUlBLEtBTEk7RUFBQSxDQUxSLENBQUE7O0FBQUEseUJBWUEsT0FBQSxHQUFTLFNBQUEsR0FBQTtXQUNMLFFBQVEsQ0FBQyxPQUFULENBQWlCLFlBQWpCLEVBQStCLElBQUMsQ0FBQSxLQUFoQyxFQURLO0VBQUEsQ0FaVCxDQUFBOztzQkFBQTs7R0FEdUIsUUFBUSxDQUFDLEtBM0JwQyxDQUFBOztBQUFBLE1BNkNNLENBQUMsT0FBUCxHQUFpQixNQTdDakIsQ0FBQTs7Ozs7QUNEQSxJQUFBLGVBQUE7RUFBQTs7dUpBQUE7O0FBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxxQkFBUixDQUFaLENBQUE7O0FBQUE7QUFJSSx5QkFBQSxDQUFBOzs7O0dBQUE7O0FBQUEsaUJBQUEsS0FBQSxHQUFPLGdCQUFQLENBQUE7O0FBQUEsaUJBRUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNSLFFBQUEsTUFBQTtBQUFBLElBQUEsUUFBUSxDQUFDLEVBQVQsQ0FBWSxhQUFaLEVBQTJCLElBQUMsQ0FBQSxXQUE1QixFQUF5QyxJQUF6QyxDQUFBLENBQUE7QUFBQSxJQUNBLFFBQVEsQ0FBQyxFQUFULENBQVksVUFBWixFQUF3QixJQUFDLENBQUEsV0FBekIsRUFBc0MsSUFBdEMsQ0FEQSxDQUFBO0FBQUEsSUFHQSxNQUFBLEdBQVMsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsUUFBWCxDQUhULENBQUE7QUFJQSxJQUFBLElBQXNDLE1BQXRDO2FBQUEsSUFBQyxDQUFBLFdBQUQsQ0FBYSxDQUFDLENBQUMsS0FBRixDQUFRLENBQUMsQ0FBQyxJQUFGLENBQU8sTUFBUCxDQUFSLENBQWIsRUFBQTtLQUxRO0VBQUEsQ0FGWixDQUFBOztBQUFBLGlCQVNBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDSixJQUFBLElBQWlCLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLE1BQVgsQ0FBakI7QUFBQSxNQUFBLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FBQSxDQUFBO0tBQUE7QUFDQSxJQUFBLElBQXdCLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLGFBQVgsQ0FBeEI7QUFBQSxNQUFBLElBQUMsQ0FBQSxpQkFBRCxDQUFBLENBQUEsQ0FBQTtLQURBO1dBRUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsVUFBakIsRUFISTtFQUFBLENBVFIsQ0FBQTs7QUFBQSxpQkFjQSxVQUFBLEdBQVksU0FBQSxHQUFBO1dBQ1IsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsTUFBWCxDQUFWLEVBRFE7RUFBQSxDQWRaLENBQUE7O0FBQUEsaUJBaUJBLGlCQUFBLEdBQW1CLFNBQUEsR0FBQTtXQUNmLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLGFBQVgsQ0FBeUIsQ0FBQyxNQUExQixDQUFBLENBQWtDLENBQUMsRUFBN0MsRUFEZTtFQUFBLENBakJuQixDQUFBOztBQUFBLGlCQW9CQSxXQUFBLEdBQWEsU0FBQyxJQUFELEdBQUE7QUFDVCxRQUFBLGVBQUE7QUFBQSxJQUFBLElBQUcsZUFBUSxDQUFDLENBQUMsU0FBRixDQUFZLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFFBQVgsQ0FBWixDQUFSLEVBQUEsSUFBQSxNQUFIO0FBQ0ksTUFBQSxXQUFBLEdBQWtCLElBQUEsU0FBQSxDQUFBLENBQWxCLENBQUE7QUFBQSxNQUNBLEVBQUEsR0FBSyxDQUFDLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFFBQVgsQ0FBRCxDQUFzQixDQUFBLElBQUEsQ0FBdEIsSUFBK0IsSUFEcEMsQ0FBQTtBQUFBLE1BRUEsV0FBVyxDQUFDLGlCQUFaLENBQThCLElBQTlCLEVBQW9DLEVBQXBDLENBRkEsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsYUFBWCxFQUEwQixXQUExQixDQUhBLENBQUE7YUFJQSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBTEo7S0FEUztFQUFBLENBcEJiLENBQUE7O0FBQUEsaUJBNEJBLFdBQUEsR0FBYSxTQUFBLEdBQUE7QUFDVCxRQUFBLEdBQUE7QUFBQSxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksU0FBWixFQUF1QixJQUFDLENBQUEsS0FBeEIsQ0FBQSxDQUFBO0FBQUEsSUFDQSxHQUFBLEdBQU0sSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsYUFBWCxDQUROLENBQUE7QUFFQSxJQUFBLElBQWdCLEdBQWhCO2FBQUEsR0FBRyxDQUFDLE1BQUosQ0FBQSxFQUFBO0tBSFM7RUFBQSxDQTVCYixDQUFBOztjQUFBOztHQUZlLFFBQVEsQ0FBQyxLQUY1QixDQUFBOztBQUFBLE1BdUNNLENBQUMsT0FBUCxHQUFpQixJQXZDakIsQ0FBQTs7Ozs7QUNBQSxJQUFBLGdCQUFBO0VBQUE7aVNBQUE7O0FBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxxQkFBUixDQUFaLENBQUE7O0FBQUE7QUFJSSwwQkFBQSxDQUFBOzs7O0dBQUE7O0FBQUEsa0JBQUEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNKLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQixJQUFDLENBQUEsUUFBRCxDQUFBLENBQS9CLENBQUEsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsSUFBQyxDQUFBLFFBQUQsQ0FBQSxDQUFWLENBREEsQ0FBQTtXQUVBLEtBSEk7RUFBQSxDQUFSLENBQUE7O0FBQUEsa0JBS0EsaUJBQUEsR0FBbUIsU0FBQyxFQUFELEVBQUssRUFBTCxHQUFBO0FBQ2YsSUFBQSxJQUFDLENBQUEsUUFBRCxHQUFZLENBQUMsQ0FBQyxRQUFGLENBQVcsQ0FBQSxDQUFFLEdBQUEsR0FBTSxFQUFSLENBQVcsQ0FBQyxJQUFaLENBQUEsQ0FBWCxDQUFaLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsRUFEVixDQUFBO1dBRUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaLEVBQWtCLEVBQWxCLEVBSGU7RUFBQSxDQUxuQixDQUFBOztlQUFBOztHQUZnQixRQUFRLENBQUMsS0FGN0IsQ0FBQTs7QUFBQSxNQWVNLENBQUMsT0FBUCxHQUFpQixLQWZqQixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlBhZ2UgPSByZXF1aXJlICcuLi9tb2RlbHMvcGFnZS5jb2ZmZWUnXG5cbmNsYXNzIFBhZ2VzIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuXG4gICAgbW9kZWw6IFBhZ2VcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZXNcbiIsIiQgLT5cbiAgICAjIyNcbiAgICBhbGwgY2xhc3MgZGVmIG11c3QgYmUgZW5jYXBzdWxhdGVkIGluc2lkZSAkLnJlYWR5KClcbiAgICBvdGhlcndpc2UgdGVtcGxhdGVzIGZyb20gcGFnZS5odG1sIHdvbid0IGJlIGF2YWlsYWJsZS5cbiAgICAjIyNcbiAgICBcbiAgICAjRm9ybVZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL2Zvcm1fdmlldy5jb2ZmZWUnXG4gICAgI0Zvcm0gPSByZXF1aXJlICcuL21vZGVscy9mb3JtLmNvZmZlZSdcblxuICAgIEhlYWRlciA9IHJlcXVpcmUgJy4vdmlld3MvaGVhZGVyLmNvZmZlZSdcbiAgICBQYWdlcyA9IHJlcXVpcmUgJy4vY29sbGVjdGlvbnMvcGFnZXMuY29mZmVlJ1xuICAgIFJlbWluZG1lUGFnZSA9IHJlcXVpcmUgJy4vbW9kZWxzL3JlbWluZG1lX3BhZ2UuY29mZmVlJ1xuICAgIEFib3V0UGFnZSA9IHJlcXVpcmUgJy4vbW9kZWxzL2Fib3V0X3BhZ2UuY29mZmVlJ1xuICAgIFBhZ2VWaWV3ID0gcmVxdWlyZSAnLi92aWV3cy9wYWdlX3ZpZXcuY29mZmVlJ1xuXG5cbiAgICBjbGFzcyBBcHBWaWV3IGV4dGVuZHMgQmFja2JvbmUuVmlld1xuXG4gICAgICAgIGVsOiAnI3BhZ2UnXG5cbiAgICAgICAgZXZlbnRzOlxuICAgICAgICAgICAgJ2NoYW5nZVBhZ2UnOiAnb25DaGFuZ2VQYWdlJ1xuXG4gICAgICAgIGluaXRpYWxpemU6IC0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnSW5pdGlhbGl6aW5nIGFwcCdcblxuICAgICAgICAgICAgcmVtaW5kbWUgPSBuZXcgUmVtaW5kbWVQYWdlKClcbiAgICAgICAgICAgIGFib3V0ID0gbmV3IEFib3V0UGFnZSgpXG4gICAgICAgICAgICBAcGFnZXMgPSBuZXcgUGFnZXMoW3JlbWluZG1lLCBhYm91dF0pXG4gICAgICAgICAgICBAaGVhZGVyID0gbmV3IEhlYWRlcigpXG5cbiAgICAgICAgICAgIEBpbml0TGlzdGVuZXIoKVxuXG5cbiAgICAgICAgaW5pdExpc3RlbmVyOiAtPlxuICAgICAgICAgICAgX2FwcCA9IEBcbiAgICAgICAgICAgIEJhY2tib25lLm9uICdhbGwnLCAobmFtZSktPlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdFdmVudCBjYXVnaHQ6JywgbmFtZSwgYXJndW1lbnRzXG4gICAgICAgICAgICAgICAgaWYgbmFtZSBpbiBfLmZ1bmN0aW9ucyhfYXBwKVxuICAgICAgICAgICAgICAgICAgICBfYXBwW25hbWVdLmFwcGx5IF9hcHAsIGFyZ3VtZW50c1xuXG4gICAgICAgIHNob3dGaXJzdFBhZ2U6IC0+XG4gICAgICAgICAgICBCYWNrYm9uZS50cmlnZ2VyICdjaGFuZ2VQYWdlJywgQHBhZ2VzLmZpcnN0KClcblxuICAgICAgICByZW5kZXI6IC0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnUmVuZGVyaW5nIGFwcGxpY2F0aW9uLidcbiAgICAgICAgICAgIEBoZWFkZXIucmVuZGVyKClcbiAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3JlbmRlcmVkJ1xuXG4gICAgICAgIGNoYW5nZVBhZ2U6IChlLCBwYWdlKS0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnY2hhbmdlcGFnZSdcbiAgICAgICAgICAgIEBhY3RpdmUgPSBwYWdlXG4gICAgICAgICAgICBwYWdlVmlldyA9IG5ldyBQYWdlVmlld1xuICAgICAgICAgICAgICAgIG1vZGVsOiBwYWdlXG4gICAgICAgICAgICBwYWdlVmlldy5yZW5kZXIoKVxuICAgICAgICAgICAgQCRlbC5odG1sIHBhZ2VWaWV3LmVsXG4gICAgICAgICAgICBAaGVhZGVyLnJlbmRlckxpbmtzKClcbiAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3JlbmRlcmVkJ1xuXG4gICAgICAgIGFjdGl2ZVBhZ2U6IC0+XG4gICAgICAgICAgICBAYWN0aXZlXG5cblxuICAgIHdpbmRvdy5hcHAgPSBuZXcgQXBwVmlldygpXG4gICAgd2luZG93LmFwcC5yZW5kZXIoKVxuICAgIHdpbmRvdy5hcHAuc2hvd0ZpcnN0UGFnZSgpXG4iLCJQYWdlID0gcmVxdWlyZSAnLi9wYWdlLmNvZmZlZSdcblxuY2xhc3MgQWJvdXRtZVBhZ2UgZXh0ZW5kcyBQYWdlXG4gICAgXG4gICAgZGVmYXVsdHM6IC0+XG4gICAgICAgICd0aXRsZSc6ICdBYm91dCdcbiAgICAgICAgJ2h0bWwnOiAnXG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBIZXksIGlcXCdtIFpvem9yLiBDaGVjayBvdXQgbXkgZ2l0aHViIDxhIGhyZWY9XCJodHRwOi8vZ2l0aHViLmNvbS9lbWlsZWNhcm9uXCI+aGVyZTwvYT4hXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cD5UaGlzIGFwcCB3YXMgYnVpbHQgdXNpbmcgPGEgaHJlZj1cImh0dHA6Ly9mbGFzay5wb2Nvby5vcmcvXCI+Rmxhc2s8L2E+LCA8YSBocmVmPVwiaHR0cDovL2JhY2tib25lanMub3JnL1wiPkJhY2tib25lPC9hPiwgPGEgaHJlZj1cImh0dHA6Ly9nZXRib290c3RyYXAuY29tL1wiPkJvb3RzdHJhcDwvYT4gYW5kIG1vcmUuPC9wPlxuICAgICAgICAnXG5cbm1vZHVsZS5leHBvcnRzID0gQWJvdXRtZVBhZ2UiLCJcbmNsYXNzIFBhZ2UgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICAgICMjI1xuICAgIFBhZ2VzIHNob3VsZCBleHRlbmQgdGhpcyBjbGFzc1xuICAgIEV2ZXJ5IHBhZ2Ugc2hvdWxkIGhhdmU6XG4gICAgICAgIC0gQW4gaHRtbCBhdHRyaWJ1dGUgd2hpY2ggd2lsbCBiZSByZW5kZXJlZCBkaXJlY3RseVxuICAgICAgICAgICAgT1JcbiAgICAgICAgLSBBIHNldCBvZiBmdW5jdGlvbnMgaW4gcGFnZS5wYW5lbHMgb2JqZWN0LlxuICAgICAgICAgIFRlbXBsYXRlIHdpdGggc2FtZSBpZCBhcyB0aGUgZnVuY3Rpb25zIG5hbWUgd2lsbCBiZSBsb2FkZWRcbiAgICAgICAgICBDb2RlIGZyb20gdGhlIGZ1bmN0aW9uIHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiBwYW5lbCBpcyByZW5kZXJlZFxuICAgICMjI1xuXG4gICAgZGVmYXVsdHM6XG4gICAgICAgIHRpdGxlOiAndW50aXRsZWQgcGFnZSdcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxuXG4gICAgaXNBY3RpdmU6IC0+XG4gICAgICAgIEBnZXQoJ2FjdGl2ZScpXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VcbiIsIlxuUGFnZSA9IHJlcXVpcmUgJy4vcGFnZS5jb2ZmZWUnXG5cbmNsYXNzIFJlbWluZG1lUGFnZSBleHRlbmRzIFBhZ2VcbiAgICBcbiAgICBkZWZhdWx0czogLT5cbiAgICAgICAgdGl0bGU6ICdSZW1pbmQgbWUnXG4gICAgICAgIHBhbmVsczogXG4gICAgICAgICAgICAncm1lX3dlbGNvbWUnOiAtPlxuICAgICAgICAgICAgICAgIHZpZXcgPSBAXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgJ2hlbGxvJywgJCgnI3dlbGNvbWVfYnV0dG9uJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwid2VsY29tZV9idXR0b25cIlxuICAgICAgICAgICAgICAgICQoJyN3ZWxjb21lX2J1dHRvbicpLmNsaWNrIC0+XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdtYWInLCB2aWV3XG4gICAgICAgICAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3N3aXRjaFBhbmVsJywgJ3JtZV9kYXRlJ1xuICAgICAgICAgICAgJ3JtZV9kYXRlJzogLT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAnYXQgbGFzdCdcbiAgICBcblxubW9kdWxlLmV4cG9ydHMgPSBSZW1pbmRtZVBhZ2VcbiIsIlxuY2xhc3MgSGVhZGVyIGV4dGVuZHMgQmFja2JvbmUuVmlld1xuXG4gICAgZWw6ICcjaGVhZGVyJ1xuXG4gICAgdWk6XG4gICAgICAgIGxpbmtzOiAnI2hlYWRlci1saW5rcydcblxuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlICQoJyNoZWFkZXItdGVtcGxhdGUnKS5odG1sKClcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgIyBBdm9pZCBsb3NpbmcgZmJfYnV0dG9uIGh0bWxcbiAgICAgICAgQGZiX2h0bWwgPSAkKCcuZmItc2hhcmUtYnV0dG9uJykuaHRtbCgpIGlmIG5vdCBAZmdcbiAgICAgICAgXG4gICAgICAgIEAkZWwuaHRtbCBAdGVtcGxhdGVcbiAgICAgICAgJCgnLmZiLXNoYXJlLWJ1dHRvbicpLmh0bWwoQGZiX2h0bWwpXG4gICAgICAgIEByZW5kZXJMaW5rcygpXG5cbiAgICByZW5kZXJMaW5rczogLT5cbiAgICAgICAgX2VsID0gJCBAdWkubGlua3NcbiAgICAgICAgX2VsLmh0bWwgJydcblxuICAgICAgICB3aW5kb3cuYXBwLnBhZ2VzLmZvckVhY2ggKHBhZ2UpIC0+XG4gICAgICAgICAgIGxpbmtWaWV3ID0gbmV3IFBhZ2VMaW5rVmlld1xuICAgICAgICAgICAgICAgIG1vZGVsOiBwYWdlXG4gICAgICAgICAgIF9lbC5hcHBlbmQgbGlua1ZpZXcucmVuZGVyKCkuZWxcblxuXG5jbGFzcyBQYWdlTGlua1ZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG4gICAgdGFnTmFtZTogJ2xpJ1xuXG4gICAgZXZlbnRzOlxuICAgICAgICAnY2xpY2snOiAnb25DbGljaydcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQCRlbC5odG1sIFwiPGE+XCIgKyBAbW9kZWwuZ2V0KCd0aXRsZScpICsgXCI8L2E+XCJcbiAgICAgICAgaWYgQG1vZGVsID09IHdpbmRvdy5hcHAuYWN0aXZlUGFnZSgpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAneWVzJ1xuICAgICAgICAgICAgQCRlbC5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgICAgICBAXG5cbiAgICBvbkNsaWNrOiAtPlxuICAgICAgICBCYWNrYm9uZS50cmlnZ2VyICdjaGFuZ2VQYWdlJywgQG1vZGVsXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclxuIiwiUGFuZWxWaWV3ID0gcmVxdWlyZSAnLi9wYW5lbF92aWV3LmNvZmZlZSdcblxuY2xhc3MgUGFnZSBleHRlbmRzIEJhY2tib25lLlZpZXdcblxuICAgIHRpdGxlOiAndW5kZWZpbmVkX3BhZ2UnXG5cbiAgICBpbml0aWFsaXplOiAtPlxuICAgICAgICBCYWNrYm9uZS5vbiAnc3dpdGNoUGFuZWwnLCBAc3dpdGNoUGFuZWwsIEBcbiAgICAgICAgQmFja2JvbmUub24gJ3JlbmRlcmVkJywgQGxvYWRQYW5lbEpzLCBAXG5cbiAgICAgICAgcGFuZWxzID0gQG1vZGVsLmdldCAncGFuZWxzJ1xuICAgICAgICBAc3dpdGNoUGFuZWwgXy5maXJzdCBfLmtleXMgcGFuZWxzIGlmIHBhbmVsc1xuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBAcmVuZGVySHRtbCgpIGlmIEBtb2RlbC5nZXQgJ2h0bWwnXG4gICAgICAgIEByZW5kZXJBY3RpdmVQYW5lbCgpIGlmIEBtb2RlbC5nZXQgJ2FjdGl2ZVBhbmVsJ1xuICAgICAgICBCYWNrYm9uZS50cmlnZ2VyICdyZW5kZXJlZCdcbiAgICBcbiAgICByZW5kZXJIdG1sOiAtPlxuICAgICAgICBAJGVsLmh0bWwgQG1vZGVsLmdldCAnaHRtbCdcblxuICAgIHJlbmRlckFjdGl2ZVBhbmVsOiAtPlxuICAgICAgICBAJGVsLmh0bWwgQG1vZGVsLmdldCgnYWN0aXZlUGFuZWwnKS5yZW5kZXIoKS5lbFxuXG4gICAgc3dpdGNoUGFuZWw6IChuYW1lKS0+XG4gICAgICAgIGlmIG5hbWUgaW4gXy5mdW5jdGlvbnMgQG1vZGVsLmdldCAncGFuZWxzJ1xuICAgICAgICAgICAgYWN0aXZlUGFuZWwgPSBuZXcgUGFuZWxWaWV3KClcbiAgICAgICAgICAgIGpzID0gKEBtb2RlbC5nZXQgJ3BhbmVscycpW25hbWVdIG9yIG51bGxcbiAgICAgICAgICAgIGFjdGl2ZVBhbmVsLnNldFRlbXBsYXRlRnJvbUlkIG5hbWUsIGpzXG4gICAgICAgICAgICBAbW9kZWwuc2V0ICdhY3RpdmVQYW5lbCcsIGFjdGl2ZVBhbmVsXG4gICAgICAgICAgICBAcmVuZGVyKClcblxuICAgIGxvYWRQYW5lbEpzOiAtPlxuICAgICAgICBjb25zb2xlLmxvZyAnaGFuZGxlcicsIEBtb2RlbFxuICAgICAgICBwYW4gPSBAbW9kZWwuZ2V0KCdhY3RpdmVQYW5lbCcpXG4gICAgICAgIHBhbi5sb2FkSnMoKSBpZiBwYW5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZVxuIiwiUGFuZWxWaWV3ID0gcmVxdWlyZSAnLi9wYW5lbF92aWV3LmNvZmZlZSdcblxuY2xhc3MgUGFuZWwgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICByZW5kZXI6IC0+XG4gICAgICAgIGNvbnNvbGUubG9nICdyZW5kZXJpbmcgcGFuZWwnLCBAdGVtcGxhdGUoKVxuICAgICAgICBAJGVsLmh0bWwgQHRlbXBsYXRlKClcbiAgICAgICAgQFxuICAgIFxuICAgIHNldFRlbXBsYXRlRnJvbUlkOiAoaWQsIGpzKS0+XG4gICAgICAgIEB0ZW1wbGF0ZSA9IF8udGVtcGxhdGUgJCgnIycgKyBpZCkuaHRtbCgpXG4gICAgICAgIEBsb2FkSnMgPSBqc1xuICAgICAgICBjb25zb2xlLmxvZyAnanMnLCBqc1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFuZWwiXX0=
