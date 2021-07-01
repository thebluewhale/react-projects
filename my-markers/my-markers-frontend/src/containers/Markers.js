import React from 'react';
import { connect } from 'react-redux';
import { Preloader } from '../components';
import {
	addNewMarkerRequest, getAllMarkersRequest, updateMarkerRequest, deleteMarkerRequest,
	getMarkersByKeywordRequest
} from '../actions/marker';
import './Markers.css';
const defaultMarkerImageURL = 'http://t1.daumcdn.net/localimg/localimages/07/mapjsapi/default_marker.png';
const spriteMarkerImageURL = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

class Markers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search_input: '',
			pageStatus: 'ADD',
			note_input: '',
			category_input: '1',
			selectedMarker: null,
			selectedPlace: null,
			selectedAddr: null,
			preloader: false
		};
		this.map = null;
		this.daum = null;
		this.places = null;
		this.infoWindow = null;
		this.geocoder = null;
		this.floatingButtonInstance = null;
		this.modalInstance = null;
		this.markers = [];
		this.spriteMarkerImage = null;
		this.defaultMarkerImage = null;
		this.setPageStatusToAdd = this.setPageStatusToAdd.bind(this);
		this.setPageStatusToSearch = this.setPageStatusToSearch.bind(this);
		this.initMaps = this.initMaps.bind(this);
		this.displaySearchedMarker = this.displaySearchedMarker.bind(this);
		this.displayUserMarker = this.displayUserMarker.bind(this);
		this.placesSearchCB = this.placesSearchCB.bind(this);
		this.searchInputChange = this.searchInputChange.bind(this);
		this.searchInputKeyPress = this.searchInputKeyPress.bind(this);
		this.openAddMarkerModal = this.openAddMarkerModal.bind(this);
		this.handleAddMarker = this.handleAddMarker.bind(this);
		this.removeModal = this.removeModal.bind(this);
		this.modalSelectChange = this.modalSelectChange.bind(this);
		this.modalNoteChange = this.modalNoteChange.bind(this);
		this.removeAllMarkers = this.removeAllMarkers.bind(this);
		this.handleUpdateMarker = this.handleUpdateMarker.bind(this);
		this.handleDeleteMarker = this.handleDeleteMarker.bind(this);
		this.setPreloaderState = this.setPreloaderState.bind(this);
	}

	setPreloaderState(state) {
		if (typeof state !== 'boolean') {
			state = false;
		}
		if (this.state.preloader === state) {
			let _this = this;
			setTimeout(() => {
				_this.setState({preloader: state});
			}, 1500);
		}
		this.setState({preloader: state});
	}

	handleDeleteMarker() {
		this.setPreloaderState(true);
		if (this.state.selectedMarker && this.state.selectedMarker._id) {
			this.props.deleteMarkerRequest(this.state.selectedMarker._id).then(() => {
				this.setPreloaderState(false);
				if (this.props.delete.status === 'SUCCESS') {
					window.M.toast({html: '삭제되었습니다.', inDuration: 2000});
				} else {
					window.M.toast({html: '삭제에 실패했습니다.', inDuration: 2000});
				}
			});
		}
	}

	handleUpdateMarker() {
		this.setPreloaderState(true);
		let data = {
			title: this.state.selectedPlace.place_name,
			note: this.state.note_input,
			category: this.state.category_input
		};
		if (this.state.selectedMarker && this.state.selectedMarker._id) {
			this.props.updateMarkerRequest(this.state.selectedMarker._id, data).then(() => {
				this.setPreloaderState(false);
				if (this.props.update.status === 'SUCCESS') {
					window.M.toast({html: '수정되었습니다.', inDuration: 2000});
				} else {
					window.M.toast({html: '수정에 실패했습니다.', inDuration: 2000});
				}
			});
		}
	}

	handleAddMarker() {
		this.setPreloaderState(true);
		let data = {
			title: this.state.selectedPlace.place_name,
			lat: this.state.selectedPlace.y,
			lng: this.state.selectedPlace.x,
			note: this.state.note_input,
			category: this.state.category_input,
			username: this.props.session.username,
			addr: this.state.selectedAddr
		};
		this.props.addNewMarkerRequest(data).then(() => {
			this.setPreloaderState(false);
			if (this.props.addNew.status === 'SUCCESS') {
				window.M.toast({html: '저장되었습니다.', inDuration: 2000});
			} else {
				window.M.toast({html: '저장에 실패했습니다.', inDuration: 2000});
			}
		});

		this.modalInstance.close();
	}

	removeModal() {
		this.modalInstance.close();
		this.setState({note_input: '', category_input: '1'});
	}

	openAddMarkerModal() {
		if (this.modalInstance) {
			this.modalInstance.open();
			window.M.updateTextFields();
		}
	}

	removeAllMarkers() {
		if (this.markers.length) {
			for(let i = 0; i < this.markers.length; i++) {
				this.markers[i].setMap(null);
			}
		}
		this.markers = [];
	}

	setPageStatusToAdd() {
		this.floatingButtonInstance.close();
		this.setState({pageStatus: 'ADD', search_input: '', note_input: ''});
		this.removeAllMarkers();
		this.infoWindow.close();
		window.M.toast({html: '새로운 장소를 등록합니다.', inDuration: 2000});
	}

	setPageStatusToSearch() {
		this.floatingButtonInstance.close();
		this.setState({pageStatus: 'SEARCH', search_input: '', note_input: ''});
		this.setPreloaderState(true);
		this.removeAllMarkers();
		this.infoWindow.close();
		window.M.toast({html: '등록한 장소를 검색할 수 있습니다.', inDuration: 2000});
		this.props.getAllMarkersRequest(this.props.session.username).then(() => {
			this.setPreloaderState(false);
			if (this.props.getAll.status === 'SUCCESS') {
				this.displayUserMarker('ALL');
			} else {
			}
		});
	}

	initMaps() {
		this.daum = window.daum;
		let mapContainer = document.getElementById('map');
		let options = {
			center: new this.daum.maps.LatLng(37.566826, 126.9786567),
			level: 3
		};
		this.map = new this.daum.maps.Map(mapContainer, options);
		this.places = new this.daum.maps.services.Places();
		this.infoWindow = new this.daum.maps.InfoWindow({zIndex:1});
		this.geocoder = new this.daum.maps.services.Geocoder();

		let markerSize = new this.daum.maps.Size(31, 35);
		this.defaultMarkerImage = new this.daum.maps.MarkerImage(defaultMarkerImageURL, markerSize);
		this.spriteMarkerImage = new this.daum.maps.MarkerImage(spriteMarkerImageURL, markerSize);
	}

	displayUserMarker(mode) {
		this.removeAllMarkers();
		let bounds = new this.daum.maps.LatLngBounds();
		let data = [];
		if (mode === 'ALL') {
			data = this.props.getAll.markers;
		} else {
			data = this.props.getByKeyword.markers;
		}

		for (let i = 0; i < data.length; i++) {
			let marker = new this.daum.maps.Marker({
				map: this.map,
				position: new this.daum.maps.LatLng(data[i].lat, data[i].lng),
				title: data[i].title
			});
			this.markers.push(marker);
		
			let _this = this;
			this.daum.maps.event.addListener(marker, 'click', () => {
				marker._id = data[i]._id;
				if (_this.state.selectedMarker == marker) {
					_this.openAddMarkerModal();
				} else {
					if (_this.state.selectedMarker) {
						_this.state.selectedMarker.setImage(this.defaultMarkerImage);
					}
					marker.setImage(this.spriteMarkerImage);
					
					let place = {
						x: data[i].lng,
						y: data[i].lat,
						place_name: data[i].title
					};
					let content = `<p className='flow-text'>${place.place_name}</p>`;
					_this.infoWindow.setContent(content);
					_this.infoWindow.open(this.map, marker);
					_this.setState({
						selectedMarker: marker,
						selectedPlace: place,
						note_input: data[i].note,
						category_input: data[i].category
					});
					_this.geocoder.coord2RegionCode(place.x, place.y, (ret, status) => {
						if (status === _this.daum.maps.services.Status.OK) {
							_this.setState({selectedAddr: ret[0].address_name});
						}
					});
				}
			});

			bounds.extend(new this.daum.maps.LatLng(data[i].lat, data[i].lng));
			marker.setMap(this.map);
		}       

		this.map.setBounds(bounds);
	}

	displaySearchedMarker(place) {
		this.removeAllMarkers();
		let marker = new this.daum.maps.Marker({
			map: this.map,
			position: new this.daum.maps.LatLng(place.y, place.x) 
		});
		this.markers.push(marker);
	
		let _this = this;
		this.daum.maps.event.addListener(marker, 'click', () => {
			if (_this.state.selectedMarker == marker) {
				_this.openAddMarkerModal();
			} else {
				let content = `<p className='flow-text'>${place.place_name}</p>`;
				_this.infoWindow.setContent(content);
				_this.infoWindow.open(this.map, marker);
				_this.setState({
					selectedMarker: marker,
					selectedPlace: place
				});
				_this.geocoder.coord2RegionCode(place.x, place.y, (ret, status) => {
					if (status === _this.daum.maps.services.Status.OK) {
						_this.setState({selectedAddr: ret[0].address_name});
					}
				});
			}
		});
	}

	placesSearchCB(data, status) {
		if (status === this.daum.maps.services.Status.OK) {
			let bounds = new this.daum.maps.LatLngBounds();

			for (let i = 0; i < data.length; i++) {
				this.displaySearchedMarker(data[i]);    
				bounds.extend(new this.daum.maps.LatLng(data[i].y, data[i].x));
			}       

			this.map.setBounds(bounds);
		}
	}

	searchInputChange(e) {
		this.setState({search_input: e.target.value});
	}

	searchInputKeyPress(e) {
		if (e.charCode === 13) {
			if (this.state.pageStatus === 'ADD') {
				let keyword = this.state.search_input;
				this.places.keywordSearch(keyword, this.placesSearchCB); 
			} else {
				let keyword = this.state.search_input;
				let username = this.props.session.username;
				this.props.getMarkersByKeywordRequest(username, keyword).then(() => {
					if (this.props.getByKeyword.status === 'SUCCESS') {
						window.M.toast({html: '검색 결과입니다.', inDuration: 2000});
						this.displayUserMarker('FILTERED');
					} else {
						window.M.toast({html: '검색에 실패했습니다.', inDuration: 2000});
					}
				})
			}
		}
	}

	modalSelectChange(e) {
		this.setState({category_input: e.target.value});
	}

	modalNoteChange(e) {
		this.setState({note_input: e.target.value});
	}

	componentDidMount() {
		// map init
		this.initMaps();

		// float button init
		let btnElem = document.querySelector('.fixed-action-btn');
		this.floatingButtonInstance = window.M.FloatingActionButton.init(btnElem);

		// modal init
		let modalElem = document.querySelector('.modal');
		this.modalInstance = window.M.Modal.init(modalElem);

		//modal select init
		let selectElem = document.querySelector('select');
		this.selectInstance = window.M.FormSelect.init(selectElem);
	}

	render() {
		const { selectedPlace } = this.state;

		const addMarkerModal = (
			<div className='modal modal-fixed-footer modal-container'>
				<div className='modal-content'>
					<div className='row'>
						<h5 className='col s12 m12 l12'>
							<b>{selectedPlace ? selectedPlace.place_name : null}</b>
						</h5>
						<p className='col s12 m12 l12'>{this.state.selectedAddr}</p>
						<div className='col s12 m12 l12'>
							<div className='input-field'>
								<select onChange={this.modalSelectChange}>
									<option value='1'>카페/식당 등</option>
									<option value='2'>술집/바 등</option>
									<option value='3'>박물관/명소 등</option>
									<option value='4'>기타</option>
								</select>
								<label>카테고리 선택</label>
							</div>
						</div>
						<form className='col s12 m12 l12'>
							<div className='row'>
								<div className='input-field col s12 m12 l12'>
									<input id='modal-input' type='text' className='validate'
										   value={this.state.note_input} onChange={this.modalNoteChange} />
									<label htmlFor='modal-input'>간단한 메모를 입력하세요</label>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className='modal-footer'>
					{this.state.pageStatus === 'ADD' ? (
						<div>
							<div className='modal-close waves-effect waves-green btn-flat'
								 onClick={this.handleAddMarker}>추가</div>
							<div className='modal-close waves-effect waves-green btn-flat'
								 onClick={this.removeModal}>취소</div>
						</div>
					) : (
						<div>
							<div className='modal-close waves-effect waves-green btn-flat'
								 onClick={this.handleDeleteMarker}>삭제</div>
							<div className='modal-close waves-effect waves-green btn-flat'
								 onClick={this.handleUpdateMarker}>수정</div>
							<div className='modal-close waves-effect waves-green btn-flat'
								 onClick={this.removeModal}>닫기</div>
						</div>
					)}
				</div>
			</div>
		);

		const floatingButton = (
			<div className='fixed-action-btn'>
				<div className='btn-floating btn-large red'>
					<i className='large material-icons'>menu</i>
				</div>
				<ul>
					<li><div className='btn-floating btn-large purple' onClick={() => {this.props.history.goBack()}}>
						<i className='large material-icons'>arrow_back</i>
					</div></li>
					<li><div className='btn-floating btn-large green' onClick={this.setPageStatusToAdd}>
						<i className='large material-icons'>add</i>
					</div></li>
					<li><div className='btn-floating btn-large blue' onClick={this.setPageStatusToSearch}>
						<i className='large material-icons'>location_on</i>
					</div></li>
				</ul>
			</div>
		);

		const placeholderString = this.state.pageStatus === 'ADD' ?
			'새로운 장소를 등록합니다.' : '등록한 장소를 검색합니다.';

		const searchInput = (
			<div className='search-input-container row'>
				<div className='col s12 m12 l12'>
					<div className='container search-input-background'>
						<div className='input-field container'>
							<i className='material-icons prefix'>search</i>
							<input id='search_input' type='text' className='validate'
								name='search_input' placeholder={placeholderString}
								value={this.state.search_input}
								onChange={this.searchInputChange}
								onKeyPress={this.searchInputKeyPress}>
							</input>
						</div>
					</div>
				</div>
			</div>
		)

		return (
			<div>
				<div id='map' className='map-container'>
					{searchInput}
					{floatingButton}	
				</div>
				{addMarkerModal}	
				{this.state.preloader ? <Preloader /> : null}				
			</div>
		);
	}
}

Markers.propTypes = {
};

Markers.defaultProps = {
};

const mapStateToProps = (state) => {
	return {
		addNew: state.marker.addNew,
		getAll: state.marker.getAll,
		update: state.marker.update,
		delete: state.marker.delete,
		getByKeyword: state.marker.getByKeyword,
		session: state.account.session,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addNewMarkerRequest: (data) => {
			return dispatch(addNewMarkerRequest(data));
		},
		getAllMarkersRequest: (username) => {
			return dispatch(getAllMarkersRequest(username));
		},
		updateMarkerRequest: (id, updateData) => {
			return dispatch(updateMarkerRequest(id, updateData));
		},
		deleteMarkerRequest: (id) => {
			return dispatch(deleteMarkerRequest(id));
		},
		getMarkersByKeywordRequest: (username, keyword) => {
			return dispatch(getMarkersByKeywordRequest(username, keyword));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Markers);
