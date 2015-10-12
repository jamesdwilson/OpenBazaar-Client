var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    itemsShortCollection = require('../collections/itemsShortCl'),
    itemShortView = require('./itemShortVw');


var updateOptions =
    function (context) {
        return function (options) {
            console.log("[itemListVw.js:12] updateOptions()");

            context.options = options;
            //the model must be passed in by the constructor
            context.itemsShort = new itemsShortCollection(this.model);
            //this.listenTo(this.options.userModel, 'change', function(){
            //  self.render();
            //});
            context.subViews = [];
            context.render();
        };
    };



var updateItem =
    function (context) {
        return function (item) {
            if(!item || typeof item !== 'object') {
                throw "[itemListVw.js:31] addItem() Invalid item passed";
            }
            console.log("[itemListVw.js:34] addItem()", item);

            __.extend(context.options, item);
            context.updateOptions(context.options);
        };
    };
module.exports = Backbone.View.extend({

  initialize: function(options){
      this.options = options;

      this.updateOptions = this.update || updateOptions(this);
      this.updateItem = this.updateItem || updateItem(this);

      this.updateOptions(options);
  },

  render: function(){
    var self = this;
    //clear the list
    this.$el.empty();
    __.each(this.itemsShort.models, function(item){
      self.renderContract(item);
    },this);
  },

  renderContract: function(item){
    var itemShort = new itemShortView({
      model: item
    });
    this.subViews.push(itemShort);
    //$el must be passed in by the constructor
    this.$el.append(itemShort.render().el);
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.remove();
      }
    });
    this.remove();
  }
});

