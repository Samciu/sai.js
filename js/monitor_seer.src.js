/**
 * monitor seer.
 * 监控脚本的先行者，写入在文档头部，准备好发现（包括早期的）脚本异常情况。
 *
 * @see http://www.errorstack.com/
 * @see http://damnit.jupiterit.com/
 *
 * @author 冒顿(闲耘™, @hotoo, hotoo.cn[AT]gmail.com)
 * @version 1.3, 2011/06/21
 */
window.monitor || (function(){
    var M = window.monitor = {};

    M.startTime = new Date();

    // 所有异常/错误信息都将 push 到这个队列中，待发送到服务端。
    M.errors = [];

    // JSniffer.
    // @see
    // http://msdn.microsoft.com/en-us/library/cc197053%28v=vs.85%29.aspx
    // http://stackoverflow.com/questions/2663701/firefox-window-onerror-event-problem-alerts-script-error-only
    // http://stackoverflow.com/questions/3092761/window-onerror-in-safari-javascript
    // http://www.quirksmode.org/dom/events/error.html
    //
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error/Stack
    // https://developer.mozilla.org/en/JavaScript/Reference/Statements/throw
    // https://developer.mozilla.org/en/JavaScript/Reference/Statements/try...catch
    window.onerror = function(m,f,l){
        // TODO: new Error().stack;
        M.errors.push({jsError:{msg:m, file:f, ln:l}});
        if("function" == typeof M.timedSend){M.timedSend();}
        // false: re-throw error, true: capture error.
        return false;
    }
})();