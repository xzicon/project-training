let rootUrl = 'https://www.fastmock.site/mock/44b1f4897024b156e61512b5d674844c/api'
let root = 'http://116.62.14.0:8402'
let myFetch = {
    get(url,queryParams){
        url = rootUrl+url
        if(queryParams){
            url += "?"+queryString.stringify(queryParams);
        }
        console.log(url);
        return fetch(url)
        .then(res=>res.json())

    },
    get1(url){
        url = root+url
        return fetch(url)
        .then(res=>res.json())
    },
    post(url,body){
        return fetch(rootUrl+url,{
            method:'POST',
            headers:{
                "Accept":'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        })
            .then(res=>res.json())
    }
}
export {myFetch}