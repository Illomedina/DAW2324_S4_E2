from sqlalchemy import DateTime, Column, Boolean, Integer, String, MetaData, Table, Float, Enum, ForeignKeyConstraint, func
from sqlalchemy.dialects.mysql import ENUM

metadata = MetaData()

# Modelo para la tabla 'orders'
orders_table = Table(
    'orders', metadata,
    Column('idOrder', String, primary_key=True),
    Column('idCustomer', String, nullable=False),
    Column('datetime', DateTime, default=func.now()),
    Column('orderStatus', ENUM('Pending', 'Accepted', 'Processing', 'Sent', 'Delivered', name='order_status_enum')),
)

# Modelo para la tabla 'orderDetails'
order_details_table = Table(
    'order_details', metadata,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('idOrders', String, nullable=False),
    Column('idProduct', Integer, nullable=False),
    #Column('idGI', Integer, nullable=False),
    Column('idVariant', Integer, nullable=False),
    Column('quantity', Integer, nullable=False),
    Column('priceEach', Float, nullable=False),
    Column('shippingPrice', Float),
    ForeignKeyConstraint(['idOrders'], ['orders.idOrders']),
    ForeignKeyConstraint(['idProduct'], ['products.id']),
    #ForeignKeyConstraint(['idGI'], ['some_other_table.id']),
    ForeignKeyConstraint(['idVariant'], ['variants.id'])
)
