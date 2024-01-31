from .serializers import UserSerializer, UserSerializerWithToken
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions
from rest_framework.response import Response    
from rest_framework.views import APIView
from .models import *
import json
from django.http import QueryDict
# Create your views here.

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_inventory_items(request):
    return Response({ 'inventoryItems': Inventory.get_inventory_items()}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_inventory_item(request, id):
    Inventory.objects.filter(id=id).delete()
    return Response({ 'inventoryItems': Inventory.get_inventory_items()}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_inventory_item(request):
    if Inventory.objects.filter(name=request.POST['name']).count() == 0:
        new_item = Inventory(name=request.POST['name'], price=request.POST['price'], quantity=request.POST['quantity'] , restock_level = request.POST['restock_level'])
        new_item.save()
    return Response({ 'inventoryItems': Inventory.get_inventory_items()}, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_inventory_item(request, id):
    Inventory.objects.filter(id=id).update(name=request.data['name'], price=request.data['price'], quantity=request.data['quantity'], restock_level = request.data['restock_level'])
    return Response({ 'inventoryItems': Inventory.get_inventory_items()}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_products(request):
    return Response({ 'products': Product.get_products()}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_product(request, id):
    Product.objects.filter(id=id).delete()
    return Response({ 'products': Product.get_products()}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_product(request):
    if Product.objects.filter(name=request.POST['name']).count() == 0:
        new_product = Product(name=request.POST['name'], price=request.POST['price'], quantity=request.POST['quantity'] , restock_level = request.POST['restock_level'] )
        new_product.save()
    return Response({ 'products': Product.get_products()}, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_product(request, id):
    Product.objects.filter(id=id).update(name=request.data['name'], price=request.data['price'], quantity=request.data['quantity'] , restock_level = request.data['restock_level'])
    return Response({ 'products': Product.get_products()}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_production_information(request):
    return Response({ 'productionInformation': ProductInventory.get_production_information()}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_production_information(request, id):
    ProductInventory.objects.filter(id=id).delete()
    return Response({ 'productionInformation': ProductInventory.get_production_information()}, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_production_management(request, id):
    product_inventory = ProductInventory.objects.filter(id=id).first()
    old_quantity_used = product_inventory.quantity_used
    inventory_item = Inventory.objects.filter(id=request.POST['inventoryId']).first()
    new_quantity = int(request.POST['quantity_used'])
    if(old_quantity_used > new_quantity):
        inventory_item.quantity = inventory_item.quantity + (old_quantity_used-new_quantity)
    else:
        inventory_item.quantity = inventory_item.quantity - (new_quantity-old_quantity_used)
    inventory_item.save()
    product_inventory.quantity_used = request.data['quantity_used']
    product_inventory.save()
    return Response({ 'productionInformation': ProductInventory.get_production_information()}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_production_information(request):
    product = Product.objects.filter(id=request.POST['productId']).first()
    inventory_item = Inventory.objects.filter(id=request.POST['inventoryId']).first()
    quantity_used = int(request.POST['quantity_used'])
    inventory_item.quantity = inventory_item.quantity - quantity_used
    inventory_item.save()
    new_productIventory = ProductInventory(product=product, inventory_item= inventory_item, quantity_used=request.POST['quantity_used'])
    new_productIventory.save()
    return Response({ 'productionInformation': ProductInventory.get_production_information()}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_customer(request):
    return Response({ 'customer': Customer.get_customer()}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_order_detail(request):
    return Response({ 'orderdetail': OrderDetail.get_order_detail()}, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_order_detail(request):
    customer = Customer.objects.filter(id=request.POST['customerId']).first()
    new_orderDetail = OrderDetail(customer=customer)
    new_orderDetail.save()
    return Response({ 'orderdetail': OrderDetail.get_order_detail()}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_order_detail(request, id):
    OrderDetail.objects.filter(id=id).delete()
    return Response({ 'orderdetail': OrderDetail.get_order_detail()}, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_order_detail(request, id):
    OrderDetail.objects.filter(id=id).update(date_ordered = request.data['date_ordered'] )
    return Response({ 'orderdetail': OrderDetail.get_order_detail()}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_order_item(request):
    return Response({ 'orderitem': OrderItem.get_order_item()}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_order_item(request, id):
    OrderItem.objects.filter(id=id).delete()
    return Response({'orderitem': OrderItem.get_order_item()}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_order_item(request):
    product = Product.objects.filter(id=request.POST['productId']).first()
    order_detail = OrderDetail.objects.filter(id=request.POST['orderDetailId']).first()
    quantity_ordered = int(request.POST['quantity_ordered'])
    product.quantity = product.quantity - quantity_ordered
    product.save()
    new_orderItem = OrderItem(product=product, order = order_detail, quantity_ordered=request.POST['quantity_ordered'])
    new_orderItem.save()
    return Response({'orderitem': OrderItem.get_order_item()}, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_order_item(request, id):
    orderitem = OrderItem.objects.filter(id=id).first()
    old_quantity_ordered = orderitem.quantity_ordered
    product = Product.objects.filter(id=request.POST['productId']).first()
    new_quantity = int(request.POST['quantity_ordered'])
    if(old_quantity_ordered > new_quantity):
        product.quantity = product.quantity + (old_quantity_ordered-new_quantity)
    else:
        product.quantity = product.quantity - (new_quantity-old_quantity_ordered)
    product.save()
    orderitem.quantity_ordered = request.data['quantity_ordered']
    orderitem.save()
    return Response({'orderitem': OrderItem.get_order_item()}, status=status.HTTP_200_OK)