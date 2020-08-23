import React, { Component } from "react";

class CurrencyConverter extends Component {

  render() {
    return  (
      <div className="filter">
        <div className="filter-result">
        Products
        </div>

        <div className="filter-size">
          Currency{" "}
          <select
            value={this.props.currency}
            onChange={ this.props.convertCurrency }
          >
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
            <option value="AUD">AUD</option>
          </select>
        </div>
      </div>
    );
  }
}
export default CurrencyConverter;
