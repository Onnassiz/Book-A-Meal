import React from 'react';
import PropTypes from 'prop-types';
import empty from 'is-empty';
import { getDate, numberWithCommas } from '../../../utilities/functions';

const MealsTableRow = (props) => {
  let image = props.item.imageUrl;
  image = image === null ? null : image.replace('upload/', 'upload/c_scale,w_70/');
  return (
		<tr>
			<td style={{ width: 10 }}>{props.i}</td>
			<td>{props.item.name}</td>
			<td>&#8358;{numberWithCommas(props.item.price)}</td>
			<td>{props.item.category}</td>
			<td>{getDate(props.item.createdAt)}</td>
			<td>{props.item.caterer}</td>
			<td>
				<span>
					<a className="tooltips"><i className="material-icons">info_outline</i>
						<div className="arrowBox">
							<div>
								<p>
									{ empty(props.item.imageUrl) ? <i style={{ fontSize: 80 }} className="material-icons">photo</i> : <img src={image} alt="banner" style={{ maxHeight: '600px', borderRadius: 4 }} />}
								</p>
								{ props.item.description }
							</div>
						</div>
					</a>
				</span>
			</td>
			<td>
				{ props.item.userId === props.userId ?
					<span>
						<span>
							<a title="edit" onClick={props.toggleUpdateModal}><i className="material-icons">mode_edit</i></a>
						</span>
						<span>
							<a title="add photo" onClick={props.toggleAddPhoto}><i className="material-icons">add_a_photo</i></a>
						</span>
						<span>
							<a title="delete" onClick={props.toggleShowDeleteModal}><i className="material-icons">delete_sweep</i></a>
						</span>
					</span> : '' }
			</td>
		</tr>
  );
};

MealsTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  toggleUpdateModal: PropTypes.func.isRequired,
  toggleShowDeleteModal: PropTypes.func.isRequired,
  toggleAddPhoto: PropTypes.func.isRequired,
};


export default MealsTableRow;

