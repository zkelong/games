var utl;
(function (utl) {
    function comeToLobby() {
        var lobby = new Lobby;
        Laya.stage.addChild(lobby);
        return lobby;
    }
    utl.comeToLobby = comeToLobby;
})(utl || (utl = {}));
//# sourceMappingURL=utl.js.map