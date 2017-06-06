namespace utl {
    export function comeToLobby() {
        let lobby = new Lobby;
        Laya.stage.addChild(lobby);
        return lobby;
    }
}