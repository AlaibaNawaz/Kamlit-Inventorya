from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class Supplier(models.Model):
    name = models.CharField(max_length=255, null=False,
                            blank=False, default='')
    contact_number = models.CharField(max_length=255, null=False,
                            blank=False, default='')
    lead_time = models.CharField(max_length=255, null=False,
                            blank=False, default='')
    payment_status = models.CharField(max_length=255, null=False,
                            blank=False, default='')
    cost_information =  models.CharField(max_length=1000, null=False,
                            blank=False, default='')
    side_notes = models.CharField(max_length=1000, null=False,
                            blank=False, default='')
    def __str__(self):
        return f'{self.name}'




class Inventory(models.Model):
    name = models.CharField(max_length=255, null=False,
                            blank=False, default='')
    
    price = models.PositiveIntegerField(null=False, blank=False, default=0)
    
    quantity = models.PositiveIntegerField(null=False, blank=False, default=0)
    supplier = models.ForeignKey(
        Supplier, on_delete=models.SET_NULL, null=True, blank=True)
    restock_level = models.PositiveIntegerField(null=False, blank=False, default=0)

    @staticmethod
    def get_inventory_items():
        objects = Inventory.objects.all()
        
        serialized_objects = []
        for object in objects:
            serialized_objects.append(object.serialize())
        return serialized_objects

    def __str__(self):
        return f'{self.name}'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'quantity': self.quantity,
            'price': self.price,
            'restock_level' : self.restock_level,
            'availability': 'available' if self.quantity > self.restock_level else 'out of stock' if self.quantity == 0 else 'low' 
        } 


class Product(models.Model):
    name = models.CharField(max_length=255, null=False,
                            blank=False, default='')
    
    price = models.PositiveIntegerField(null=False, blank=False, default=0)
    
    quantity = models.PositiveIntegerField(null=False, blank=False, default=0)
    restock_level = models.PositiveIntegerField(null=False, blank=False, default=0)

    def __str__(self):
        return f'{self.name}'

    @staticmethod
    def get_products():
        objects = Product.objects.all()
        
        serialized_objects = []
        for object in objects:
            serialized_objects.append(object.serialize())
        return serialized_objects


    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'quantity': self.quantity,
            'price': self.price,
            'restock_level' : self.restock_level,
            'availability': 'available' if self.quantity > self.restock_level else 'out of stock' if self.quantity == 0 else 'low'
        } 


class ProductInventory(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, null=False, blank=False , related_name='products_used')
    inventory_item = models.ForeignKey(
        Inventory, on_delete=models.CASCADE, null=False, blank=False, related_name='inventory_items_used')
    quantity_used = models.PositiveIntegerField(null=False, blank=False, default=0)

    def __str__(self):
        return f'{self.product} - {self.inventory_item}'
    
    @staticmethod
    def get_production_information():
        objects = ProductInventory.objects.all()

        serialized_objects = []
        for object in objects:
            serialized_objects.append(object.serialize())
        return serialized_objects
        
    def serialize(self):
        return {
            'id': self.id,
            'product': self.product.serialize(),
            'inventory_item': self.inventory_item.serialize(),
            'inventory_item_available' : self.inventory_item.quantity,
            'quantity_used': self.quantity_used
        } 
    
class Customer(models.Model):
    name = models.CharField(max_length=255, null=False,
                            blank=False, default='')
    contact_number = models.CharField(max_length=255, null=False,
                            blank=False, default='')
    address = models.CharField(max_length=255, null=False,
                            blank=False, default='')
    def __str__(self):
        return f'{self.name}'
    
    @staticmethod
    def get_customer():
        objects = Customer.objects.all()
        
        serialized_objects = []
        for object in objects:
            serialized_objects.append(object.serialize())
        return serialized_objects
    
    def serialize(self):
        return {
            'name': self.name,
            'id': self.id,
            'contact_number': self.contact_number,
            'address': self.address,
            
        } 


class OrderDetail(models.Model):
    customer = models.ForeignKey(
        Customer, on_delete=models.SET_NULL, null=True, blank=True)

    date_ordered = models.DateTimeField(blank=True, default=datetime.now)
    def __str__(self):
        return f'{self.id}--------{self.customer}--------{self.date_ordered}'
    
    @staticmethod
    def get_order_detail():
        objects = OrderDetail.objects.all()
        
        serialized_objects = []
        for object in objects:
            serialized_objects.append(object.serialize())
        return serialized_objects

    def calculate_total_price(self):
        order_items = OrderItem.objects.filter(order=self).all()
        total_price = sum([item.product.price * item.quantity_ordered for item in order_items])
        return total_price


    def serialize(self):
        return {
            'id' : self.id,
            'customer': self.customer.serialize(),
            'total_price': self.calculate_total_price(),
            'date_ordered': self.date_ordered,
            
        } 
    

class OrderItem(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, null=False, blank=False)
    order = models.ForeignKey(
        OrderDetail, on_delete=models.CASCADE, null=False, blank=False, related_name='order_items')
    quantity_ordered = models.PositiveIntegerField(null=False, blank=False, default=0)
    @staticmethod
    def get_order_item():
        objects = OrderItem.objects.all()
        
        serialized_objects = []
        for object in objects:
            serialized_objects.append(object.serialize())
        return serialized_objects
    
    def serialize(self):
        return {
            'id': self.id,
            'product': self.product.serialize(),
            'order': self.order.serialize(),
            'quantity_ordered': self.quantity_ordered,
            
        } 

