
var storage={
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    get(key){
        return JSON.parse(localStorage.getItem(key));
    },remove(key){
        localStorage.removeItem(key)
    }
};
// 暴露出去，供外部使用
export default storage;