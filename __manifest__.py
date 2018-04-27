{
    'name' : 'OpenERP Pet Store',
    'version': '1.0',
    'summary': 'Sell pet toys',
    'category': 'Tools',
    'description':
        """
OpenERP Pet Store
=================

A wonderful application to sell pet toys.
        """,
    'data': [
        "views/petstore.xml",
        "views/petstore_data.xml",
        "views/demo.xml",
        "views/oepetstore.message_of_the_day.csv",
      
    ],
    'depends' : ['sale_stock'],
    'qweb': ['static/src/xml/*.xml'],
    'application': True,
}
