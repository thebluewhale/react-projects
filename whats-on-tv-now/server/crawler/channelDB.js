import Channel from '../models/channel';

export default class ChannelDB {
	constructor() {
		this.channelDB = [];
		this.getChannelDB = this.getChannelDB.bind(this);
		this.initChannelDB = this.initChannelDB.bind(this);
		this.saveChannelDB = this.saveChannelDB.bind(this);
		this.getChannelDBLength = this.getChannelDBLength.bind(this);
	}

	getChannelDB() {
		return this.channelDB;
	}

	saveChannelDB() {
		let length = this.getChannelDBLength();
		for(let i = 0; i <length; i++) {
			let obj = this.channelDB[i];
			Channel.findOne({provider: obj.provider}, (err, data) => {
				if (err) {
					throw err;
				} else if (!data) {
					console.log(`initChannelDB : new ${obj.provider} DB created.`);
					new Channel({
						provider: obj.provider,
						main: obj.main,
						number: obj.number,
						category: obj.category,
						onair: '',
						ratings: ''
					}).save((err) => {
						if (err) throw err;
					});
				} else {
					console.log(obj.provider + ' DB is already exists');
				}
			});
		}
	}

	getChannelDBLength() {
		return this.channelDB.length;
	}

	initChannelDB() {
		this.channelDB = [
			{ provider: 'KBS1', main: 'public', number: '9', category: '종합', ratings: '' },
			{ provider: 'KBS2', main: 'public', number: '7', category: '종합', ratings: '' },
			{ provider: '강릉 KBS1', main: 'public', number: '603', category: '종합', ratings: '' },
			{ provider: '경인 KBS1', main: 'public', number: '281', category: '종합', ratings: '' },
			{ provider: '광주 KBS1', main: 'public', number: '606', category: '종합', ratings: '' },
			{ provider: '대구 KBS1', main: 'public', number: '610', category: '종합', ratings: '' },
			{ provider: '대전 KBS1', main: 'public', number: '604', category: '종합', ratings: '' },
			{ provider: '목포 KBS1', main: 'public', number: '574', category: '종합', ratings: '' },
			{ provider: '부산 KBS1', main: 'public', number: '608', category: '종합', ratings: '' },
			{ provider: '순천 KBS1', main: 'public', number: '322', category: '종합', ratings: '' },
			{ provider: '안동 KBS1', main: 'public', number: '317', category: '종합', ratings: '' },
			{ provider: '울산 KBS1', main: 'public', number: '602', category: '종합', ratings: '' },
			{ provider: '원주 KBS1', main: 'public', number: '565', category: '종합', ratings: '' },
			{ provider: '전주 KBS1', main: 'public', number: '607', category: '종합', ratings: '' },
			{ provider: '제주 KBS1', main: 'public', number: '611', category: '종합', ratings: '' },
			{ provider: '창원 KBS1', main: 'public', number: '609', category: '종합', ratings: '' },
			{ provider: '청주 KBS1', main: 'public', number: '605', category: '종합', ratings: '' },
			{ provider: '춘천 KBS1', main: 'public', number: '601', category: '종합', ratings: '' },
			{ provider: '충주 KBS1', main: 'public', number: '572', category: '종합', ratings: '' },
			{ provider: 'MBC', main: 'public', number: '11', category: '종합', ratings: '' },
			{ provider: '강릉 MBC', main: 'public', number: '474', category: '종합', ratings: '' },
			{ provider: '광주 MBC', main: 'public', number: '468', category: '종합', ratings: '' },
			{ provider: '대구 MBC', main: 'public', number: '467', category: '종합', ratings: '' },
			{ provider: '대전 MBC', main: 'public', number: '461', category: '종합', ratings: '' },
			{ provider: '목포 MBC', main: 'public', number: '476', category: '종합', ratings: '' },
			{ provider: '부산 MBC', main: 'public', number: '466', category: '종합', ratings: '' },
			{ provider: '삼척 MBC', main: 'public', number: '481', category: '종합', ratings: '' },
			{ provider: '안동 MBC', main: 'public', number: '478', category: '종합', ratings: '' },
			{ provider: '여수 MBC', main: 'public', number: '477', category: '종합', ratings: '' },
			{ provider: '울산 MBC', main: 'public', number: '473', category: '종합', ratings: '' },
			{ provider: '원주 MBC', main: 'public', number: '480', category: '종합', ratings: '' },
			{ provider: '전주 MBC', main: 'public', number: '469', category: '종합', ratings: '' },
			{ provider: '제주 MBC', main: 'public', number: '472', category: '종합', ratings: '' },
			{ provider: '진주MBC', main: 'public', number: '475', category: '종합', ratings: '' },
			{ provider: '춘천 MBC', main: 'public', number: '471', category: '종합', ratings: '' },
			{ provider: '포항 MBC', main: 'public', number: '479', category: '종합', ratings: '' },
			{ provider: 'SBS', main: 'public', number: '6', category: '종합', ratings: '' },
			{ provider: 'G1 강원민방', main: 'public', number: '269', category: '종합', ratings: '' },
			{ provider: 'JIBS 제주방송', main: 'public', number: '376', category: '종합', ratings: '' },
			{ provider: 'JTV 전주방송', main: 'public', number: '271', category: '종합', ratings: '' },
			{ provider: 'KBC 광주방송', main: 'public', number: '266', category: '종합', ratings: '' },
			{ provider: 'KNN 부산경남방송', main: 'public', number: '264', category: '종합', ratings: '' },
			{ provider: 'TBC 대구방송', main: 'public', number: '265', category: '종합', ratings: '' },
			{ provider: 'TJB 대전방송', main: 'public', number: '267', category: '종합', ratings: '' },
			{ provider: 'UBC 울산방송', main: 'public', number: '268', category: '종합', ratings: '' },
			{ provider: 'EBS1', main: 'public', number: '13', category: '종합', ratings: '' },
			{ provider: 'EBS2', main: 'public', number: '546', category: '종합', ratings: '' },
			{ provider: 'OBS 경인TV', main: 'public', number: '816', category: '종합', ratings: '' },
			{ provider: '포항 KBS1', main: 'public', number: '314', category: '종합', ratings: '' },

			{ provider: 'TV 조선', main: 'organization', number: '569', category: '종합', ratings: '' },
			{ provider: '채널A', main: 'organization', number: '571', category: '종합', ratings: '' },
			{ provider: 'MBN', main: 'organization', number: '20', category: '종합', ratings: '' },
			{ provider: 'JTBC', main: 'organization', number: '570', category: '종합', ratings: '' },

			{ provider: 'JTBC3', main: 'cable', number: '407', category: '스포츠', ratings: '' },
			{ provider: 'MBC스포츠 플러스', main: 'cable', number: '124', category: '스포츠', ratings: '' },
			{ provider: 'JTBC GOLF', main: 'cable', number: '487', category: '스포츠', ratings: '' },
			{ provider: 'OGN', main: 'cable', number: '55', category: '스포츠', ratings: '' },
			{ provider: 'SBS골프', main: 'cable', number: '44', category: '스포츠', ratings: '' },
			{ provider: 'Sky Sports', main: 'cable', number: '447', category: '스포츠', ratings: '' },
			{ provider: '큐브TV', main: 'cable', number: '598', category: '연예,오락', ratings: '' },
			{ provider: 'tvN', main: 'cable', number: '743', category: '연예,오락', ratings: '' },
			{ provider: 'KBS Joy', main: 'cable', number: '754', category: '연예,오락', ratings: '' },
			{ provider: 'E채널', main: 'cable', number: '108', category: '연예,오락', ratings: '' },
			{ provider: 'MBC every1', main: 'cable', number: '335', category: '연예,오락', ratings: '' },
			{ provider: 'XTM', main: 'cable', number: '388', category: '연예,오락', ratings: '' },
			{ provider: 'CMC 가족오락TV', main: 'cable', number: '419', category: '연예,오락', ratings: '' },
			{ provider: 'FX', main: 'cable', number: '818', category: '연예,오락', ratings: '' },
			{ provider: 'HD Classica', main: 'cable', number: '365', category: '연예,오락', ratings: '' },
			{ provider: 'I.NET', main: 'cable', number: '118', category: '연예,오락', ratings: '' },
			{ provider: 'K STAR', main: 'cable', number: '37', category: '연예,오락', ratings: '' },
			{ provider: 'SBS funE', main: 'cable', number: '684', category: '연예,오락', ratings: '' },
			{ provider: 'etn 연예채널', main: 'cable', number: '101', category: '연예,오락', ratings: '' },
			{ provider: '이벤트TV', main: 'cable', number: '102', category: '연예,오락', ratings: '' },
			{ provider: 'YTN', main: 'cable', number: '24', category: '뉴스,경제', ratings: '' },
			{ provider: 'SBS CNBC', main: 'cable', number: '622', category: '뉴스,경제', ratings: '' },
			{ provider: '연합뉴스 TV', main: 'cable', number: '573', category: '뉴스,경제', ratings: '' },
			{ provider: 'MTN', main: 'cable', number: '132', category: '뉴스,경제', ratings: '' },
			{ provider: 'C TIME', main: 'cable', number: '771', category: '뉴스,경제', ratings: '' },
			{ provider: 'Channel News Asia', main: 'cable', number: '81', category: '뉴스,경제', ratings: '' },
			{ provider: 'R토마토', main: 'cable', number: '704', category: '뉴스,경제', ratings: '' },
			{ provider: '서울경제TV', main: 'cable', number: '157', category: '뉴스,경제', ratings: '' },
			{ provider: '이데일리TV', main: 'cable', number: '380', category: '뉴스,경제', ratings: '' },
			{ provider: '쿠키건강TV', main: 'cable', number: '735', category: '뉴스,경제', ratings: '' },
			{ provider: '토마토TV', main: 'cable', number: '359', category: '뉴스,경제', ratings: '' },
			{ provider: '한국경제TV', main: 'cable', number: '106', category: '뉴스,경제', ratings: '' },
			{ provider: '투니버스', main: 'cable', number: '38', category: '만화', ratings: '' },
			{ provider: '애니맥스', main: 'cable', number: '725', category: '만화', ratings: '' },
			{ provider: '챔프', main: 'cable', number: '666', category: '만화', ratings: '' },
			{ provider: 'AniBox', main: 'cable', number: '740', category: '만화', ratings: '' },
			{ provider: '카툰네트워크', main: 'cable', number: '358', category: '만화', ratings: '' },
			{ provider: 'AniOne', main: 'cable', number: '160', category: '만화', ratings: '' },
			{ provider: '디즈니주니어', main: 'cable', number: '430', category: '만화', ratings: '' },
			{ provider: '디즈니채널', main: 'cable', number: '172', category: '만화', ratings: '' },
			{ provider: '부메랑', main: 'cable', number: '26', category: '만화', ratings: '' },
			{ provider: '애니플러스', main: 'cable', number: '91', category: '만화', ratings: '' },
			{ provider: '롯데홈쇼핑', main: 'cable', number: '138', category: '홈쇼핑', ratings: '' },
			{ provider: '현대홈쇼핑', main: 'cable', number: '140', category: '홈쇼핑', ratings: '' },
			{ provider: 'CJ오쇼핑', main: 'cable', number: '250', category: '홈쇼핑', ratings: '' },
			{ provider: 'GS SHOP', main: 'cable', number: '45', category: '홈쇼핑', ratings: '' },
			{ provider: 'NS홈쇼핑', main: 'cable', number: '133', category: '홈쇼핑', ratings: '' },
			{ provider: '홈&쇼핑', main: 'cable', number: '567', category: '홈쇼핑', ratings: '' },
			{ provider: 'On Style', main: 'cable', number: '414', category: '여성,패션', ratings: '' },
			{ provider: 'FashionN', main: 'cable', number: '917', category: '여성,패션', ratings: '' },
			{ provider: 'GTV', main: 'cable', number: '35', category: '여성,패션', ratings: '' },
			{ provider: 'KBS W', main: 'cable', number: '509', category: '여성,패션', ratings: '' },
			{ provider: 'O tvN', main: 'cable', number: '705', category: '여성,패션', ratings: '' },
			{ provider: 'TRENDY', main: 'cable', number: '813', category: '여성,패션', ratings: '' },
			{ provider: '동아TV', main: 'cable', number: '247', category: '여성,패션', ratings: '' },
			{ provider: '육아방송', main: 'cable', number: '252', category: '여성,패션', ratings: '' },
			{ provider: 'MBC 드라마넷', main: 'cable', number: '253', category: '드라마', ratings: '' },
			{ provider: 'SBS플러스', main: 'cable', number: '54', category: '드라마', ratings: '' },
			{ provider: 'KBS 드라마', main: 'cable', number: '148', category: '드라마', ratings: '' },
			{ provider: '드라맥스', main: 'cable', number: '285', category: '드라마', ratings: '' },
			{ provider: 'CHING', main: 'cable', number: '780', category: '드라마', ratings: '' },
			{ provider: 'CNTV', main: 'cable', number: '355', category: '드라마', ratings: '' },
			{ provider: 'DRAMAcube', main: 'cable', number: '499', category: '드라마', ratings: '' },
			{ provider: 'DramaH', main: 'cable', number: '287', category: '드라마', ratings: '' },
			{ provider: 'FOXlife', main: 'cable', number: '817', category: '드라마', ratings: '' },
			{ provider: 'FOX채널', main: 'cable', number: '706', category: '드라마', ratings: '' },
			{ provider: 'Sky Drama', main: 'cable', number: '783', category: '드라마', ratings: '' },
			{ provider: '디원TV', main: 'cable', number: '693', category: '드라마', ratings: '' },
			{ provider: '중화TV', main: 'cable', number: '664', category: '드라마', ratings: '' },
			{ provider: '텔레노벨라', main: 'cable', number: '925', category: '드라마', ratings: '' },
			{ provider: 'Mnet', main: 'cable', number: '27', category: '음악', ratings: '' },
			{ provider: 'MBC Music', main: 'cable', number: '126', category: '음악', ratings: '' },
			{ provider: 'SBS MTV', main: 'cable', number: '130', category: '음악', ratings: '' },
			{ provider: 'CMTV', main: 'cable', number: '629', category: '음악', ratings: '' },
			{ provider: 'GMTV', main: 'cable', number: '43', category: '음악', ratings: '' },
			{ provider: 'OCN', main: 'cable', number: '22', category: '영화', ratings: '' },
			{ provider: '채널CGV', main: 'cable', number: '19', category: '영화', ratings: '' },
			{ provider: 'SUPER ACTION', main: 'cable', number: '129', category: '영화', ratings: '' },
			{ provider: 'CJ UXN', main: 'cable', number: '624', category: '영화', ratings: '' },
			{ provider: '스크린', main: 'cable', number: '916', category: '영화', ratings: '' },
			{ provider: '씨네프', main: 'cable', number: '103', category: '영화', ratings: '' },
			{ provider: '인디필름', main: 'cable', number: '105', category: '영화', ratings: '' },
			{ provider: 'BBS불교방송', main: 'cable', number: '903', category: '종교', ratings: '' },
			{ provider: 'BTN불교TV', main: 'cable', number: '52', category: '종교', ratings: '' },
			{ provider: 'CBS TV', main: 'cable', number: '156', category: '종교', ratings: '' },
			{ provider: 'CGN', main: 'cable', number: '688', category: '종교', ratings: '' },
			{ provider: 'GOODTV', main: 'cable', number: '293', category: '종교', ratings: '' },
			{ provider: '상생방송', main: 'cable', number: '779', category: '종교', ratings: '' },
			{ provider: 'Billiards TV', main: 'cable', number: '615', category: '레저', ratings: '' },
			{ provider: 'FISHING TV', main: 'cable', number: '254', category: '레저', ratings: '' },
			{ provider: 'FTV', main: 'cable', number: '262', category: '레저', ratings: '' },
			{ provider: 'ONT', main: 'cable', number: '402', category: '레저', ratings: '' },
			{ provider: 'Sky PetPARK', main: 'cable', number: '513', category: '레저', ratings: '' },
			{ provider: '마운틴TV', main: 'cable', number: '613', category: '레저', ratings: '' },
			{ provider: '브레인TV', main: 'cable', number: '488', category: '레저', ratings: '' },
			{ provider: '생활체육 TV', main: 'cable', number: '151', category: '레저', ratings: '' },
			{ provider: 'CTS 기독교TV', main: 'cable', number: '42', category: '교양', ratings: '' },
			{ provider: 'DOGTV', main: 'cable', number: '76', category: '교양', ratings: '' },
			{ provider: 'EDGE TV', main: 'cable', number: '104', category: '교양', ratings: '' },
			{ provider: 'KBS WORLD', main: 'cable', number: '559', category: '교양', ratings: '' },
			{ provider: 'MBCNET', main: 'cable', number: '764', category: '교양', ratings: '' },
			{ provider: 'RTV', main: 'cable', number: '175', category: '교양', ratings: '' },
			{ provider: 'SAFE TV', main: 'cable', number: '416', category: '교양', ratings: '' },
			{ provider: 'Sky ICT', main: 'cable', number: '568', category: '교양', ratings: '' },
			{ provider: 'Sky Travel', main: 'cable', number: '94', category: '교양', ratings: '' },
			{ provider: 'SkyA&C', main: 'cable', number: '514', category: '교양', ratings: '' },
			{ provider: 'arirang', main: 'cable', number: '50', category: '교양', ratings: '' },
			{ provider: 'tbsTV', main: 'cable', number: '495', category: '교양', ratings: '' },
			{ provider: '리빙TV', main: 'cable', number: '28', category: '교양', ratings: '' },
			{ provider: '메디컬TV', main: 'cable', number: '185', category: '교양', ratings: '' },
			{ provider: '채널 해피독', main: 'cable', number: '136', category: '교양', ratings: '' },
			{ provider: '헬스메디tv', main: 'cable', number: '415', category: '교양', ratings: '' },
			{ provider: 'EBS English', main: 'cable', number: '777', category: '교육', ratings: '' },
			{ provider: 'EBS플러스1', main: 'cable', number: '113', category: '교육', ratings: '' },
			{ provider: 'EBS플러스2', main: 'cable', number: '114', category: '교육', ratings: '' },
			{ provider: 'EduKids TV', main: 'cable', number: '508', category: '교육', ratings: '' },
			{ provider: 'JEI English TV', main: 'cable', number: '289', category: '교육', ratings: '' },
			{ provider: 'OUN', main: 'cable', number: '47', category: '교육', ratings: '' },
			{ provider: '일자리방송', main: 'cable', number: '811', category: '교육', ratings: '' },
			{ provider: '한국직업방송', main: 'cable', number: '79', category: '교육', ratings: '' },
			{ provider: 'EBS U', main: 'cable', number: '723', category: '어린이', ratings: '' },
			{ provider: 'JEI 재능TV', main: 'cable', number: '23', category: '어린이', ratings: '' },
			{ provider: 'Nickelodeon', main: 'cable', number: '685', category: '어린이', ratings: '' },
			{ provider: '대교어린이TV', main: 'cable', number: '17', category: '어린이', ratings: '' },
			{ provider: 'KBS N Life', main: 'cable', number: '168', category: '다큐', ratings: '' },
			{ provider: 'channel J', main: 'cable', number: '290', category: '다큐', ratings: '' },
			{ provider: '내셔널지오그래픽채널', main: 'cable', number: '119', category: '다큐', ratings: '' },
			{ provider: '리얼TV', main: 'cable', number: '669', category: '다큐', ratings: '' },
			{ provider: '사이언스TV', main: 'cable', number: '792', category: '다큐', ratings: '' },
			{ provider: '채널 뷰', main: 'cable', number: '918', category: '다큐', ratings: '' },
			{ provider: '환경TV', main: 'cable', number: '29', category: '다큐', ratings: '' },
			{ provider: '국방TV', main: 'cable', number: '698', category: '공공', ratings: '' },
			{ provider: '국회방송', main: 'cable', number: '427', category: '공공', ratings: '' },
			{ provider: '법률방송', main: 'cable', number: '812', category: '공공', ratings: '' },
			{ provider: '복지TV', main: 'cable', number: '707', category: '공공', ratings: '' },

			{ provider: 'HD OCN', main: 'skylife', number: '847', category: '영화', ratings: '' },
			{ provider: 'HD XTM', main: 'skylife', number: '282', category: '영화', ratings: '' },
			{ provider: 'HD 채널CGV', main: 'skylife', number: '163', category: '영화', ratings: '' },
			{ provider: 'HD CNTV', main: 'skylife', number: '83', category: '영화', ratings: '' },
			{ provider: 'HD Mplex', main: 'skylife', number: '971', category: '영화', ratings: '' },
			{ provider: 'THE MOVIE', main: 'skylife', number: '165', category: '영화', ratings: '' },
			{ provider: '코미디TV', main: 'skylife', number: '100', category: '연예,오락', ratings: '' },
			{ provider: 'HD I.NET', main: 'skylife', number: '57', category: '연예,오락', ratings: '' },
			{ provider: 'HD KBS JOY', main: 'skylife', number: '968', category: '연예,오락', ratings: '' },
			{ provider: 'HD MBC 에브리원', main: 'skylife', number: '58', category: '연예,오락', ratings: '' },
			{ provider: 'HD SBS funE', main: 'skylife', number: '858', category: '연예,오락', ratings: '' },
			{ provider: 'HD Sky ENT', main: 'skylife', number: '970', category: '연예,오락', ratings: '' },
			{ provider: 'HD tvN', main: 'skylife', number: '60', category: '연예,오락', ratings: '' },
			{ provider: 'AXN', main: 'skylife', number: '679', category: '드라마', ratings: '' },
			{ provider: 'HD Asia N2', main: 'skylife', number: '976', category: '드라마', ratings: '' },
			{ provider: 'HD KBS드라마', main: 'skylife', number: '910', category: '드라마', ratings: '' },
			{ provider: 'HD MBC 드라마', main: 'skylife', number: '857', category: '드라마', ratings: '' },
			{ provider: 'HD SBS플러스', main: 'skylife', number: '767', category: '드라마', ratings: '' },
			{ provider: 'HD 텔레노벨라', main: 'skylife', number: '61', category: '드라마', ratings: '' },
			{ provider: 'Hero Action', main: 'skylife', number: '915', category: '드라마', ratings: '' },
			{ provider: 'CNN US HD', main: 'skylife', number: '527', category: '뉴스,경제', ratings: '' },
			{ provider: 'HD YTN', main: 'skylife', number: '551', category: '뉴스,경제', ratings: '' },
			{ provider: 'HD 아시아경제TV', main: 'skylife', number: '482', category: '뉴스,경제', ratings: '' },
			{ provider: 'HD 한국경제TV', main: 'skylife', number: '171', category: '뉴스,경제', ratings: '' },
			{ provider: '매일경제TV', main: 'skylife', number: '594', category: '뉴스,경제', ratings: '' },
			{ provider: 'HD AniBox', main: 'skylife', number: '84', category: '만화', ratings: '' },
			{ provider: 'HD Aniplus', main: 'skylife', number: '348', category: '만화', ratings: '' },
			{ provider: 'HD 디즈니주니어', main: 'skylife', number: '504', category: '만화', ratings: '' },
			{ provider: 'HD 디즈니채널', main: 'skylife', number: '503', category: '만화', ratings: '' },
			{ provider: 'HD 애니원TV', main: 'skylife', number: '56', category: '만화', ratings: '' },
			{ provider: 'HD 투니버스', main: 'skylife', number: '526', category: '만화', ratings: '' },
			{ provider: 'HD CJ오쇼핑2', main: 'skylife', number: '975', category: '홈쇼핑', ratings: '' },
			{ provider: 'HD GS SHOP', main: 'skylife', number: '497', category: '홈쇼핑', ratings: '' },
			{ provider: 'HD NS홈쇼핑', main: 'skylife', number: '496', category: '홈쇼핑', ratings: '' },
			{ provider: 'HD 롯데홈쇼핑', main: 'skylife', number: '278', category: '홈쇼핑', ratings: '' },
			{ provider: 'HD 현대홈쇼핑', main: 'skylife', number: '493', category: '홈쇼핑', ratings: '' },
			{ provider: 'HD Channel J', main: 'skylife', number: '973', category: '다큐', ratings: '' },
			{ provider: 'HD Nat Geo Wild', main: 'skylife', number: '63', category: '다큐', ratings: '' },
			{ provider: 'HD FTV2', main: 'skylife', number: '969', category: '레저', ratings: '' },
			{ provider: 'HD 바둑TV', main: 'skylife', number: '164', category: '레저', ratings: '' },
			{ provider: 'NOLL TV', main: 'skylife', number: '923', category: '레저', ratings: '' },
			{ provider: 'HD O tvN', main: 'skylife', number: '555', category: '여성,패션', ratings: '' },
			{ provider: 'HD OnStyle', main: 'skylife', number: '553', category: '여성,패션', ratings: '' },
			{ provider: 'HD KBSN스포츠', main: 'skylife', number: '550', category: '스포츠', ratings: '' },
			{ provider: 'HD MBC스포츠 플러스', main: 'skylife', number: '911', category: '스포츠', ratings: '' },
			{ provider: 'HD SBS골프', main: 'skylife', number: '769', category: '스포츠', ratings: '' },
			{ provider: 'HD SBS스포츠', main: 'skylife', number: '977', category: '스포츠', ratings: '' },
			{ provider: 'IB sports', main: 'skylife', number: '515', category: '스포츠', ratings: '' },
			{ provider: 'SPOTV+', main: 'skylife', number: '713', category: '스포츠', ratings: '' },
			{ provider: 'HD KTV 국민방송', main: 'skylife', number: '409', category: '공공', ratings: '' },
			{ provider: 'HD MBCNET', main: 'skylife', number: '537', category: '교양', ratings: '' },
			{ provider: 'HD OBS W', main: 'skylife', number: '128', category: '교양', ratings: '' },
			{ provider: 'RTV2', main: 'skylife', number: '507', category: '교양', ratings: '' },
			{ provider: 'Sky Guide', main: 'skylife', number: '516', category: '교양', ratings: '' },
			{ provider: 'Sky Healing', main: 'skylife', number: '40', category: '교양', ratings: '' },
			{ provider: 'HD Mnet', main: 'skylife', number: '273', category: '음악', ratings: '' },
			{ provider: 'HD OBS2', main: 'skylife', number: '935', category: '지역지상파', ratings: '' },
			{ provider: 'KBS KIDS', main: 'skylife', number: '596', category: '어린이', ratings: '' }
		];

		this.saveChannelDB();
	}
}
