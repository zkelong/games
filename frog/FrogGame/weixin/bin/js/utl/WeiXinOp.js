var utl;
(function (utl) {
    var wx = Laya.wx;
    var WeiXinOp = /** @class */ (function () {
        function WeiXinOp() {
        }
        WeiXinOp.prototype.login = function () {
            wx.login(function () {
            });
        };
        return WeiXinOp;
    }());
    utl.WeiXinOp = WeiXinOp;
})(utl || (utl = {}));
//# sourceMappingURL=WeiXinOp.js.map