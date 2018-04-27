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

   // var WebClient = require('web.WebClient');
    var AbstractAction = require('web.AbstractAction');
    var Widget = require('web.Widget');

    var core = require('web.core');
    var QWeb = core.qweb;
   // var BasicModel = require('web.BasicModel');
   /// var field_registry = require('web.field_registry');


    var AbstractField = require('web.AbstractField');

    //console.log(" PETSTORE.JS loaded");

    // var Char2Field = AbstractField.extend({
    //     init : function(){
    //         this._super.apply(this,arguments);
    //         this.set("value","");
    //     },
    //     start : function(){
    //         //this.display_field();
    //         return this._super();
    //     },
    //     display_field = function(){
    //         var self = this;
    //         self.$el.html(QWeb.render("FieldChar2"));
    //     },
    //     render_value : function(){
    //         this.$el.text(this.get("value"));
    //     }
    // });

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


    // widget to display last record name of the oepetstore.message_of_the_day
    var MessageOfTheDay = AbstractAction.extend({
        template : "MessageOfTheDay",
        start : function(){
            var self = this;
            self._rpc( {model : "oepetstore.message_of_the_day", method : "my_method"}).then(function(result){
                self.$(".oe_mywidget_message_of_the_day").text(result['hello']);
            });
        },
    });

    var PetToysList = AbstractAction.extend({
        template : 'PetToysList',
        events: {
            'click .oe_petstore_pettoyslist': 'selected_item',
        },
        start : function(){
            var self = this;
            return self._rpc({ model: "oepetstore.message_of_the_day", method: "my_method" }).then(function (result) {
                self.$(".oe_mywidget_message_of_the_day").text(result['hello']);
            });
        },
        selected_item: function (event) {
            console.log("BUtton clicked");
            this.do_action({
                
                type: 'ir.actions.act_window',
                res_model: 'product.product',
                 res_id: $(event.currentTarget).data('id'),
                views: [[false, 'form']],
            });
        },
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
        
            // // loading modules
            // self._rpc({model : "oepetstore.message_of_the_day", method : "my_method", args : ""}).then(function(result){
            //     self.$el.append("<div>Hello " + result["na"] + "</div>");
            // });

             self.colorInput = new ColorInputWidget(this);
             self.colorInput.on("change:color",this,this.color_changed);
             return self.colorInput.appendTo(this.$el);

            //return new MessageOfTheDay(this).appendTo(this.$el);
            //return self.$el.append(QWeb.render('PetToysList'));
    
        },
        
        color_changed : function(){
            console.log(this.colorInput.get("color"));
            //self.$(".oe_color_div").css("background-color",this.colorInput.get("color"));
            self.$(".oe_color_widget").css("background-color", this.colorInput.get("color"));

        }
    });

//    field_registry.add('char2',Char2Field);
    core.action_registry.add('petstore.homepage',HomePage);

})
