
(function(global, Sai){

  if(!Sai){return;}

  // var DEFAULT_PROFILE = "jserror";
  // var MAX_STACKTRACE_DEEP = 20;
  // var RE_FUNCTION = /^\s*function\b[^\)]+\)/;

  // var lost_resources = [];
  // var lost_resources_cache = {};

  // 自定义属性接口。
  Sai.set = function(key,val){
    Sai.attrs[key] = val;
    return Sai;
  };

  Sai.get = function(key){
    return monitor.attrs[key] || null;
  }

  // 性能收集
  window.addEventListener('load', function() {
      var data = {};

      // 浏览器信息
      var screen = window.screen;
      data.sr = screen.width + 'x' + screen.height;

      var viewportSize = [];
      var bodySize = body.clientWidth && body.clientHeight;
      if (documentElement && documentElement.clientWidth && documentElement.clientHeight &&
          ('CSS1Compat' === document.compatMode || !bodySize)) {
          viewportSize = [documentElement.clientWidth, documentElement.clientHeight];
      } else if (body.clientHeight) {
          viewportSize = [body.clientWidth, body.clientHeight];
      }
      data.vp = viewportSize[0] <= 0 || viewportSize[1] <= 0 ? '' : viewportSize.join('x');
      data.sd = screen.colorDepth + '-bit';
      data.de = navigator.characterSet || navigator.charset;
      data.ul = (navigator.language || navigator.browserLanguage || '')['toLowerCase']();

      // 收集页面性能
      var performance = window.performance || window.webkitPerformance;

      if (!!performance && !!performance.timing) {
          var pt = performance.timing;
          var navigationStart = pt.navigationStart;
          if (!!navigationStart) {
              // 域名解析的耗时
              data.dns = pt.domainLookupEnd - pt.domainLookupStart;
              // TCP连接的耗时
              data.conn = pt.connectEnd - pt.connectStart;
              // 发出HTTP请求后，收到（或从本地缓存读取）第一个字节时响应耗时
              data.req = pt.responseStart - pt.requestStart;
              // 从服务器下载内容耗时
              data.res = pt.responseEnd - pt.responseStart;
              // 使用HTTP请求读取文档时
              data.fetch = pt.fetchStart - navigationStart;
              // DOM结构结束解析、开始加载内嵌资源
              data.dia = pt.domInteractive - navigationStart;
              // 脚本执行完成时
              data.intr = pt.domContentLoadedEventEnd - navigationStart;
              // load事件的回调函数结束时
              data.loe = pt.loadEventEnd - navigationStart;
          }
      }

      // send('http://w.zuzuche.com/collect.php', data);
      send(Sai.server,data);
  }, false);

})(this, this.Sai);
