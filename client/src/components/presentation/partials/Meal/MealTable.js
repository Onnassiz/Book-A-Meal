import React from 'react';
import PropTypes from 'prop-types';
import MealsTableRow from './../../partials/MealsTableRow';

const renderThead = () => (
  <thead>
    <tr>
      <th>S/N</th>
      <th>Meal Name</th>
      <th>Price</th>
      <th>Category</th>
      <th>Date Created</th>
      <th>More</th>
      <th>Actions</th>
    </tr>
  </thead>
);

const MealsTable = props => (
  <div>
    {props.state.meals.length > 0 ?
      <table className="meals-table">
        {renderThead()}
        <tbody>
          {props.state.meals.map((item, i) =>
            (
              <MealsTableRow
                toggleAddPhoto={() => props.toggleAddPhoto(item)}
                toggleShowDeleteModal={() => props.toggleShowDeleteModal(item)}
                toggleUpdateModal={() => props.toggleUpdateModal(item)}
                item={item}
                key={item.id}
                i={i + 1}
              />
            ))}
        </tbody>
      </table> :
      <div id="no-menu">
        <h2>You do not have any meals</h2>
      </div>
    }
  </div>
);

MealsTable.propTypes = {
  state: PropTypes.object.isRequired,
};

export default MealsTable;
