export default class Utils {
	constructor(props) {
		this.companyDB = {
			'samsung' : {
				name: '삼성',
				url: 'http://www.samsungcareers.com/rec/apply/ComResumeServlet?cmd=pstMain',
				imageURL: '/res/CI/samsung.png',
				category: 'TOP30'
			},
			'hyundaiMotors' : {
				name: '현대자동차',
				url: 'http://recruit.hyundai.com/hfront/Recruit.do?cmd=recInfoIndex&p_typegbn=r#',
				imageURL: '/res/CI/hyundaiMotors.png',
				category: 'TOP30'
			},
			'sk' : {
				name: 'SK',
				url: 'http://www.skcareers.com/POS/TRM2101.aspx',
				imageURL: '/res/CI/sk.png',
				category: 'TOP30'
			},
			'lg' : {
				name: 'LG',
				url: 'http://apply.lg.com/app/job/RetrieveJobNotices.rpi',
				imageURL: '/res/CI/lg.png',
				category: 'TOP30'
			},
			'lotte' : {
				name: '롯데',
				url: 'http://job.lotte.co.kr/LotteRecruit/Recruit_Info/RecruitList.aspx?regtype=&nowpage=1&keyword=&keyselect=99999',
				imageURL: '/res/CI/lotte.png',
				category: 'TOP30'
			},
			'posco' : {
				name: '포스코',
				url: 'http://gorecruit.posco.net/H22/H22010/h220101010.do?ServiceName=h220101010-service&find=1',
				imageURL: '/res/CI/posco.png',
				category: 'TOP30'
			},
			'hanwha' : {
				name: '한화',
				url: 'http://www.hanwhain.com/web/apply/notification/list.do',
				imageURL: '/res/CI/hanwha.png',
				category: 'TOP30'
			},
			'hyundaiHeavyIndustries' : {
				name: '현대중공업',
				url: 'https://recruit.hhi.co.kr/RECRUIT_HHI/hr/rec/recruit/jobopen/controller/candidate/JobOpen310WebController/init.hr',
				imageURL: '/res/CI/hyundaiHeavyIndustries.png',
				category: 'TOP30'
			},
			'shinsegae' : {
				name: '신세계',
				url: 'http://job.shinsegae.com/recruit_info/notice/notice01_list.jsp',
				imageURL: '/res/CI/shinsegae.png',
				category: 'TOP30'
			},
			'kt' : {
				name: 'KT',
				url: 'https://recruit.kt.com/Emp001c_s00.do',
				imageURL: '/res/CI/kt.png',
				category: 'TOP30'
			},
			'doosan' : {
				name: '두산',
				url: 'https://career.doosan.com/dsp/sa/RecList.jsp',
				imageURL: '/res/CI/doosan.png',
				category: 'TOP30'
			},
			'cj' : {
				name: 'CJ',
				url: 'http://recruit.cj.net/recruit/ko/recruit/recruit/list.fo?pager.offset=0&pageNo=1&company=&zz_job_cd=&zz_title=&zz_target_1=',
				imageURL: '/res/CI/cj.png',
				category: 'TOP30'
			},
			'booyoung' : {
				name: '부영',
				url: 'https://www.booyoung.co.kr/recruit/recruit_tab1.htm',
				imageURL: '/res/CI/booyoung.png',
				category: 'TOP30'
			},
			'ls' : {
				name: 'LS',
				url: 'http://www.lsholdings.com/recruit/recruit_notice.asp',
				imageURL: 'res/CI/defaultCI.png',
				category: 'TOP30'
			},
			'daewooShipbuilding' : {
				name: '대우조선해양',
				url: 'http://recruit.dsme.co.kr/recruit/fr/main.do#?RightMenuId=RL&ApplyStep=&CurrentRrNo=&CurrentCourseCode=&CurrentTopIndex=',
				imageURL: 'res/CI/defaultCI.png',
				category: 'TOP30'
			},
			'kumhoAsiana' : {
				name: '금호아시아나',
				url: 'https://career.kumhoasiana.com:4433/jobinfo/',
				imageURL: 'res/CI/defaultCI.png',
				category: 'TOP30'
			},
			'hyundaiDepartmentStore' : {
				name: '현대백화점그룹',
				url: 'https://recruit.ehyundai.com/recruit-info/announcement/list.nhd',
				imageURL: '/res/CI/defaultCI.png',
				category: 'TOP30'
			},
			'soil' : {
				name: 'S-OIL',
				url: 'https://s-oil.scout.co.kr/jobinfo/',
				imageURL: '/res/CI/defaultCI.png',
				category: 'TOP30'
			},
			'nhnent' : {
				name: 'NHNent',
				url: 'http://recruit.nhnent.com/ent/recruitings?type=company',
				imageURL: '/res/CI/nhnent.png',
				category: 'IT'
			},
			'neowiz' : {
				name: '네오위즈',
				url: 'https://recruit.neowiz.com/jobOpening/list.nwz',
				imageURL: '/res/CI/neowiz.png',
				category: 'IT'
			},
			'neople' : {
				name: '네오플',
				url: 'https://career.nexon.com/user/recruit/notice/noticeList?joinCorp=NO',
				imageURL: '/res/CI/neople.png',
				category: 'IT'
			},
			'naver' : {
				name: '네이버',
				url: 'http://recruit.navercorp.com/naver/job/list/developer?locationCd=&entTypeCd=&searchTxt=',
				imageURL: '/res/CI/naver.png',
				category: 'IT'
			},
			'nexon' : {
				name: '넥슨',
				url: 'https://career.nexon.com/user/recruit/notice/noticeList?joinCorp=NX',
				imageURL: '/res/CI/nexon.png',
				category: 'IT'
			},
			'nexonGT' : {
				name: '넥슨GT',
				url: 'https://career.nexon.com/user/recruit/notice/noticeList?joinCorp=GH',
				imageURL: '/res/CI/nexonGT.png',
				category: 'IT'
			},
			'netmarble' : {
				name: '넷마블',
				url: 'https://www.netmarble.com/rem/www/noticelist.jsp',
				imageURL: '/res/CI/netmarble.png',
				category: 'IT'
			},
			'lineplus' : {
				name: '라인플러스',
				url: 'http://recruit.linepluscorp.com/lineplus/career/list?classId=&entTypeCd=&page=1',
				imageURL: '/res/CI/lineplus.png',
				category: 'IT'
			},
			'appleKorea' : {
				name: '애플코리아',
				url: 'https://jobs.apple.com/kr/search?jobFunction=SFWEG#function&t=0&sb=req_open_dt&so=1&j=AIS|CSPSV|ADMCL|DES|RET|MKTPM|AOS|LEGAL|FACLT|SFWEG|MTLMF|HURES|CGINT|FINAN|MIS|PMN|SALES|HDWEG&lo=0*KOR&pN=0',
				imageURL: '/res/CI/appleKorea.png',
				category: 'IT'
			},
			'ncsoft' : {
				name: '엔씨소프트',
				url: 'https://recruit.ncsoft.net/korean/careers/adoptionsection.aspx',
				imageURL: '/res/CI/ncsoft.png',
				category: 'IT'
			},
			'wemade' : {
				name: '위메이드',
				url: 'https://jobs.wemade.com/main',
				imageURL: '/res/CI/wemade.png',
				category: 'IT'
			},
			'wemakeprice' : {
				name: '위메프',
				url: 'https://recruit.wemakeprice.com/notice/list',
				imageURL: '/res/CI/wemakeprice.png',
				category: 'IT'
			},
			'ebayKorea' : {
				name: '이베이코리아',
				url: 'https://recruit.ebaykorea.com/jobinfo',
				imageURL: '/res/CI/ebayKorea.png',
				category: 'IT'
			},
			'kakao' : {
				name: '카카오',
				url: 'https://careers.kakao.com/jobs?page=1',
				imageURL: '/res/CI/kakao.png',
				category: 'IT'
			},
			'coupang' : {
				name: '쿠팡',
				url: 'https://boards.greenhouse.io/coupang1?gh_src=kqxsb2#.WU0q9B8xDCI',
				imageURL: '/res/CI/coupang.png',
				category: 'IT'
			},
			'tmon' : {
				name: '티몬',
				url: 'https://recruit.ticketmonster.co.kr/recruit/list/000#page=1',
				imageURL: '/res/CI/tmon.png',
				category: 'IT'
			}
		};
		this.getUrl = this.getUrl.bind(this);
		this.getCompanyDB = this.getCompanyDB.bind(this);
	}

	getCompanyDB() {
		return this.companyDB;
	}

	getUrl(company) {
		let url = this.companyDB[company].url;
		if(url === undefined) {
			return 'error';
		}
		return url;
	}
}
