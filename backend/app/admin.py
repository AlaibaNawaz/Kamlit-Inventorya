from django.contrib import admin
from .models import *

class InventoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'quantity', 'price' , 'supplier' ,  'restock_level']
    list_display_links = ['name']
    class Meta:
        model = Inventory

class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'quantity', 'price' , 'restock_level']
    list_display_links = ['name']
    class Meta:
        model = Product

class ProductInventoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'product', 'inventory_item', 'quantity_used']
    list_display_links = ['product']
    class Meta:
        model = ProductInventory

class OrderDetailAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'date_ordered']
    list_display_links = ['customer']
    class Meta:
        model =  OrderDetail       

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'product' ,'order', 'quantity_ordered']
    list_display_links = ['product']
    class Meta:
        model =  OrderItem     

class CustomerAdmin(admin.ModelAdmin):
    list_display = ['id','name', 'contact_number' ,'address']
    list_display_links = ['name']
    class Meta:
        model =  Customer  
        
class SupplierAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'contact_number', 'lead_time' , 'payment_status' , 'cost_information' , 'side_notes']
    list_display_links = ['name']
    class Meta:
        model =  Supplier      


admin.site.register(Inventory, InventoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductInventory, ProductInventoryAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(OrderDetail, OrderDetailAdmin)
admin.site.register(Supplier, SupplierAdmin)