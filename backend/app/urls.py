from django.conf.urls import include
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import *

urlpatterns = [
    path('inventory-items/', get_inventory_items, name="get_inventory_items"), 
    path('delete-inventory-item/<int:id>', delete_inventory_item, name="delete_inventory_item"), 
    path('add-inventory-item/' , add_inventory_item , name = "add_inventory_item" ),
    path('products/', get_products, name="get_product"), 
    path('update-inventory-item/<int:id>' , update_inventory_item , name = "update_inventory_item" ),
    path('delete-production-management/<int:id>', delete_production_information, name="delete_production_information"),
    path('update-production-management/<int:id>', update_production_management, name="update_production_management"),
    path('delete-product/<int:id>', delete_product, name="delete_product"), 
    path('add-product/' , add_product , name = "add_product" ),
    path('update-product/<int:id>' , update_product , name = "update_product" ),
    path('production-management/', get_production_information, name="get_production_information"),
    path('add-production-management/', add_production_information, name="add_production_information"),
    path('order-detail/', get_order_detail , name = "get_order_detail"),
    path('customer/' , get_customer , name = "get_customer"),
    path('add-order-detail/', add_order_detail , name = "add_order_detail"),
    path('delete-order-detail/<int:id>', delete_order_detail , name = "delete_order_detail"),
    path('update-order-detail/<int:id>', update_order_detail , name = "update_order_detail"),
    path('order-item/',get_order_item , name = "get_order_item"),
    path('delete-order-item/<int:id>',delete_order_item , name = "delete_order_item"),
    path('add-order-item/',add_order_item , name = "add_order_item"),
    path('update-order-item/<int:id>',update_order_item , name = "update_order_item"),

    ]
