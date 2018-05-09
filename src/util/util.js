import Vue from 'vue'
import patterns from '../config/regExps'

/**
 * 正则匹配各类文本
 *
 * @param {String/Number}   target	匹配文本
 * @param {String}			type	类型（tel/idNo/cnName）
 */
export const isType = (target, type) => {
	return typeof type === 'string' && patterns[type] && patterns[type].test(target);
}

 