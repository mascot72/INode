import { resolve } from "path";

//main.ts
return reservedWork.checkWord
	.then(nemberFilter)
	.then(sessionFilter)
	.then(chattiFilter)
	.then(searchForDepartureFilter)
	.then(searchForDestinationFilter)
	.then(searchForBusFilter)
	.then(responseIntent)
	.thdn(response)
	.then(weatherIntent)
	.then(logging)
	.then(sendMessage)
	.catch(error);

//intent/searchForDepartureIntent.js
const searchForDepartureIntent = (payload) => {
	return new Promise((resolve, reject) => {
		if (payload.intent) {
			return resolve(payload);
		}
		pg.selectOfficeName(payload).then(res => {//1. 사업장 조회
			settingOffice(res)//2. 존재시 세팅	
				.then(responseToChatti)
				.then(resolve);
		})
		.catch(reject);
	});
}

//intent/searchForDestinationIntent.js
const searchForDestinationIntent = (payload) => {
	return new Promise((resolve, reject) => {
		if (payload.intent) {
			return resolve(payload);
		}
		pg.selectBusstopAndPlaceName(payload).then(res => {//1. 노선도,정류장 조회
			makeMarkdown(res)//2. 존재시 세팅	
				.then(responseToChatti)
				.then(resolve);
		})
		.catch(reject);
	});
}
function makeMarkdown(payload) {
	return '...';
}

//intent/searchForBusIntent.js
const searchForBusIntent = (payload) => {
	if (payload.intent) {
		return resolve(payload);
	}
	return new Promise((resolve, reject) => {
		pg.selectTimetable(payload).then(res => {//1. 시간표 조회
			makeMarkdown2(res)//2. 시간표 세팅	
				.then(responseToChatti)
				.then(resolve);
		})
		.catch(reject);
	});
}
function makeMarkdown2(payload) {
	return '...';
}

//filter/responseToChatti.js
function responseToChatti(payload) {
	//결과 전송
	return new Promise((resolve, reject) => {
		chatti.reAsk(responseData)
		.then(res => {
			if (payload.response) {	//3. 결과 정상 통과시,  실패시, 오류시
				res.entity = payload.response.response;
				res.intent = 'response';
				return resolve(res);
			}
			if (res.action) {	//4. 다음 수행 존재시 제어권 넘겨줌.
				res.intent = req.action.name;
				const intent = require(`./filter/${intent}`)
				return resolve(intent(res));
			}
			return reject();
						
		})
		.catch(reject);
	});
}