from odoo import models, api, fields

class Message(models.Model):
    _name = "oepetstore.message_of_the_day"
  
    name = fields.Char(size = 20)
    message = fields.Text()
    color = fields.Char(size=20)

    @api.model
    def my_method(self):
        return {"hello": "world","na":"nas"}

    @api.model
    def method_2(self):
        # self.env['oepetstore.message_of_the_day'].create({
        #     "name" : "sjo1",
        #     "message" : "Hello world",
        #     "color" : "RED"
        # })
        # return self.env['oepetstore.message_of_the_day'].search( [('name','=','sjo1')] )
        return {"hell" : "word"}
          


class Product(models.Model):
    _inherit = "product.product"

    max_quantity = fields.Float(string="Maximum Quantity")
