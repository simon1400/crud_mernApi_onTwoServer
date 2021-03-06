import React, { Component } from 'react';
import ItemService from './ItemService';
import axios from 'axios';
import TableRow from './TableRow';

export default class IndexItem extends Component{

	constructor(props) {
		super(props);
		this.state = { value: '', items: ''};
		this.addItemServise = new ItemService();
	}

	componentDidMount() {
		axios.get('http://localhost:4200/items')
			.then(res => {
				this.setState({ items: res.data });
			}).catch(err => {
				console.log(err);
			})
	}

	tabRow(){
		if(this.state.items instanceof Array){
			return this.state.items.map((object, i) => {
				return <TableRow obj={object} key={i} />;
			})
		}
	}

	render() {
		return(
			<div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <td>No.</td>
              <td>Item</td>
            </tr>
          </thead>
          <tbody>
            {this.tabRow()}
          </tbody>
        </table>
      </div>
		)
	}
}