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

    var ConfirmWidget = AbstractAction.extend({
        events :{
            'click button.ok_button' : function(){
                this.trigger('user_chose',true);
            },
            'click button.cancel_button' : function(){
                this.trigger('user_chose',false);
            }
        },
        start : function(){
            this.$el.append(QWeb.render('confirm_widget'));
        }
    })

    var ColorInputWidget = AbstractAction.extend({
        template : 'colorInputWidget',
        events : {
            'change input':'input_changed'
        },
        start : function(){
            this.input_changed();
            return this._super();
        },
        input_changed : function(){
            var color = ["#",
                this.$(".oe_color_red").val(),
                this.$(".oe_color_green").val(),
                this.$(".oe_color_blue").val()        
            ].join('');
            this.set('color',color);
        }
    });
    var HomePage = AbstractAction.extend({
        //className : 'oe_petstore_greetings',
        template : 'HomePageTemplate',
        start: function () {
            
            console.log("pet store home page loaded");
            //this.$el.append("<div>Hello dear Odoo user!</div>");
            // //this.$el.append(QWeb.render("HomePageTemplate"))
            // var products = ["cpu","mouse","keyboard","graphic card","screen"];

            // var product_widget = new ProductsWidget(this,products,"#00FF00");       //The first argument is this, which in that case was a HomePage instance.This tells the widget being created which other widget is its parent.
            // product_widget.appendTo(this.$el);

            // var ConfirmWidget = new ConfirmWidget(this);
            // ConfirmWidget.on("user_chose",this,this.user_chose);
            // ConfirmWidget.appendTo(this.$el);

            // user_chose : function(confirm){
            //     if(confirm){
            //         console.log("The user agreed to continue");
            //     }
            //     else{
            //         console.log("The user refused to continue");
            //     }
            // }
            //return greeting.appendTo(this.$el);
            var self = this;        // ask why this cause problem
            //----> Answer
            // While this works it has a few issues:

            // it is rather verbose
            // it does not support replacing the widget's root element at runtime as the binding is only performed when start() is run (during widget initialization)
            // it requires dealing with this - binding issues
        
            self.colorInput = new ColorInputWidget(this);
            self.colorInput.on("change:color",this,this.color_changed);
            return self.colorInput.appendTo(this.$el);
        },
        color_changed : function(){
            console.log(this.colorInput.get("color"));
            self.$(".oe_color_div").css("background-color",this.colorInput.get("color"));

        }
    });

    core.action_registry.add('petstore.homepage',HomePage);

})
