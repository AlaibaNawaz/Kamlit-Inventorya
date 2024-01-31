import React, { Component } from "react";
import MyNav from "./navbar";
import { getProducts, deleteProduct , addProduct , updateProduct} from "../http";
import DataGrid, {
  Column,
  SearchPanel, FilterRow, Editing, Summary , TotalItem 
} from 'devextreme-react/data-grid';
import CheckAuth from "./checkAuth";
import { Chart, Series ,CommonSeriesSettings, Legend, ValueAxis, Title, Export, Tooltip } from 'devextreme-react/chart';

import Table from 'react-bootstrap/Table';
class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount = async () => {
    const response = await getProducts();
    let flag = false;
    this.setState({
      products: response.products,
    });
    for (let item of response.products)
        { 
             if(item.availability == "low" || item.availability == "out of stock")
                flag = true;
        }
        if(flag)
            alert("Some Product is Low or Out of Stock");
  }

  onDeleteProduct = async (id) => {
    const response = await deleteProduct(id);
    this.setState({
      products: response.products,
    });
  }

onAddProduct = async (name , price , quantity ,restock_level) => {
  const response = await addProduct(name , price , quantity ,restock_level);
    this.setState({
      products: response.products,
    });
}
  onRowRemoved = async (event) => {
    const id = event.key;
    await this.onDeleteProduct(id);
  }

  onRowInserted = async (event) => {
    await this.onAddProduct(event.data.name , event.data.price , event.data.quantity , event.data.restock_level);
  }
  onRowUpdated = async (event) => {
    const response = await updateProduct(event.key ,event.data.name , event.data.price , event.data.quantity , event.data.restock_level);
    this.setState({
      products: response.products,
    });
  }

  render() {
    return (
      <div>
        <MyNav />
        <div style={{marginTop: '10px' }}>
          <h1><center>Products</center></h1>
          <hr/>
          <DataGrid
            dataSource={this.state.products}
            showBorders={true}
            onRowRemoved={this.onRowRemoved}
            onRowInserted={this.onRowInserted}
            onRowUpdated={this.onRowUpdated}
            keyExpr="id"
          >
            <Summary>
              <TotalItem
              column="name"
              summaryType="count" />

            </Summary>
            <SearchPanel visible={true}
              width={300}
              placeholder="Search..." />
            <FilterRow visible={true} />
            <Column dataField="id" dataType="number" visible={false} />
            <Column dataField="name" dataType="string"/>
            <Column dataField="quantity" dataType="number"  />
            <Column dataField="price" dataType="number" />
            <Column dataField="restock_level" dataType="number"/>
            <Column dataField="availability" dataType="string" groupIndex={0} allowEditing={false} />
            <Editing
              mode="row"
              allowUpdating={true}
              allowDeleting={true}
              allowAdding={true} 
              useIcons={true}/>
          </DataGrid>
                  
       <Chart
        id="chart"
        title="Product"
        dataSource={this.state.products}
      >
        <CommonSeriesSettings argumentField="name" type="stackedBar" />
        <Series
         valueField="restock_level"
         name="Restock Level"
         color="red"
        />
        <Series
          
          valueField="quantity"
          name="Quantity"
          color="orange"/>
          
           <ValueAxis position="right">
          <Title text="Quantity" />
        </ValueAxis>
        <Legend
          verticalAlignment="bottom"
          horizontalAlignment="center"
          itemTextPosition="top"
        />
        <Export enabled={true} />
        <Tooltip
          enabled={true}
          location="edge"
          customizeTooltip={this.customizeTooltip}
        />
      </Chart>


        </div>

      </div>
    );
  }
}

export default CheckAuth(Products);