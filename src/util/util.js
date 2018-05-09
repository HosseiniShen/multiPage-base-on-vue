import Vue from 'vue'
import {weeks as weeksMap, months as monthsMap} from '../config/date'
import patterns from '../config/regExps'

/**
 * 格式化数字（字符串）
 *
 * @param {Boolean} thousSeparate	货币千分位
 * @param {Number}  decimalSize		小数位
 */
String.prototype.formatNumber = Number.prototype.formatNumber = function (thousSeparate, decimalSize) {
	let num = parseFloat((this + '').replace(/[^eE\d\.\-]+/g, ''));
	num = Object.prototype.toString.apply(num) === '[object Number]' ? num : 0;
	num = num.toFixed(!!decimalSize ? decimalSize : 0);
	num += '';
	if (!!thousSeparate) {
		let matches = num.match(/^(-?(?:\d{1,2})??)((?:\d{3})*)((?:\.\d*)?)$/);
		if (!!matches) {
			num = matches[1].replace(/^(-?\d+)$/, (mathch) => {
				return mathch + (!!matches[2] ? ',' : '')
			}) + matches[2].replace(/\d{3}/g, (match, index) => {
				return (index === 0 ? '' : ',') + match
			}) + matches[3];
		}
	}
	return num;
}

/**
 * 非空校验
 *
 * @param {Any} input
 */
export const empty = (input) => {
	return (typeof input == 'undefined'
	 || !input
	 || /^\s*(null|0|undefined|false|no)\s*$/i.test(input) 
	 || (input instanceof Array && !input.length) 
	 || (typeof input == 'object' && ((!Object.keys(input).length) 
	 || (('length' in input) && !input.length))));
}

/**
 * 格式化日期
 *
 * @param {String/Number/Date}   date	日期
 * @param {String}				format	期望输出的日期格式
 */
export const dateFormat = (date, format) => {
	if (!date)
		return '';
	format = format || 'Y-m-d';
	let _date = new Date(date);
	let [year, month, day, weekDay, hours, minutes, seconds] = [_date.getFullYear() + '', (_date.getMonth() + 1) + '', _date.getDate() + '', _date.getDay() + '', _date.getHours() + '', _date.getMinutes() + '', _date.getSeconds() + '']
	let [monthEn, weekEn] = [_date.toUTCString().substr(8, 3), _date.toUTCString().substr(0, 3)];
	let weekDay_ISO8601 = (weekDay === '0') ? '7' : weekDay;
	return format.replace(/Y/g, year)//1970
		.replace(/y/g, year.slice(-2))//70
		.replace(/m/g, ('0' + month).slice(-2))//09
		.replace(/n/g, month)//9
		.replace(/M/g, monthEn)//Sep
		.replace(/F/g, monthsMap[monthEn].en)//September
		.replace(/\_F/g, monthsMap[monthEn].cn)//九
		.replace(/j/g, day)//9
		.replace(/d/g, ('0' + day).slice(-2))//09
		.replace(/D/g, weekEn)//Sun
		.replace(/l/g, weeksMap[weekEn].en)//Sunday
		.replace(/_l/g, weeksMap[weekEn].cn)//日
		.replace(/w/g, weekDay)//0
		.replace(/N/g, weekDay_ISO8601)//7
		.replace(/H/g, ('0' + hours).slice(-2))//06
		.replace(/G/g, hours)//6
		.replace(/i/g, ('0' + minutes).slice(-2))//06
		.replace(/s/g, ('0' + seconds).slice(-2));//06
}

/**
 * 正则匹配各类文本
 *
 * @param {String/Number}   target	匹配文本
 * @param {String}			type	类型（tel/idNo/cnName）
 */
export const isType = (target, type) => {
	return typeof type === 'string' && patterns[type] && patterns[type].test(target);
}

/**
 * 获取url search参数
 *
 * @param {String}   key
 */
export const getURLParameter = (key) => {
	return decodeURIComponent((new RegExp(`[?|&]${key}=([^&;]+?)(#|&|;|$)`, 'i').exec(window.location.search) || [,''])[1]) || null;
}

/**
 * 获取url search参数
 *
 * @param {String}   key
 */
export const makeTrackableURL = (url) => {
	let hash = '', search = '', currentSearch = window.location.search;
	let params = [], 
		resultParams = [];
	let [hashIndex, searchIndex] = [url.indexOf('#'), url.indexOf('?')];

	if (searchIndex > 0) {
		search = url.substr(searchIndex + 1);
		url = url.substr(0, searchIndex);
	}

	if (hashIndex > 0) {
		hash = url.substr(hashIndex);
		url = url.substr(0, hashIndex);
	}

	params.forEach((param) => {
		let reg = new RegExp(`[?|&]((${param})=([^&]+))(&|#|$)`, 'i');
		let match = reg.exec(currentSearch);
		if (match && reg.exec(search) === null) {
			if (match[1]) {
				resultParams.push(match[1]);
			}
		}
	});
	url += `?${search === '' ? '' : search + '&'}${resultParams.join('&')}${hash}`;
	return decodeURIComponent(url);
}

/**
 * 一般将特殊的组件挂载到body根结构下
 *
 * @param {Object}   component
 */
export const mountToBody = (component) => {
	if (typeof component !== 'object') {
		return false;
	}
	const Component = Vue.extend(component);
	let nodeObject = new Component();
	nodeObject.$mount();
	document.querySelector('body').appendChild(nodeObject.$el);
}

/**
 * 计算预产期
 *
 * @param {number}   period 月经周期
 * @param {string/number/date} dateTime  末次月经开始日期
 */
export const getExpectedDate = (dateTime,period)=> {
	var lastDay = dateTime;      
	if(!lastDay){
		var date = new Date();
		lastDay = date.getDate()+1;
	}else{
		var date = new Date(dateTime);
		lastDay = date.getDate();
	}
	let periodDay = parseInt(period||28);
	let day = lastDay + 280 + periodDay - 28;
	let time = date.setDate(day)
	return dateFormat(time)
 }
 