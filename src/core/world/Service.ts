import Extent from './Extent';

export default class Service {
  static jsonp(url: string, callback: (response: any) => void, callbackParameterName: string = "cb"): () => void {
    var callbackName = `webglobe_callback_` + Math.random().toString().substring(2);
    if (url.indexOf('?') < 0) {
      url += '?';
    } else {
      url += '&';
    }
    url += `${callbackParameterName}=window.${callbackName}`;
    var scriptElement = document.createElement("script");
    scriptElement.setAttribute("src", url);
    scriptElement.setAttribute("async", "true");
    scriptElement.setAttribute("defer", "true");
    document.body.appendChild(scriptElement);
    var canceled = false;

    function clear() {
      delete (<any>window)[callbackName];
      scriptElement.src = "";
      if (scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
      scriptElement = null;
    }

    (<any>window)[callbackName] = function (response: any) {
      if (!canceled) {
        callback(response);
      }
      clear();
    }

    return function () {
      canceled = true;
      clear();
    };
  }

  static location() {
    const promise = new Promise(function (resolve) {
      const url = "http://apis.map.qq.com/jsapi?qt=gc&output=jsonp";
      console.time("location");
      Service.jsonp(url, function (response: any) {
        console.timeEnd("location");
        console.log(`定位：`, response);
        if(response.detail){
          let info = {
            lon: parseFloat(response.detail.pointx),
            lat: parseFloat(response.detail.pointy)
          };
          resolve(info);
        }else{
          resolve(null);
        }
      });
    });
    return promise;
  }

  //http://lbs.qq.com/javascript_v2/case-run.html#service-searchservice
  static searchByExtent(keyword: string, level: number, { minLon, minLat, maxLon, maxLat }: Extent, pageCapacity: number = 50, pageIndex: number = 0) {
    const promise = new Promise(function (resolve) {
      const url = `//apis.map.qq.com/jsapi?qt=syn&wd=${keyword}&pn=${pageIndex}&rn=${pageCapacity}&output=jsonp&b=${minLon},${minLat},${maxLon},${maxLat}&l=${level}&c=000000`;
      Service.jsonp(url, function (response: any) {
        resolve(response);
      });
    });
    return promise;
  }

  static searchNearby(keyword: string, lon: number, lat: number, radius: number = 1000, pageCapacity: number = 50, pageIndex: number = 0) {
    const promise = new Promise(function (resolve) {
      //http://apis.map.qq.com/jsapi?qt=rn&wd=酒店&pn=0&rn=5&px=116.397128&py=39.916527&r=2000&output=jsonp&cb=webglobe_jsonp_1
      const url = `//apis.map.qq.com/jsapi?qt=rn&wd=${keyword}&pn=${pageIndex}&rn=${pageCapacity}&px=${lon}&py=${lat}&r=${radius}&output=jsonp`;
      Service.jsonp(url, function (response: any) {
        resolve(response);
      });
    });
    return promise;
  }

  // static route(from:string, to:string){

  // }
};