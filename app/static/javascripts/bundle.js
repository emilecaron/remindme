(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/emile/personal/remindme/front/main.coffee":[function(require,module,exports){
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$(function() {

  /*
  all class def must be encapsulated inside $.ready()
  otherwise templates from page.html won't be available.
   */
  var AppView, Header, Page;
  Header = require('./views/header.coffee');
  Page = require('./views/page.coffee');
  AppView = (function(_super) {
    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.pages = {
      remindme: new Page()
    };

    AppView.prototype.currentPage = null;

    AppView.prototype.switchPage = page;

    AppView.prototype.initialize = function() {
      console.log('Initializing app');
      return this.header = new Header();
    };

    AppView.prototype.render = function() {
      console.log('Rendering app');
      console.log(this.pages);
      if (this.currentPage) {
        this.currentPage.render();
      }
      return this.header.render();
    };

    return AppView;

  })(Backbone.View);
  window.app = new AppView();
  return window.app.render();
});



},{"./views/header.coffee":"/home/emile/personal/remindme/front/views/header.coffee","./views/page.coffee":"/home/emile/personal/remindme/front/views/page.coffee"}],"/home/emile/personal/remindme/front/views/header.coffee":[function(require,module,exports){
var Header,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Header = (function(_super) {
  __extends(Header, _super);

  function Header() {
    return Header.__super__.constructor.apply(this, arguments);
  }

  Header.prototype.ui = {
    anchor: $('#header')
  };

  Header.prototype.template = _.template($('#header-template').html());

  Header.prototype.render = function() {
    return this.ui.anchor.html(this.template({
      pages: window.app.pages
    }));
  };

  return Header;

})(Backbone.View);

module.exports = Header;



},{}],"/home/emile/personal/remindme/front/views/page.coffee":[function(require,module,exports){
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
    return console.log('rendering undefined_page');
  };

  return Page;

})(Backbone.View);

