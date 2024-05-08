from django.contrib.auth.models import User
from .models import Item, Category
from .serializers import ItemSerializer, CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions


class UserItems(APIView):
  """
    View for getting and posting the items of a user
  """
    
  def get(self, request, format = None):
    """
      View for getting all items of a user
      Parameters: None
      Returns: list of all items of the user
    """
    user = self.request.user
    items = Item.objects.filter(user=user)
    serialized_items = ItemSerializer(items, many = True)
    print(items)
    return Response(serialized_items.data)
  
  def post(self, request, format = None):
    """
      View for adding an item
      Parameters: sku, name, tags, category, in_stock, available_stock
      Returns: the added item
    """
    user = self.request.user
    data = self.request.data
    try:
      category = Category.objects.get(name=data['category'], user=user)
    except Category.DoesNotExist:
      return Response({"error": "Invalid category name."}, status=400)
    data['user'] = user.id
    item = Item.objects.create(
      sku = data['sku'],
      name = data['name'],
      tags = data['tags'],
      category = category,
      in_stock = data['in_stock'],
      available_stock = data['available_stock'],
      user = user
    )
    serialized_item = ItemSerializer(item)
    return Response({"success": serialized_item.data})
  def delete(self, request, format = None):
    """
      View for deleting an item
      Parameters: id
      Returns: success message
    """
    user = self.request.user
    data = self.request.data
    item = Item.objects.get(id=data['id'], user=user)
    item.delete()
    return Response({"success": "Item deleted."})
  
class AllItems(APIView):
  """
    View for getting all items
    Parameters: None
    Returns: list of all items
  """
    
  def get(self, request, format = None):
    items = Item.objects.all()
    serialized_items = ItemSerializer(items, many = True)
    return Response(serialized_items.data)
  
class UserCategories(APIView):
  """
    View for getting and posting the categories of a user
    Parameters: None
    Returns:
    - get: list of all categories of the user
    - post: the added category
  """
    
  def get(self, request, format = None):
    user = self.request.user
    categories = Category.objects.filter(user=user)
    serialized_categories = CategorySerializer(categories, many = True)
    return Response(serialized_categories.data)
  
  def post(self, request, format = None):
    """
      View for adding a category
      Parameters: name
      Returns: the added category
    """
    user = self.request.user
    data = self.request.data
    data['user'] = user
    category = Category.objects.create(
      name = data['name'],
      user = user
    )
    serialized_category = CategorySerializer(category)
    return Response({"success": serialized_category.data})
  
  def delete(self, request, format = None):
    """
      View for deleting a category
      Parameters: id
      Returns: success message
    """
    user = self.request.user
    data = self.request.data
    category = Category.objects.get(id=data['id'], user=user)
    category.delete()
    return Response({"success": "Category deleted."})