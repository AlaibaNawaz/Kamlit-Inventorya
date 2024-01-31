import React, { Component } from "react";
import MyNav from "./navbar";
import { getProductionInformation, deleteProductionInformation, getProducts , updateProductionInformation , getInventoryItems , addProductionInformation} from "../http";
import DataGrid, {
    Column,
    SearchPanel, FilterRow, Editing, Summary, TotalItem, Lookup, GroupPanel
} from 'devextreme-react/data-grid';
import CheckAuth from "./checkAuth";

import Table from 'react-bootstrap/Table';
import products from "./products";
class ProductionManagement extends Component {
    constructor() {
        super();
        this.state = {
            productInventory: [],
            products: [],
            inventoryItems :[]
        };
    }

    componentDidMount = async () => {
        const response = await getProductionInformation();
        const response2 = await getProducts();
        const response3 = await getInventoryItems();
        this.setState({
            productInventory: response.productionInformation,
            products: response2.products,
            inventoryItems : response3.inventoryItems
        });
    }


    onDeleteProductInventory = async (id) => {
        const response = await deleteProductionInformation(id);
        this.setState({
            productInventory: response.productionInformation,
        });
    }
    onAddProductIventory = async (productId, inventoryItemId , quantity_used) => {
        const response = await addProductionInformation(productId , inventoryItemId , quantity_used);
          this.setState({
            productInventory: response.productionInformation,
          });
    }

    onRowRemoved = async (event) => {
        const id = event.key;
        await this.onDeleteProductInventory(id);
    }
    onRowUpdated = async (event) => {
        const inventory_item = this.state.inventoryItems.filter((item) => { return item.id == event.data.inventory_item.id })[0];
        if (inventory_item.quantity >=  event.data.quantity_used){
            const response = await updateProductionInformation(event.key ,inventory_item.id ,event.data.quantity_used);
            this.setState({
                productInventory: response.productionInformation,
            });
        }
        else{
            alert('Insufficient Quantity In Inventory');
        }
        const response = await getProductionInformation();
        this.setState({
            productInventory: response.productionInformation,
        }); 
      }
    onRowInserted = async (event) => {
        const inventory_item = this.state.inventoryItems.filter((item) => { return item.id == event.data.inventory_item.id })[0];
        if (inventory_item.quantity >=  event.data.quantity_used)
        {
            await this.onAddProductIventory(event.data.product.id , event.data.inventory_item.id , event.data.quantity_used);
        }
        else {
            alert('Insufficient Quantity In Inventory');
        }
        const response = await getProductionInformation();
        this.setState({
            productInventory: response.productionInformation,
        });     
      }  

    render() {
        return (
            <div>
                <MyNav />
                <div style={{ marginTop: '10px' }}>
                    <h1><center>Production Management</center></h1>
                    <hr />
                    <DataGrid
                        dataSource={this.state.productInventory}
                        showBorders={true}
                        onRowRemoved={this.onRowRemoved}
                        onRowInserted={this.onRowInserted}
                        onRowUpdated={this.onRowUpdated}
                        keyExpr="id"
                    >
                         <GroupPanel visible={true} />
                        <Summary>
                            <TotalItem
                                column="product"
                                summaryType="count" />

                        </Summary>
                        <SearchPanel visible={true}
                            width={300}
                            placeholder="Search..." />
                        <FilterRow visible={true} />
                        <Column dataField="id" dataType="number" visible={false} />

                        <Column allowGrouping={true} allowUpdating={false} allowAdding={true} dataField="product.id" caption="product" width={125}>
                            <Lookup dataSource={this.state.products} valueExpr="id" displayExpr="name" />
                        </Column>

                        <Column allowUpdating={false} allowAdding={true} dataField="inventory_item.id" caption="inventory_item" width={125}>
                            <Lookup dataSource={this.state.inventoryItems} valueExpr="id" displayExpr="name" />
                        </Column>
                        <Column allowUpdating={false} allowAdding={false} dataField="inventory_item_available" dataType="number" caption="Inventory Item Availabe" visible={false}/>
                        <Column dataField="quantity_used" dataType="number" />



                        <Editing
                            mode="row"
                            allowUpdating={true}
                            allowDeleting={true}
                            allowAdding={true}
                            useIcons={true} />
                    </DataGrid>
                </div>

            </div>
        );
    }
}

export default CheckAuth(ProductionManagement);