module.exports = Page;



},{}]},{},["/home/emile/personal/remindme/front/main.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvZW1pbGUvcGVyc29uYWwvcmVtaW5kbWUvZnJvbnQvbWFpbi5jb2ZmZWUiLCIvaG9tZS9lbWlsZS9wZXJzb25hbC9yZW1pbmRtZS9mcm9udC92aWV3cy9oZWFkZXIuY29mZmVlIiwiL2hvbWUvZW1pbGUvcGVyc29uYWwvcmVtaW5kbWUvZnJvbnQvdmlld3MvcGFnZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBO2lTQUFBOztBQUFBLENBQUEsQ0FBRSxTQUFBLEdBQUE7QUFDRTtBQUFBOzs7S0FBQTtBQUFBLE1BQUEscUJBQUE7QUFBQSxFQVFBLE1BQUEsR0FBUyxPQUFBLENBQVEsdUJBQVIsQ0FSVCxDQUFBO0FBQUEsRUFTQSxJQUFBLEdBQU8sT0FBQSxDQUFRLHFCQUFSLENBVFAsQ0FBQTtBQUFBLEVBWU07QUFFRiw4QkFBQSxDQUFBOzs7O0tBQUE7O0FBQUEsc0JBQUEsS0FBQSxHQUVJO0FBQUEsTUFBQSxRQUFBLEVBQWMsSUFBQSxJQUFBLENBQUEsQ0FBZDtLQUZKLENBQUE7O0FBQUEsc0JBSUEsV0FBQSxHQUFhLElBSmIsQ0FBQTs7QUFBQSxzQkFNQSxVQUFBLEdBQWEsSUFOYixDQUFBOztBQUFBLHNCQVFBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDUixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksa0JBQVosQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFBLE1BQUEsQ0FBQSxFQUZOO0lBQUEsQ0FSWixDQUFBOztBQUFBLHNCQVlBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDSixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksZUFBWixDQUFBLENBQUE7QUFBQSxNQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBQyxDQUFBLEtBQWIsQ0FEQSxDQUFBO0FBRUEsTUFBQSxJQUF5QixJQUFDLENBQUEsV0FBMUI7QUFBQSxRQUFBLElBQUMsQ0FBQSxXQUFXLENBQUMsTUFBYixDQUFBLENBQUEsQ0FBQTtPQUZBO2FBR0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFSLENBQUEsRUFKSTtJQUFBLENBWlIsQ0FBQTs7bUJBQUE7O0tBRmtCLFFBQVEsQ0FBQyxLQVovQixDQUFBO0FBQUEsRUFnQ0EsTUFBTSxDQUFDLEdBQVAsR0FBaUIsSUFBQSxPQUFBLENBQUEsQ0FoQ2pCLENBQUE7U0FpQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFYLENBQUEsRUFsQ0Y7QUFBQSxDQUFGLENBQUEsQ0FBQTs7Ozs7QUNDQSxJQUFBLE1BQUE7RUFBQTtpU0FBQTs7QUFBQTtBQUVJLDJCQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSxtQkFBQSxFQUFBLEdBQ0k7QUFBQSxJQUFBLE1BQUEsRUFBUSxDQUFBLENBQUUsU0FBRixDQUFSO0dBREosQ0FBQTs7QUFBQSxtQkFHQSxRQUFBLEdBQVUsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxDQUFBLENBQUUsa0JBQUYsQ0FBcUIsQ0FBQyxJQUF0QixDQUFBLENBQVgsQ0FIVixDQUFBOztBQUFBLG1CQUtBLE1BQUEsR0FBUSxTQUFBLEdBQUE7V0FDSixJQUFDLENBQUEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFYLENBQWdCLElBQUMsQ0FBQSxRQUFELENBQ1o7QUFBQSxNQUFBLEtBQUEsRUFBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQWxCO0tBRFksQ0FBaEIsRUFESTtFQUFBLENBTFIsQ0FBQTs7Z0JBQUE7O0dBRmlCLFFBQVEsQ0FBQyxLQUE5QixDQUFBOztBQUFBLE1BWU0sQ0FBQyxPQUFQLEdBQWlCLE1BWmpCLENBQUE7Ozs7O0FDQUEsSUFBQSxJQUFBO0VBQUE7aVNBQUE7O0FBQUE7QUFFSSx5QkFBQSxDQUFBOzs7O0dBQUE7O0FBQUEsaUJBQUEsS0FBQSxHQUFPLGdCQUFQLENBQUE7O0FBQUEsaUJBRUEsTUFBQSxHQUFRLFNBQUEsR0FBQTtXQUNKLE9BQU8sQ0FBQyxHQUFSLENBQVksMEJBQVosRUFESTtFQUFBLENBRlIsQ0FBQTs7Y0FBQTs7R0FGZSxRQUFRLENBQUMsS0FBNUIsQ0FBQTs7QUFBQSxNQVFNLENBQUMsT0FBUCxHQUFpQixJQVJqQixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiQgLT5cbiAgICAjIyNcbiAgICBhbGwgY2xhc3MgZGVmIG11c3QgYmUgZW5jYXBzdWxhdGVkIGluc2lkZSAkLnJlYWR5KClcbiAgICBvdGhlcndpc2UgdGVtcGxhdGVzIGZyb20gcGFnZS5odG1sIHdvbid0IGJlIGF2YWlsYWJsZS5cbiAgICAjIyNcbiAgICBcbiAgICAjRm9ybVZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL2Zvcm1fdmlldy5jb2ZmZWUnXG4gICAgI0Zvcm0gPSByZXF1aXJlICcuL21vZGVscy9mb3JtLmNvZmZlZSdcblxuICAgIEhlYWRlciA9IHJlcXVpcmUgJy4vdmlld3MvaGVhZGVyLmNvZmZlZSdcbiAgICBQYWdlID0gcmVxdWlyZSAnLi92aWV3cy9wYWdlLmNvZmZlZSdcblxuXG4gICAgY2xhc3MgQXBwVmlldyBleHRlbmRzIEJhY2tib25lLlZpZXdcblxuICAgICAgICBwYWdlczpcbiAgICAgICAgICAgICNyZW1pbmRtZTogbmV3IFJlbWluZG1lUGFnZSgpXG4gICAgICAgICAgICByZW1pbmRtZTogbmV3IFBhZ2UoKVxuXG4gICAgICAgIGN1cnJlbnRQYWdlOiBudWxsXG5cbiAgICAgICAgc3dpdGNoUGFnZTogKHBhZ2UpXG5cbiAgICAgICAgaW5pdGlhbGl6ZTogLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdJbml0aWFsaXppbmcgYXBwJ1xuICAgICAgICAgICAgQGhlYWRlciA9IG5ldyBIZWFkZXIoKVxuXG4gICAgICAgIHJlbmRlcjogLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdSZW5kZXJpbmcgYXBwJ1xuICAgICAgICAgICAgY29uc29sZS5sb2cgQHBhZ2VzXG4gICAgICAgICAgICBAY3VycmVudFBhZ2UucmVuZGVyKCkgaWYgQGN1cnJlbnRQYWdlXG4gICAgICAgICAgICBAaGVhZGVyLnJlbmRlcigpXG5cbiAgICB3aW5kb3cuYXBwID0gbmV3IEFwcFZpZXcoKVxuICAgIHdpbmRvdy5hcHAucmVuZGVyKClcblxuIiwiXG5jbGFzcyBIZWFkZXIgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cbiAgICB1aTpcbiAgICAgICAgYW5jaG9yOiAkKCcjaGVhZGVyJylcblxuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlICQoJyNoZWFkZXItdGVtcGxhdGUnKS5odG1sKClcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgQHVpLmFuY2hvci5odG1sIEB0ZW1wbGF0ZVxuICAgICAgICAgICAgcGFnZXM6IHdpbmRvdy5hcHAucGFnZXNcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclxuIiwiXG5jbGFzcyBQYWdlIGV4dGVuZHMgQmFja2JvbmUuVmlld1xuXG4gICAgdGl0bGU6ICd1bmRlZmluZWRfcGFnZSdcblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgY29uc29sZS5sb2cgJ3JlbmRlcmluZyB1bmRlZmluZWRfcGFnZSdcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VcbiJdfQ==
