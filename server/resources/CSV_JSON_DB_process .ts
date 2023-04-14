/**
 * CSV to JSON to DB 과정
 * 1. 상장회사 상세검색 순회하며 회사와 종목 정보 저장. first.json 같은 형식
 *
 * 2. 전종목 기본정보 순회하며 남은 종목 정보 저장. second.json 같은 형식
 * (최종 : description과 website, founded_date은 undefined)
 *
 * 3. description, website, founded_date 기입
 */

// first.json
const company_info1 = {
	name: "AJ네트웍스",
	detailed_name: undefined,
	english_name: undefined,
	description: undefined,
	industry_name: "산업용 기계 및 장비 임대업",
	industry_code: 147603,
	capital: 46822295000,
	currency: "원(KRW)",
	fiscal_month: 12,
	ceo: "손삼달",
	main_phone: "02-6363-9999",
	address: "서울특별시 송파구 정의로8길 9 (문정동,AJ빌딩)",
	website: undefined,
	founded_date: undefined,
	stock_info: [
		{
			standard_code: undefined,
			stock_code: "095570",
			listing_date: undefined,
			face_value: "1000",
			listed_shares: "45252759",
			market_type: "KOSPI",
			stock_type: undefined,
			affiliation: null,
			security_type: undefined,
		},
	],
};

// second.json
const company_info2 = {
	name: "AJ네트웍스",
	detailed_name: "AJ네트웍스보통주",
	english_name: "AJ Networks Co.,Ltd.",
	description: undefined,
	industry_name: "산업용 기계 및 장비 임대업",
	industry_code: "147603",
	capital: 46822295000,
	currency: "원(KRW)",
	fiscal_month: 12,
	ceo: "손삼달",
	main_phone: "02-6363-9999",
	address: "서울특별시 송파구 정의로8길 9 (문정동,AJ빌딩)",
	website: undefined,
	founded_date: undefined,
	stock_info: [
		{
			standard_code: "KR7095570008",
			stock_code: "095570",
			listing_date: "2015/08/21", // Date 형식
			face_value: "1000", // null 가능
			listed_shares: 45252759,
			market_type: "KOSPI",
			stock_type: "보통주",
			affiliation: null,
			security_type: "주권",
		},
	],
};

// third.json
const company_info3 = {
	name: "AJ네트웍스",
	detailed_name: "AJ네트웍스보통주",
	english_name: "AJ Networks Co.,Ltd.",
	description: `동사가 영위하는 사업은 렌탈 사업부문, 창고 및 유통부문, 그리고 기타부문으로 구분됨.
        
        렌탈 사업부문에서 취급하는 상품은 파렛트, IT기기, 건설산업장비 등이 있음. IT솔루션기기는 사무실에서 사용하는 OA기기 뿐 아니라, 로봇 등 모바일기기에 이르기까지 다양한 품목을 취급 중임.
        
        연결종속회사인 베트남 현지법인 2개사를 통하여 베트남에서 냉장ㆍ냉동 창고임대업을 영위하고 있음.`,
	industry_name: "산업용 기계 및 장비 임대업",
	industry_code: "147603",
	capital: 46822295000,
	currency: "원(KRW)",
	fiscal_month: 12,
	ceo: "손삼달",
	main_phone: "02-6363-9999",
	address: "서울특별시 송파구 정의로8길 9 (문정동,AJ빌딩)",
	website: "https://ajnetworks.co.kr/",
	founded_date: "2000/02/10", // Date 형식
	stock_info: [
		{
			standard_code: "KR7095570008",
			stock_code: "095570",
			listing_date: "2015/08/21", // Date 형식
			face_value: "1000", // null 가능
			listed_shares: 45252759,
			market_type: "KOSPI",
			stock_type: "보통주",
			affiliation: null,
			security_type: "주권",
		},
	],
};
