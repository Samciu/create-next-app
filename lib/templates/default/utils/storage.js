/*
 * web存储(localStorage/sessionStorage)工具库。
 * 该工具库统一存储的存储规范，具体规范如下：
 * 1、统一key值前缀：erc_pc_<xxxxx>，避免与其他应用的key值冲突。
 * 2、为实现对任何数据(number，string，array，object)进行持久化，该工具库使用以下数据格式对用户数据进行持久化。
 *  {
 *      type  // 用户要保持的数据的数据类型，
 *      value // 用户要保存的数据
 *  }
 * 
 *
 * @Date: 2017-09-28 12:09:00 
 */
'use strict';
const PREFIX = 'erc_pc_';
const DEFAULT_STORAGE = 'local';

/**
 * 获取存储对象。
 *
 * @param {string} type
 */
function getStorage(type) {
    return 'session' === type ? sessionStorage : localStorage;
}

/**
 * 生成带“erc_pc_”前缀的key。
 *
 * @param {string} key 用户自定key值。
 */
function createStorageKey(key) {
    return PREFIX + key;
}

/**
 * 生成持久化数据，具体操作如下：
 * 1、为了能将任何数据进行持久化，这里需要将用户数据格式化一下，具体格式如下：
 * {
 *      type  // 用户要保持的数据的数据类型，
 *      value // 用户要保存的数据
 *  }
 * 2、序列化数据。
 *
 *
 * @param {any} value 要保存的数据。
 */
function createStorageValue(value) {
    const storageValue = {
        type: typeof value,
        value,
    };

    return JSON.stringify(storageValue);
}

/**
 * 将用户数据保存到localStorage或者sessionStorage中。
 *
 * @param {string} key 索引
 * @param {any} value 要保存的数据。
 * @param {string} to 该参数用于指定将数据保存到localStoreage还是sessionStorage，默认保存到localStoreage。
 */
export function set(key, value, to = DEFAULT_STORAGE) {
    const storage = getStorage(to);
    const storageKey = createStorageKey(key);
    const storageValue = createStorageValue(value);

    try {
        storage.setItem(storageKey, storageValue);
    } catch (error) {
        console.warn(error.message, error.name, error.stack);
    }
}

/**
 * 通过索引(key)从localStorage或者sessionStorage获取对应的数据。
 *
 * @param {string} key  索引
 * @param {string} from 该参数用于指定是从localStorage还是sessionStorage中获取数据，默认保存到localStoreage。
 */
export function get(key, value, from = DEFAULT_STORAGE) {
    const storage = getStorage(from);
    const storageKey = createStorageKey(key);
    let storageValue = null;

    try {
        storageValue = storage.getItem(storageKey);
    } catch (error) {
        console.warn(error.message, error.name, error.stack);
    }

    return storageValue ? JSON.parse(storageValue).value : value;
}

/**
 * 从web存储中删除指定索引(key)对应的数据。
 *
 * @param {string} key 索引
 * @param {string} from 该参数用于指定是从localStorage还是sessionStorage中删除数据，默认保存到localStoreage。
 */
export function remove(key, from = DEFAULT_STORAGE) {
    const storage = getStorage(from);
    const storageKey = createStorageKey(key);

    try {
        storage.removeItem(storageKey);
    } catch (error) {
        console.warn(error.message, error.name, error.stack);
    }
}

export default {
    get,
    set,
    remove,
};
