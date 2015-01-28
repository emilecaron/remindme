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
          return $('#welcome_button').click(function() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L2NvbGxlY3Rpb25zL3BhZ2VzLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC9tYWluLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC9tb2RlbHMvYWJvdXRfcGFnZS5jb2ZmZWUiLCIvaG9tZS9lbWlsZS93b3Jrc3BhY2UvcmVtaW5kbWUvZnJvbnQvbW9kZWxzL3BhZ2UuY29mZmVlIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L21vZGVscy9yZW1pbmRtZV9wYWdlLmNvZmZlZSIsIi9ob21lL2VtaWxlL3dvcmtzcGFjZS9yZW1pbmRtZS9mcm9udC92aWV3cy9oZWFkZXIuY29mZmVlIiwiL2hvbWUvZW1pbGUvd29ya3NwYWNlL3JlbWluZG1lL2Zyb250L3ZpZXdzL3BhZ2Vfdmlldy5jb2ZmZWUiLCIvaG9tZS9lbWlsZS93b3Jrc3BhY2UvcmVtaW5kbWUvZnJvbnQvdmlld3MvcGFuZWxfdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLFdBQUE7RUFBQTtpU0FBQTs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLHVCQUFSLENBQVAsQ0FBQTs7QUFBQTtBQUlJLDBCQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSxrQkFBQSxLQUFBLEdBQU8sSUFBUCxDQUFBOztlQUFBOztHQUZnQixRQUFRLENBQUMsV0FGN0IsQ0FBQTs7QUFBQSxNQVFNLENBQUMsT0FBUCxHQUFpQixLQVJqQixDQUFBOzs7OztBQ0FBLElBQUE7O3VKQUFBOztBQUFBLENBQUEsQ0FBRSxTQUFBLEdBQUE7QUFDRTtBQUFBOzs7S0FBQTtBQUFBLE1BQUEseURBQUE7QUFBQSxFQVFBLE1BQUEsR0FBUyxPQUFBLENBQVEsdUJBQVIsQ0FSVCxDQUFBO0FBQUEsRUFTQSxLQUFBLEdBQVEsT0FBQSxDQUFRLDRCQUFSLENBVFIsQ0FBQTtBQUFBLEVBVUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSwrQkFBUixDQVZmLENBQUE7QUFBQSxFQVdBLFNBQUEsR0FBWSxPQUFBLENBQVEsNEJBQVIsQ0FYWixDQUFBO0FBQUEsRUFZQSxRQUFBLEdBQVcsT0FBQSxDQUFRLDBCQUFSLENBWlgsQ0FBQTtBQUFBLEVBZU07QUFFRiw4QkFBQSxDQUFBOzs7O0tBQUE7O0FBQUEsc0JBQUEsRUFBQSxHQUFJLE9BQUosQ0FBQTs7QUFBQSxzQkFFQSxNQUFBLEdBQ0k7QUFBQSxNQUFBLFlBQUEsRUFBYyxjQUFkO0tBSEosQ0FBQTs7QUFBQSxzQkFLQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1IsVUFBQSxlQUFBO0FBQUEsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGtCQUFaLENBQUEsQ0FBQTtBQUFBLE1BRUEsUUFBQSxHQUFlLElBQUEsWUFBQSxDQUFBLENBRmYsQ0FBQTtBQUFBLE1BR0EsS0FBQSxHQUFZLElBQUEsU0FBQSxDQUFBLENBSFosQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLEtBQUEsQ0FBTSxDQUFDLFFBQUQsRUFBVyxLQUFYLENBQU4sQ0FKYixDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsTUFBRCxHQUFjLElBQUEsTUFBQSxDQUFBLENBTGQsQ0FBQTthQU9BLElBQUMsQ0FBQSxZQUFELENBQUEsRUFSUTtJQUFBLENBTFosQ0FBQTs7QUFBQSxzQkFnQkEsWUFBQSxHQUFjLFNBQUEsR0FBQTtBQUNWLFVBQUEsSUFBQTtBQUFBLE1BQUEsSUFBQSxHQUFPLElBQVAsQ0FBQTthQUNBLFFBQVEsQ0FBQyxFQUFULENBQVksS0FBWixFQUFtQixTQUFDLElBQUQsR0FBQTtBQUNmLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLElBQTdCLEVBQW1DLFNBQW5DLENBQUEsQ0FBQTtBQUNBLFFBQUEsSUFBRyxlQUFRLENBQUMsQ0FBQyxTQUFGLENBQVksSUFBWixDQUFSLEVBQUEsSUFBQSxNQUFIO2lCQUNJLElBQUssQ0FBQSxJQUFBLENBQUssQ0FBQyxLQUFYLENBQWlCLElBQWpCLEVBQXVCLFNBQXZCLEVBREo7U0FGZTtNQUFBLENBQW5CLEVBRlU7SUFBQSxDQWhCZCxDQUFBOztBQUFBLHNCQXVCQSxhQUFBLEdBQWUsU0FBQSxHQUFBO2FBQ1gsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsWUFBakIsRUFBK0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFQLENBQUEsQ0FBL0IsRUFEVztJQUFBLENBdkJmLENBQUE7O0FBQUEsc0JBMEJBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDSixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVosQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLE1BQVIsQ0FBQSxDQURBLENBQUE7YUFFQSxRQUFRLENBQUMsT0FBVCxDQUFpQixVQUFqQixFQUhJO0lBQUEsQ0ExQlIsQ0FBQTs7QUFBQSxzQkErQkEsVUFBQSxHQUFZLFNBQUMsQ0FBRCxFQUFJLElBQUosR0FBQTtBQUNSLFVBQUEsUUFBQTtBQUFBLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxZQUFaLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQURWLENBQUE7QUFBQSxNQUVBLFFBQUEsR0FBZSxJQUFBLFFBQUEsQ0FDWDtBQUFBLFFBQUEsS0FBQSxFQUFPLElBQVA7T0FEVyxDQUZmLENBQUE7QUFBQSxNQUlBLFFBQVEsQ0FBQyxNQUFULENBQUEsQ0FKQSxDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxRQUFRLENBQUMsRUFBbkIsQ0FMQSxDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUEsTUFBTSxDQUFDLFdBQVIsQ0FBQSxDQU5BLENBQUE7YUFPQSxRQUFRLENBQUMsT0FBVCxDQUFpQixVQUFqQixFQVJRO0lBQUEsQ0EvQlosQ0FBQTs7QUFBQSxzQkF5Q0EsVUFBQSxHQUFZLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxPQURPO0lBQUEsQ0F6Q1osQ0FBQTs7bUJBQUE7O0tBRmtCLFFBQVEsQ0FBQyxLQWYvQixDQUFBO0FBQUEsRUE4REEsTUFBTSxDQUFDLEdBQVAsR0FBaUIsSUFBQSxPQUFBLENBQUEsQ0E5RGpCLENBQUE7QUFBQSxFQStEQSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQVgsQ0FBQSxDQS9EQSxDQUFBO1NBZ0VBLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBWCxDQUFBLEVBakVGO0FBQUEsQ0FBRixDQUFBLENBQUE7Ozs7O0FDQUEsSUFBQSxpQkFBQTtFQUFBO2lTQUFBOztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsZUFBUixDQUFQLENBQUE7O0FBQUE7QUFJSSxnQ0FBQSxDQUFBOzs7O0dBQUE7O0FBQUEsd0JBQUEsUUFBQSxHQUFVLFNBQUEsR0FBQTtXQUNOO0FBQUEsTUFBQSxPQUFBLEVBQVMsT0FBVDtBQUFBLE1BQ0EsTUFBQSxFQUFRLHVSQURSO01BRE07RUFBQSxDQUFWLENBQUE7O3FCQUFBOztHQUZzQixLQUYxQixDQUFBOztBQUFBLE1BYU0sQ0FBQyxPQUFQLEdBQWlCLFdBYmpCLENBQUE7Ozs7O0FDQ0EsSUFBQSxJQUFBO0VBQUE7aVNBQUE7O0FBQUE7QUFDSSx5QkFBQSxDQUFBOzs7O0dBQUE7O0FBQUE7QUFBQTs7Ozs7Ozs7S0FBQTs7QUFBQSxpQkFVQSxRQUFBLEdBQ0k7QUFBQSxJQUFBLEtBQUEsRUFBTyxlQUFQO0FBQUEsSUFDQSxNQUFBLEVBQVEsS0FEUjtHQVhKLENBQUE7O0FBQUEsaUJBY0EsUUFBQSxHQUFVLFNBQUEsR0FBQTtXQUNOLElBQUMsQ0FBQSxHQUFELENBQUssUUFBTCxFQURNO0VBQUEsQ0FkVixDQUFBOztjQUFBOztHQURlLFFBQVEsQ0FBQyxNQUE1QixDQUFBOztBQUFBLE1Bb0JNLENBQUMsT0FBUCxHQUFpQixJQXBCakIsQ0FBQTs7Ozs7QUNBQSxJQUFBLGtCQUFBO0VBQUE7aVNBQUE7O0FBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxlQUFSLENBQVAsQ0FBQTs7QUFBQTtBQUlJLGlDQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSx5QkFBQSxRQUFBLEdBQVUsU0FBQSxHQUFBO1dBQ047QUFBQSxNQUFBLEtBQUEsRUFBTyxXQUFQO0FBQUEsTUFDQSxNQUFBLEVBQ0k7QUFBQSxRQUFBLGFBQUEsRUFBZSxTQUFBLEdBQUE7aUJBQ1gsQ0FBQSxDQUFFLGlCQUFGLENBQW9CLENBQUMsS0FBckIsQ0FBMkIsU0FBQSxHQUFBO21CQUN2QixRQUFRLENBQUMsT0FBVCxDQUFpQixhQUFqQixFQUFnQyxVQUFoQyxFQUR1QjtVQUFBLENBQTNCLEVBRFc7UUFBQSxDQUFmO0FBQUEsUUFHQSxVQUFBLEVBQVksU0FBQSxHQUFBO2lCQUNSLE9BQU8sQ0FBQyxHQUFSLENBQVksU0FBWixFQURRO1FBQUEsQ0FIWjtPQUZKO01BRE07RUFBQSxDQUFWLENBQUE7O3NCQUFBOztHQUZ1QixLQUYzQixDQUFBOztBQUFBLE1BY00sQ0FBQyxPQUFQLEdBQWlCLFlBZGpCLENBQUE7Ozs7O0FDQUEsSUFBQSxvQkFBQTtFQUFBO2lTQUFBOztBQUFBO0FBRUksMkJBQUEsQ0FBQTs7OztHQUFBOztBQUFBLG1CQUFBLEVBQUEsR0FBSSxTQUFKLENBQUE7O0FBQUEsbUJBRUEsRUFBQSxHQUNJO0FBQUEsSUFBQSxLQUFBLEVBQU8sZUFBUDtHQUhKLENBQUE7O0FBQUEsbUJBS0EsUUFBQSxHQUFVLENBQUMsQ0FBQyxRQUFGLENBQVcsQ0FBQSxDQUFFLGtCQUFGLENBQXFCLENBQUMsSUFBdEIsQ0FBQSxDQUFYLENBTFYsQ0FBQTs7QUFBQSxtQkFPQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBRUosSUFBQSxJQUEyQyxDQUFBLElBQUssQ0FBQSxFQUFoRDtBQUFBLE1BQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxDQUFBLENBQUUsa0JBQUYsQ0FBcUIsQ0FBQyxJQUF0QixDQUFBLENBQVgsQ0FBQTtLQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxJQUFDLENBQUEsUUFBWCxDQUZBLENBQUE7QUFBQSxJQUdBLENBQUEsQ0FBRSxrQkFBRixDQUFxQixDQUFDLElBQXRCLENBQTJCLElBQUMsQ0FBQSxPQUE1QixDQUhBLENBQUE7V0FJQSxJQUFDLENBQUEsV0FBRCxDQUFBLEVBTkk7RUFBQSxDQVBSLENBQUE7O0FBQUEsbUJBZUEsV0FBQSxHQUFhLFNBQUEsR0FBQTtBQUNULFFBQUEsR0FBQTtBQUFBLElBQUEsR0FBQSxHQUFNLENBQUEsQ0FBRSxJQUFDLENBQUEsRUFBRSxDQUFDLEtBQU4sQ0FBTixDQUFBO0FBQUEsSUFDQSxHQUFHLENBQUMsSUFBSixDQUFTLEVBQVQsQ0FEQSxDQUFBO1dBR0EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBakIsQ0FBeUIsU0FBQyxJQUFELEdBQUE7QUFDdEIsVUFBQSxRQUFBO0FBQUEsTUFBQSxRQUFBLEdBQWUsSUFBQSxZQUFBLENBQ1Y7QUFBQSxRQUFBLEtBQUEsRUFBTyxJQUFQO09BRFUsQ0FBZixDQUFBO2FBRUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxRQUFRLENBQUMsTUFBVCxDQUFBLENBQWlCLENBQUMsRUFBN0IsRUFIc0I7SUFBQSxDQUF6QixFQUpTO0VBQUEsQ0FmYixDQUFBOztnQkFBQTs7R0FGaUIsUUFBUSxDQUFDLEtBQTlCLENBQUE7O0FBQUE7QUE0QkksaUNBQUEsQ0FBQTs7OztHQUFBOztBQUFBLHlCQUFBLE9BQUEsR0FBUyxJQUFULENBQUE7O0FBQUEseUJBRUEsTUFBQSxHQUNJO0FBQUEsSUFBQSxPQUFBLEVBQVMsU0FBVDtHQUhKLENBQUE7O0FBQUEseUJBS0EsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNKLElBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsS0FBQSxHQUFRLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLE9BQVgsQ0FBUixHQUE4QixNQUF4QyxDQUFBLENBQUE7QUFDQSxJQUFBLElBQUcsSUFBQyxDQUFBLEtBQUQsS0FBVSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVgsQ0FBQSxDQUFiO0FBQ0ksTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLEtBQVosQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsQ0FBYyxRQUFkLENBREEsQ0FESjtLQURBO1dBSUEsS0FMSTtFQUFBLENBTFIsQ0FBQTs7QUFBQSx5QkFZQSxPQUFBLEdBQVMsU0FBQSxHQUFBO1dBQ0wsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsWUFBakIsRUFBK0IsSUFBQyxDQUFBLEtBQWhDLEVBREs7RUFBQSxDQVpULENBQUE7O3NCQUFBOztHQUR1QixRQUFRLENBQUMsS0EzQnBDLENBQUE7O0FBQUEsTUE2Q00sQ0FBQyxPQUFQLEdBQWlCLE1BN0NqQixDQUFBOzs7OztBQ0RBLElBQUEsZUFBQTtFQUFBOzt1SkFBQTs7QUFBQSxTQUFBLEdBQVksT0FBQSxDQUFRLHFCQUFSLENBQVosQ0FBQTs7QUFBQTtBQUlJLHlCQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSxpQkFBQSxLQUFBLEdBQU8sZ0JBQVAsQ0FBQTs7QUFBQSxpQkFFQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1IsUUFBQSxNQUFBO0FBQUEsSUFBQSxRQUFRLENBQUMsRUFBVCxDQUFZLGFBQVosRUFBMkIsSUFBQyxDQUFBLFdBQTVCLEVBQXlDLElBQXpDLENBQUEsQ0FBQTtBQUFBLElBQ0EsUUFBUSxDQUFDLEVBQVQsQ0FBWSxVQUFaLEVBQXdCLElBQUMsQ0FBQSxXQUF6QixFQUFzQyxJQUF0QyxDQURBLENBQUE7QUFBQSxJQUdBLE1BQUEsR0FBUyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxRQUFYLENBSFQsQ0FBQTtBQUlBLElBQUEsSUFBc0MsTUFBdEM7YUFBQSxJQUFDLENBQUEsV0FBRCxDQUFhLENBQUMsQ0FBQyxLQUFGLENBQVEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxNQUFQLENBQVIsQ0FBYixFQUFBO0tBTFE7RUFBQSxDQUZaLENBQUE7O0FBQUEsaUJBU0EsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNKLElBQUEsSUFBaUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsTUFBWCxDQUFqQjtBQUFBLE1BQUEsSUFBQyxDQUFBLFVBQUQsQ0FBQSxDQUFBLENBQUE7S0FBQTtBQUNBLElBQUEsSUFBd0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsYUFBWCxDQUF4QjtBQUFBLE1BQUEsSUFBQyxDQUFBLGlCQUFELENBQUEsQ0FBQSxDQUFBO0tBREE7V0FFQSxRQUFRLENBQUMsT0FBVCxDQUFpQixVQUFqQixFQUhJO0VBQUEsQ0FUUixDQUFBOztBQUFBLGlCQWNBLFVBQUEsR0FBWSxTQUFBLEdBQUE7V0FDUixJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxNQUFYLENBQVYsRUFEUTtFQUFBLENBZFosQ0FBQTs7QUFBQSxpQkFpQkEsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO1dBQ2YsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsYUFBWCxDQUF5QixDQUFDLE1BQTFCLENBQUEsQ0FBa0MsQ0FBQyxFQUE3QyxFQURlO0VBQUEsQ0FqQm5CLENBQUE7O0FBQUEsaUJBb0JBLFdBQUEsR0FBYSxTQUFDLElBQUQsR0FBQTtBQUNULFFBQUEsZUFBQTtBQUFBLElBQUEsSUFBRyxlQUFRLENBQUMsQ0FBQyxTQUFGLENBQVksSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsUUFBWCxDQUFaLENBQVIsRUFBQSxJQUFBLE1BQUg7QUFDSSxNQUFBLFdBQUEsR0FBa0IsSUFBQSxTQUFBLENBQUEsQ0FBbEIsQ0FBQTtBQUFBLE1BQ0EsRUFBQSxHQUFLLENBQUMsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsUUFBWCxDQUFELENBQXNCLENBQUEsSUFBQSxDQUF0QixJQUErQixJQURwQyxDQUFBO0FBQUEsTUFFQSxXQUFXLENBQUMsaUJBQVosQ0FBOEIsSUFBOUIsRUFBb0MsRUFBcEMsQ0FGQSxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxhQUFYLEVBQTBCLFdBQTFCLENBSEEsQ0FBQTthQUlBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFMSjtLQURTO0VBQUEsQ0FwQmIsQ0FBQTs7QUFBQSxpQkE0QkEsV0FBQSxHQUFhLFNBQUEsR0FBQTtBQUNULFFBQUEsR0FBQTtBQUFBLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLElBQUMsQ0FBQSxLQUF4QixDQUFBLENBQUE7QUFBQSxJQUNBLEdBQUEsR0FBTSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxhQUFYLENBRE4sQ0FBQTtBQUVBLElBQUEsSUFBZ0IsR0FBaEI7YUFBQSxHQUFHLENBQUMsTUFBSixDQUFBLEVBQUE7S0FIUztFQUFBLENBNUJiLENBQUE7O2NBQUE7O0dBRmUsUUFBUSxDQUFDLEtBRjVCLENBQUE7O0FBQUEsTUF1Q00sQ0FBQyxPQUFQLEdBQWlCLElBdkNqQixDQUFBOzs7OztBQ0FBLElBQUEsZ0JBQUE7RUFBQTtpU0FBQTs7QUFBQSxTQUFBLEdBQVksT0FBQSxDQUFRLHFCQUFSLENBQVosQ0FBQTs7QUFBQTtBQUlJLDBCQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSxrQkFBQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ0osSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQUMsQ0FBQSxRQUFELENBQUEsQ0FBL0IsQ0FBQSxDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxJQUFDLENBQUEsUUFBRCxDQUFBLENBQVYsQ0FEQSxDQUFBO1dBRUEsS0FISTtFQUFBLENBQVIsQ0FBQTs7QUFBQSxrQkFLQSxpQkFBQSxHQUFtQixTQUFDLEVBQUQsRUFBSyxFQUFMLEdBQUE7QUFDZixJQUFBLElBQUMsQ0FBQSxRQUFELEdBQVksQ0FBQyxDQUFDLFFBQUYsQ0FBVyxDQUFBLENBQUUsR0FBQSxHQUFNLEVBQVIsQ0FBVyxDQUFDLElBQVosQ0FBQSxDQUFYLENBQVosQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxFQURWLENBQUE7V0FFQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVosRUFBa0IsRUFBbEIsRUFIZTtFQUFBLENBTG5CLENBQUE7O2VBQUE7O0dBRmdCLFFBQVEsQ0FBQyxLQUY3QixDQUFBOztBQUFBLE1BZU0sQ0FBQyxPQUFQLEdBQWlCLEtBZmpCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiUGFnZSA9IHJlcXVpcmUgJy4uL21vZGVscy9wYWdlLmNvZmZlZSdcblxuY2xhc3MgUGFnZXMgZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG5cbiAgICBtb2RlbDogUGFnZVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlc1xuIiwiJCAtPlxuICAgICMjI1xuICAgIGFsbCBjbGFzcyBkZWYgbXVzdCBiZSBlbmNhcHN1bGF0ZWQgaW5zaWRlICQucmVhZHkoKVxuICAgIG90aGVyd2lzZSB0ZW1wbGF0ZXMgZnJvbSBwYWdlLmh0bWwgd29uJ3QgYmUgYXZhaWxhYmxlLlxuICAgICMjI1xuICAgIFxuICAgICNGb3JtVmlldyA9IHJlcXVpcmUgJy4vdmlld3MvZm9ybV92aWV3LmNvZmZlZSdcbiAgICAjRm9ybSA9IHJlcXVpcmUgJy4vbW9kZWxzL2Zvcm0uY29mZmVlJ1xuXG4gICAgSGVhZGVyID0gcmVxdWlyZSAnLi92aWV3cy9oZWFkZXIuY29mZmVlJ1xuICAgIFBhZ2VzID0gcmVxdWlyZSAnLi9jb2xsZWN0aW9ucy9wYWdlcy5jb2ZmZWUnXG4gICAgUmVtaW5kbWVQYWdlID0gcmVxdWlyZSAnLi9tb2RlbHMvcmVtaW5kbWVfcGFnZS5jb2ZmZWUnXG4gICAgQWJvdXRQYWdlID0gcmVxdWlyZSAnLi9tb2RlbHMvYWJvdXRfcGFnZS5jb2ZmZWUnXG4gICAgUGFnZVZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL3BhZ2Vfdmlldy5jb2ZmZWUnXG5cblxuICAgIGNsYXNzIEFwcFZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICAgICAgZWw6ICcjcGFnZSdcblxuICAgICAgICBldmVudHM6XG4gICAgICAgICAgICAnY2hhbmdlUGFnZSc6ICdvbkNoYW5nZVBhZ2UnXG5cbiAgICAgICAgaW5pdGlhbGl6ZTogLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdJbml0aWFsaXppbmcgYXBwJ1xuXG4gICAgICAgICAgICByZW1pbmRtZSA9IG5ldyBSZW1pbmRtZVBhZ2UoKVxuICAgICAgICAgICAgYWJvdXQgPSBuZXcgQWJvdXRQYWdlKClcbiAgICAgICAgICAgIEBwYWdlcyA9IG5ldyBQYWdlcyhbcmVtaW5kbWUsIGFib3V0XSlcbiAgICAgICAgICAgIEBoZWFkZXIgPSBuZXcgSGVhZGVyKClcblxuICAgICAgICAgICAgQGluaXRMaXN0ZW5lcigpXG5cblxuICAgICAgICBpbml0TGlzdGVuZXI6IC0+XG4gICAgICAgICAgICBfYXBwID0gQFxuICAgICAgICAgICAgQmFja2JvbmUub24gJ2FsbCcsIChuYW1lKS0+XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgJ0V2ZW50IGNhdWdodDonLCBuYW1lLCBhcmd1bWVudHNcbiAgICAgICAgICAgICAgICBpZiBuYW1lIGluIF8uZnVuY3Rpb25zKF9hcHApXG4gICAgICAgICAgICAgICAgICAgIF9hcHBbbmFtZV0uYXBwbHkgX2FwcCwgYXJndW1lbnRzXG5cbiAgICAgICAgc2hvd0ZpcnN0UGFnZTogLT5cbiAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ2NoYW5nZVBhZ2UnLCBAcGFnZXMuZmlyc3QoKVxuXG4gICAgICAgIHJlbmRlcjogLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdSZW5kZXJpbmcgYXBwbGljYXRpb24uJ1xuICAgICAgICAgICAgQGhlYWRlci5yZW5kZXIoKVxuICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlciAncmVuZGVyZWQnXG5cbiAgICAgICAgY2hhbmdlUGFnZTogKGUsIHBhZ2UpLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdjaGFuZ2VwYWdlJ1xuICAgICAgICAgICAgQGFjdGl2ZSA9IHBhZ2VcbiAgICAgICAgICAgIHBhZ2VWaWV3ID0gbmV3IFBhZ2VWaWV3XG4gICAgICAgICAgICAgICAgbW9kZWw6IHBhZ2VcbiAgICAgICAgICAgIHBhZ2VWaWV3LnJlbmRlcigpXG4gICAgICAgICAgICBAJGVsLmh0bWwgcGFnZVZpZXcuZWxcbiAgICAgICAgICAgIEBoZWFkZXIucmVuZGVyTGlua3MoKVxuICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlciAncmVuZGVyZWQnXG5cbiAgICAgICAgYWN0aXZlUGFnZTogLT5cbiAgICAgICAgICAgIEBhY3RpdmVcblxuXG4gICAgd2luZG93LmFwcCA9IG5ldyBBcHBWaWV3KClcbiAgICB3aW5kb3cuYXBwLnJlbmRlcigpXG4gICAgd2luZG93LmFwcC5zaG93Rmlyc3RQYWdlKClcbiIsIlBhZ2UgPSByZXF1aXJlICcuL3BhZ2UuY29mZmVlJ1xuXG5jbGFzcyBBYm91dG1lUGFnZSBleHRlbmRzIFBhZ2VcbiAgICBcbiAgICBkZWZhdWx0czogLT5cbiAgICAgICAgJ3RpdGxlJzogJ0Fib3V0J1xuICAgICAgICAnaHRtbCc6ICdcbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEhleSwgaVxcJ20gWm96b3IuIENoZWNrIG91dCBteSBnaXRodWIgPGEgaHJlZj1cImh0dHA6Ly9naXRodWIuY29tL2VtaWxlY2Fyb25cIj5oZXJlPC9hPiFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwPlRoaXMgYXBwIHdhcyBidWlsdCB1c2luZyA8YSBocmVmPVwiaHR0cDovL2ZsYXNrLnBvY29vLm9yZy9cIj5GbGFzazwvYT4sIDxhIGhyZWY9XCJodHRwOi8vYmFja2JvbmVqcy5vcmcvXCI+QmFja2JvbmU8L2E+LCA8YSBocmVmPVwiaHR0cDovL2dldGJvb3RzdHJhcC5jb20vXCI+Qm9vdHN0cmFwPC9hPiBhbmQgbW9yZS48L3A+XG4gICAgICAgICdcblxubW9kdWxlLmV4cG9ydHMgPSBBYm91dG1lUGFnZSIsIlxuY2xhc3MgUGFnZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gICAgIyMjXG4gICAgUGFnZXMgc2hvdWxkIGV4dGVuZCB0aGlzIGNsYXNzXG4gICAgRXZlcnkgcGFnZSBzaG91bGQgaGF2ZTpcbiAgICAgICAgLSBBbiBodG1sIGF0dHJpYnV0ZSB3aGljaCB3aWxsIGJlIHJlbmRlcmVkIGRpcmVjdGx5XG4gICAgICAgICAgICBPUlxuICAgICAgICAtIEEgc2V0IG9mIGZ1bmN0aW9ucyBpbiBwYWdlLnBhbmVscyBvYmplY3QuXG4gICAgICAgICAgVGVtcGxhdGUgd2l0aCBzYW1lIGlkIGFzIHRoZSBmdW5jdGlvbnMgbmFtZSB3aWxsIGJlIGxvYWRlZFxuICAgICAgICAgIENvZGUgZnJvbSB0aGUgZnVuY3Rpb24gd2lsbCBiZSBleGVjdXRlZCB3aGVuIHBhbmVsIGlzIHJlbmRlcmVkXG4gICAgIyMjXG5cbiAgICBkZWZhdWx0czpcbiAgICAgICAgdGl0bGU6ICd1bnRpdGxlZCBwYWdlJ1xuICAgICAgICBhY3RpdmU6IGZhbHNlXG5cbiAgICBpc0FjdGl2ZTogLT5cbiAgICAgICAgQGdldCgnYWN0aXZlJylcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZVxuIiwiXG5QYWdlID0gcmVxdWlyZSAnLi9wYWdlLmNvZmZlZSdcblxuY2xhc3MgUmVtaW5kbWVQYWdlIGV4dGVuZHMgUGFnZVxuICAgIFxuICAgIGRlZmF1bHRzOiAtPlxuICAgICAgICB0aXRsZTogJ1JlbWluZCBtZSdcbiAgICAgICAgcGFuZWxzOiBcbiAgICAgICAgICAgICdybWVfd2VsY29tZSc6IC0+XG4gICAgICAgICAgICAgICAgJCgnI3dlbGNvbWVfYnV0dG9uJykuY2xpY2sgLT5cbiAgICAgICAgICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlciAnc3dpdGNoUGFuZWwnLCAncm1lX2RhdGUnXG4gICAgICAgICAgICAncm1lX2RhdGUnOiAtPlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdhdCBsYXN0J1xuICAgIFxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbWluZG1lUGFnZVxuIiwiXG5jbGFzcyBIZWFkZXIgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICBlbDogJyNoZWFkZXInXG5cbiAgICB1aTpcbiAgICAgICAgbGlua3M6ICcjaGVhZGVyLWxpbmtzJ1xuXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUgJCgnI2hlYWRlci10ZW1wbGF0ZScpLmh0bWwoKVxuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICAjIEF2b2lkIGxvc2luZyBmYl9idXR0b24gaHRtbFxuICAgICAgICBAZmJfaHRtbCA9ICQoJy5mYi1zaGFyZS1idXR0b24nKS5odG1sKCkgaWYgbm90IEBmZ1xuICAgICAgICBcbiAgICAgICAgQCRlbC5odG1sIEB0ZW1wbGF0ZVxuICAgICAgICAkKCcuZmItc2hhcmUtYnV0dG9uJykuaHRtbChAZmJfaHRtbClcbiAgICAgICAgQHJlbmRlckxpbmtzKClcblxuICAgIHJlbmRlckxpbmtzOiAtPlxuICAgICAgICBfZWwgPSAkIEB1aS5saW5rc1xuICAgICAgICBfZWwuaHRtbCAnJ1xuXG4gICAgICAgIHdpbmRvdy5hcHAucGFnZXMuZm9yRWFjaCAocGFnZSkgLT5cbiAgICAgICAgICAgbGlua1ZpZXcgPSBuZXcgUGFnZUxpbmtWaWV3XG4gICAgICAgICAgICAgICAgbW9kZWw6IHBhZ2VcbiAgICAgICAgICAgX2VsLmFwcGVuZCBsaW5rVmlldy5yZW5kZXIoKS5lbFxuXG5cbmNsYXNzIFBhZ2VMaW5rVmlldyBleHRlbmRzIEJhY2tib25lLlZpZXdcbiAgICB0YWdOYW1lOiAnbGknXG5cbiAgICBldmVudHM6XG4gICAgICAgICdjbGljayc6ICdvbkNsaWNrJ1xuXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBAJGVsLmh0bWwgXCI8YT5cIiArIEBtb2RlbC5nZXQoJ3RpdGxlJykgKyBcIjwvYT5cIlxuICAgICAgICBpZiBAbW9kZWwgPT0gd2luZG93LmFwcC5hY3RpdmVQYWdlKClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nICd5ZXMnXG4gICAgICAgICAgICBAJGVsLmFkZENsYXNzICdhY3RpdmUnXG4gICAgICAgIEBcblxuICAgIG9uQ2xpY2s6IC0+XG4gICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ2NoYW5nZVBhZ2UnLCBAbW9kZWxcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyXG4iLCJQYW5lbFZpZXcgPSByZXF1aXJlICcuL3BhbmVsX3ZpZXcuY29mZmVlJ1xuXG5jbGFzcyBQYWdlIGV4dGVuZHMgQmFja2JvbmUuVmlld1xuXG4gICAgdGl0bGU6ICd1bmRlZmluZWRfcGFnZSdcblxuICAgIGluaXRpYWxpemU6IC0+XG4gICAgICAgIEJhY2tib25lLm9uICdzd2l0Y2hQYW5lbCcsIEBzd2l0Y2hQYW5lbCwgQFxuICAgICAgICBCYWNrYm9uZS5vbiAncmVuZGVyZWQnLCBAbG9hZFBhbmVsSnMsIEBcblxuICAgICAgICBwYW5lbHMgPSBAbW9kZWwuZ2V0ICdwYW5lbHMnXG4gICAgICAgIEBzd2l0Y2hQYW5lbCBfLmZpcnN0IF8ua2V5cyBwYW5lbHMgaWYgcGFuZWxzXG5cbiAgICByZW5kZXI6IC0+XG4gICAgICAgIEByZW5kZXJIdG1sKCkgaWYgQG1vZGVsLmdldCAnaHRtbCdcbiAgICAgICAgQHJlbmRlckFjdGl2ZVBhbmVsKCkgaWYgQG1vZGVsLmdldCAnYWN0aXZlUGFuZWwnXG4gICAgICAgIEJhY2tib25lLnRyaWdnZXIgJ3JlbmRlcmVkJ1xuICAgIFxuICAgIHJlbmRlckh0bWw6IC0+XG4gICAgICAgIEAkZWwuaHRtbCBAbW9kZWwuZ2V0ICdodG1sJ1xuXG4gICAgcmVuZGVyQWN0aXZlUGFuZWw6IC0+XG4gICAgICAgIEAkZWwuaHRtbCBAbW9kZWwuZ2V0KCdhY3RpdmVQYW5lbCcpLnJlbmRlcigpLmVsXG5cbiAgICBzd2l0Y2hQYW5lbDogKG5hbWUpLT5cbiAgICAgICAgaWYgbmFtZSBpbiBfLmZ1bmN0aW9ucyBAbW9kZWwuZ2V0ICdwYW5lbHMnXG4gICAgICAgICAgICBhY3RpdmVQYW5lbCA9IG5ldyBQYW5lbFZpZXcoKVxuICAgICAgICAgICAganMgPSAoQG1vZGVsLmdldCAncGFuZWxzJylbbmFtZV0gb3IgbnVsbFxuICAgICAgICAgICAgYWN0aXZlUGFuZWwuc2V0VGVtcGxhdGVGcm9tSWQgbmFtZSwganNcbiAgICAgICAgICAgIEBtb2RlbC5zZXQgJ2FjdGl2ZVBhbmVsJywgYWN0aXZlUGFuZWxcbiAgICAgICAgICAgIEByZW5kZXIoKVxuXG4gICAgbG9hZFBhbmVsSnM6IC0+XG4gICAgICAgIGNvbnNvbGUubG9nICdoYW5kbGVyJywgQG1vZGVsXG4gICAgICAgIHBhbiA9IEBtb2RlbC5nZXQoJ2FjdGl2ZVBhbmVsJylcbiAgICAgICAgcGFuLmxvYWRKcygpIGlmIHBhblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlXG4iLCJQYW5lbFZpZXcgPSByZXF1aXJlICcuL3BhbmVsX3ZpZXcuY29mZmVlJ1xuXG5jbGFzcyBQYW5lbCBleHRlbmRzIEJhY2tib25lLlZpZXdcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgY29uc29sZS5sb2cgJ3JlbmRlcmluZyBwYW5lbCcsIEB0ZW1wbGF0ZSgpXG4gICAgICAgIEAkZWwuaHRtbCBAdGVtcGxhdGUoKVxuICAgICAgICBAXG4gICAgXG4gICAgc2V0VGVtcGxhdGVGcm9tSWQ6IChpZCwganMpLT5cbiAgICAgICAgQHRlbXBsYXRlID0gXy50ZW1wbGF0ZSAkKCcjJyArIGlkKS5odG1sKClcbiAgICAgICAgQGxvYWRKcyA9IGpzXG4gICAgICAgIGNvbnNvbGUubG9nICdqcycsIGpzXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYW5lbCJdfQ==
