import React, { Component } from "react";
import MyNav from "./navbar";
import { getInventoryItems, deleteInventoryItem, addInventoryItem, updateIventoryItem } from "../http";
import DataGrid, {
    Column,
    SearchPanel, FilterRow, Editing, Summary, TotalItem
} from 'devextreme-react/data-grid';
import { Chart, Series ,CommonSeriesSettings, Legend, ValueAxis, Title, Export, Tooltip,} from 'devextreme-react/chart';
import CheckAuth from "./checkAuth";

class Inventory extends Component {
    constructor() {
        super();
        this.state = {
            inventoryItems: [],
        };
    }

    componentDidMount = async () => {
        const response = await getInventoryItems();
        let flag = false;
        this.setState({
            inventoryItems: response.inventoryItems,
        });
        for (let item of response.inventoryItems)
        { 
             if(item.availability == "low" || item.availability == "out of stock")
                flag = true;
        }
        if(flag)
            alert("Some Iventory Item is Low or Out of Stock");
              

    }

    onDeleteInventoryItem = async (id) => {
        const response = await deleteInventoryItem(id);
        this.setState({
            inventoryItems: response.inventoryItems,
        });
    }

    onRowInserted = async (event) => {
        const response = await addInventoryItem(event.data.name, event.data.price, event.data.quantity,event.data.restock_level);
        this.setState({
            inventoryItems: response.inventoryItems,
        });    
    }

    onRowRemoved = async (event) => {
        const id = event.key;
        await this.onDeleteInventoryItem(id);
    }

    onRowUpdated = async (event) => {
        const response = await updateIventoryItem(event.key, event.data.name, event.data.price, event.data.quantity , event.data.restock_level);
        this.setState({
            inventoryItems: response.inventoryItems,
        });
    }

    render() {
        return (
            <div>
                <MyNav />
                <div style={{ marginTop: '10px' }}>
                    <h1><center>Inventory Items</center></h1>
                    <hr />
                    <DataGrid
                        dataSource={this.state.inventoryItems}
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
                        <Column dataField="name" dataType="string" />
                        <Column dataField="quantity" dataType="number" />
                        <Column dataField="price" dataType="number"/>
                        <Column dataField="restock_level" dataType="number"/>
                        <Column dataField="availability" dataType="string" groupIndex={0} allowEditing={false} />
                        <Editing
                            mode="row"
                            allowUpdating={true}
                            allowDeleting={true}
                            allowAdding={true}
                            useIcons={true} />
                    </DataGrid>
                   
                    <Chart
        id="chart"
        title="Inventory"
        dataSource={this.state.inventoryItems}
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

export default CheckAuth(Inventory);