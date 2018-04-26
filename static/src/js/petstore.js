// openerp.oepetstore = function(instance, local) {
//     var _t = instance.web._t,
//         _lt = instance.web._lt;
//     var QWeb = instance.web.qweb;

//     local.HomePage = instance.Widget.extend({
//         start: function() {
//             console.log("pet store home page loaded");
//         },
//     });

//     instance.web.client_actions.add('petstore.homepage', 'instance.oepetstore.HomePage');
// }

odoo.define('oepetstore', function(require){
    'use strict';

    var AbstractAction = require('web.AbstractAction');
    var Widget = require('web.Widget');
    var WebClient = require('web.WebClient');
    var core = require('web.core');

    var QWeb = core.qweb;

    console.log(" PETSTORE.JS loaded");

    var GreetingsWidget = AbstractAction.extend({
        className :'oe_petstore_homepage',
        start : function(){
            this.$el.append("<div>We are so happy to see you again in this menu!</div");
        },
    })

    var ProductsWidget = AbstractAction.extend({
        template : 'ProductsWidget',
        init : function(parent,products,color){
            this._super(parent);
            this.products = products;
            this.color = color;
        }
    })

    var HomePage = AbstractAction.extend({
        className : 'oe_petstore_greetings',
        //template : 'HomePageTemplate',
        start: function () {
            
            console.log("pet store home page loaded");
            //this.$el.append("<div>Hello dear Odoo user!</div>");
            //this.$el.append(QWeb.render("HomePageTemplate"))
            var products = ["cpu","mouse","keyboard","graphic card","screen"];

            var product_widget = new ProductsWidget(this,products,"#00FF00");       //The first argument is this, which in that case was a HomePage instance.This tells the widget being created which other widget is its parent.
            product_widget.appendTo(this.$el);

            //return greeting.appendTo(this.$el);
        },
    });

    core.action_registry.add('petstore.homepage',HomePage);

})
