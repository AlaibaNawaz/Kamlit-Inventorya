import React, { Component } from "react";
import MyNav from "./navbar";
import { getOrderDetail , getCustomer, addOrderDetail , deleteOrderDetail , updateOrderDetail , getOrderItem , getProducts , deleteOrderItem , addOrderItem , updateOrderItem} from "../http";
import DataGrid, {
  Column,
  SearchPanel, FilterRow, Editing, Summary , TotalItem , Lookup , GroupPanel
} from 'devextreme-react/data-grid';
import CheckAuth from "./checkAuth";

import Table from 'react-bootstrap/Table';
class OrderDetails extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      customer : [],
      orderitems : [],
      products : []
    };
  }

  componentDidMount = async () => {
    const response = await getOrderDetail();
    const response2 = await getCustomer();
    const response3 = await getOrderItem();
    const response4 = await getProducts();
    this.setState({
        orders: response.orderdetail,
        customer : response2.customer,
        orderitems : response3.orderitem,
        products : response4.products
    });
  }
  onAddOrderDetail = async (customerId , date_ordered) => {
    const response = await addOrderDetail(customerId , date_ordered);
      this.setState({
        orders: response.orderdetail,
      });
}

onDeleteOrderDetail = async (id) => {
    const response = await deleteOrderDetail(id);
    this.setState({
        orders: response.orderdetail,
    });
}
onDeleteOrderItem = async (id) => {
    const response = await deleteOrderItem(id);
    this.setState({
        orderitems: response.orderitem,
    });
}
onAddOrderItem = async (productId, orderDetialId , quantity_ordered) => {
    const response = await addOrderItem(productId , orderDetialId , quantity_ordered);
      this.setState({
        orderitems: response.orderitem,
      });
}

onRowInserted = async (event) => {
    await this.onAddOrderDetail(event.data.customer.id , event.data.date_ordered);
}
onRowInserted2 = async (event) => {
    const product = this.state.products.filter((item) => { return item.id == event.data.product.id })[0];
    if (product.quantity >=  event.data.quantity_ordered)
    {
        await this.onAddOrderItem(event.data.product.id , event.data.order.id , event.data.quantity_ordered);
    }
    else {
        alert('Insufficient Quantity of Product');
    }
    const response = await getOrderItem();
    this.setState({
        orderitems: response.orderitem,
    });     
  } 
onRowRemoved = async (event) => {
    const id = event.key;
    await this.onDeleteOrderDetail(id);
}
onRowRemoved2 = async (event) => {
    const id = event.key;
    await this.onDeleteOrderItem(id);
}
onRowUpdated = async (event) => {
    const response = await updateOrderDetail(event.key , event.data.date_ordered);
    this.setState({
        orders: response.orderdetail,
    });
  }
  onRowUpdated2 = async (event) => {
    const product = this.state.products.filter((item) => { return item.id == event.data.product.id })[0];
    if (product.quantity >=  event.data.quantity_ordered){
        const response = await updateOrderItem(event.key , product.id ,event.data.quantity_ordered);
        this.setState({
            orders: response.orderdetail,
        });
    }
    else{
        alert('Insufficient Quantity of Product');
    }
    const response = await getOrderItem();
    this.setState({
        orders: response.orderdetail,
    }); 
  }
  render() {
    return (
      <div>
        <MyNav />
        <div style={{marginTop: '10px' }}>
          <h1><center>Orders</center></h1>
          <hr/>
          <DataGrid
            dataSource={this.state.orders}
            showBorders={true}
            onRowInserted={this.onRowInserted}
            onRowRemoved={this.onRowRemoved}
            onRowUpdated={this.onRowUpdated}
            keyExpr="id"
          >
            <GroupPanel visible={true} />
            <Summary>
              <TotalItem
              column="id"
              summaryType="count" />

            </Summary>
            <SearchPanel visible={true}
              width={300}
              placeholder="Search..." />
            <FilterRow visible={true} />
            <Column  allowUpdating={false} dataField="id" dataType="number" caption="Order ID"  allowEditing={false} />
            <Column allowGrouping={true}  dataField="customer.id" caption="customer" width={125}>
            <Lookup dataSource={this.state.customer} valueExpr="id" displayExpr="name"allowEditing={false} />
            </Column>
            <Column  dataField="total_price" dataType="number" allowEditing={false} />
            <Column dataField="date_ordered" dataType="date" allowEditing={false}/>
            <Editing
              mode="row"
              allowAdding={true}
              allowDeleting={true}
              useIcons={true}/>
          </DataGrid>
        </div>
        <div style={{marginTop: '10px' }}>
          <h1><center>Order Item</center></h1>
          <hr/>
          <DataGrid
            dataSource={this.state.orderitems}
            showBorders={true}
            onRowRemoved={this.onRowRemoved2}
            onRowInserted={this.onRowInserted2}
            onRowUpdated={this.onRowUpdated2}
            keyExpr="id"
          >
            <GroupPanel visible={true} />
            <Summary>
              <TotalItem
              column="order"
              summaryType="count" />

            </Summary>
            <SearchPanel visible={true}
              width={300}
              placeholder="Search..." />
            <FilterRow visible={true} />
            <Column allowUpdating={false} allowAdding={true} dataField="order.id" caption="Order ID" width={125}>
                <Lookup dataSource={this.state.orders} valueExpr="id" displayExpr="id" />
            </Column>
            <Column allowGrouping={true} allowUpdating={false} allowAdding={true} dataField="product.id" caption="product" width={125}>
                <Lookup dataSource={this.state.products} valueExpr="id" displayExpr="name" />
            </Column>
            <Column dataField="quantity_ordered" dataType="number" />
            <Editing
              mode="row"
              allowDeleting={true}
              allowAdding={true}
              useIcons={true}/>
          </DataGrid>
        </div>

      </div>
    );
  }
}

export default CheckAuth(OrderDetails);