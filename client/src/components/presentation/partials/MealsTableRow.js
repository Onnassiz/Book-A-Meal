import React from 'react';
import PropTypes from 'prop-types';
import empty from 'is-empty';
import { getDate, numberWithCommas } from '../../../utilities/functions';

const renderActionButtons = props => (
  <span>
    <span>
      <a title="edit" id="updateModal" onClick={() => props.toggleUpdateModal(props.item)}><i className="material-icons">mode_edit</i></a>
    </span>
    <span>
      <a title="add photo" id="addPhotoModal" onClick={() => props.toggleAddPhoto(props.item)}><i className="material-icons">add_a_photo</i></a>
    </span>
    <span>
      <a title="delete" id="deleteModal" onClick={() => props.toggleShowDeleteModal(props.item)}><i className="material-icons">delete_sweep</i></a>
    </span>
  </span>
);

const renderDetailTooltips = (props) => {
  let image = props.item.imageUrl;
  image = image === null ? null : image.replace('upload/', 'upload/c_scale,w_70/');
  return (
    <span>
      <a className="tooltips"><i className="material-icons">info_outline</i>
        <div className="arrowBox">
          <div>
            <p>
              {empty(props.item.imageUrl) ? <i style={{ fontSize: 80 }} className="material-icons">photo</i> : <img src={image} alt="banner" style={{ maxHeight: '600px', borderRadius: 4 }} />}
            </p>
            {props.item.description}
          </div>
        </div>
      </a>
    </span>
  );
};

const MealsTableRow = props => (
  <tr>
    <td style={{ width: 10 }}>{props.i}</td>
    <td>{props.item.name}</td>
    <td>&#8358;{numberWithCommas(props.item.price)}</td>
    <td>{props.item.category}</td>
    <td>{getDate(props.item.createdAt)}</td>
    <td>
      {renderDetailTooltips(props)}
    </td>
    <td>
      {renderActionButtons(props)}
    </td>
  </tr>
);

MealsTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
};

renderDetailTooltips.propTypes = {
  item: PropTypes.object.isRequired,
};

renderActionButtons.propTypes = {
  toggleUpdateModal: PropTypes.func.isRequired,
  toggleShowDeleteModal: PropTypes.func.isRequired,
  toggleAddPhoto: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};


export default MealsTableRow;

