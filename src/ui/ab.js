import { handler, string2RGB, platformSvg, msgbox,translate,is_win,OS } from "./common.js";
import { app, formatId, createNewConnect,svg_menu } from "./index.js";  // TODO check app obj
// TODO transform
const svg_tile = <svg id="session-tile" viewBox="0 0 158.6 158.6"><path style="stroke-width:.309756" d="M5.4 157.7c-1-.3-2-1-3.2-2.1-2.8-2.8-2.6-1-2.5-32 0-26.7 0-27 .7-28.3a9.3 9.3 0 0 1 4-4.2c1.2-.6 2.3-.6 29-.7 27.5 0 27.6 0 29.1.6.8.4 2 1.2 2.7 2 2.4 2.5 2.3.7 2.2 31.6-.1 26.5-.1 27.6-.7 28.8a9.3 9.3 0 0 1-4.2 4c-1.4.6-1.6.6-28.5.7a235 235 0 0 1-28.6-.4zm91 0a8.5 8.5 0 0 1-5.7-5.4c-.2-.7-.3-8.3-.3-28.3V96.7l.7-1.6a8.9 8.9 0 0 1 4.6-4.3c1.2-.4 3.8-.5 28.9-.4 26.6.1 27.6.1 28.8.7 1.6.8 3.2 2.5 4 4.2.7 1.4.7 1.6.7 28.3.1 31 .3 29.2-2.5 32-2.8 2.7-1 2.6-31.4 2.6-21.4 0-26.8-.1-27.9-.5zM5.3 67a8.7 8.7 0 0 1-4-3C-.5 61.6-.5 62.3-.5 33.6-.4 3.2-.5 5 2.2 2.2 5-.6 3.2-.4 34.2-.3c26.7 0 27 0 28.3.7 1.7.8 3.4 2.4 4.2 4 .6 1.2.6 2.2.7 28.8 0 25.1 0 27.7-.4 29a9 9 0 0 1-4.3 4.5l-1.6.7H33.7c-20.2 0-27.7-.1-28.4-.4Zm89.8-.3a9 9 0 0 1-4.3-4.6c-.5-1.2-.5-3.8-.5-28.9.1-26.6.2-27.6.7-28.8a9.3 9.3 0 0 1 4.2-4c1.4-.7 1.6-.7 28.3-.7 31-.1 29.2-.3 32 2.5 2.8 2.8 2.6 1 2.5 32 0 26.7 0 26.9-.7 28.3a9.3 9.3 0 0 1-4 4.2c-1.2.5-2.2.6-29 .6l-27.7.1z" transform="translate(.4 .4)" /></svg>;
const svg_list = <svg id="session-list" viewBox="0 0 246.8 185.8"><path style="stroke-width:.482473" d="M-69.2 102.7A16.5 16.5 0 0 1-67 70.4c7.3-1 15 4 17.3 11 1 3 1 8 0 10.8a16.7 16.7 0 0 1-19.5 10.5zm53-3.4a12.3 12.3 0 0 1-7-16.8c1.3-3 3.1-4.7 6-6 2.2-1 2.8-1 87.2-1 92.4 0 87-.2 90.6 2.6.9.7 2.2 2.4 3 3.7 1.2 2.2 1.4 3.1 1.4 6 0 4.8-2.3 8.6-6.8 11l-1.9 1-85.2.1c-71.9 0-85.5 0-87.3-.6zm-53.5-73c-4.7-1.5-8.6-5-10.6-9.1-1.8-4-1.8-9.8 0-13.7 1.6-3.3 4.4-6.2 7.8-8 2.2-1.2 3-1.3 7.1-1.3 4 0 5 .1 7.3 1.3a16.6 16.6 0 0 1 0 29.6c-2 1-3.4 1.4-6.5 1.5-2.2 0-4.5 0-5.1-.3zm52.3-4.8c-2.4-1.1-5.3-4-6.2-6.5-1-2.4-1-7.3.1-9.7.5-1.1 1.8-2.8 2.8-3.8 3.7-3.5-4-3.2 91-3.2h85.5l2.5 1.1a12 12 0 0 1 0 21.8l-2.5 1.2H70.2c-82.5 0-85.7 0-87.6-1zm-52.1-71.6a18 18 0 0 1-10-7.7 17 17 0 0 1-.7-15c2.3-5 5.8-7.9 11.4-9.3 9-2.3 18.3 4 19.8 13.4a16.4 16.4 0 0 1-15.2 19c-2.1.1-4.1 0-5.3-.4zm52.1-5.9c-1.3-.6-3-1.7-3.7-2.5-4.7-5-4.2-13.7 1-18 3.7-3.1-1.8-3 91.5-2.8l84.9.1 2 1a12 12 0 0 1 6.7 11c0 3-.2 3.9-1.4 6-.8 1.4-2.1 3-3 3.8-3.7 2.7 1.8 2.6-90.6 2.6h-85l-2.4-1.2z" transform="translate(81.7 82.6)" /></svg>;
const search_icon = <svg viewBox="0 0 655.278 655.024"><g transform="translate(-24.497 -195.01)"><path d="m649.96 847.92c-2.9592-1.3629-27.183-24.243-63.36-59.846-32.213-31.702-70.814-69.663-85.78-84.357l-27.21-26.717-4.7897 3.5287c-66.337 48.872-145.32 66.878-224.31 51.138-72.966-14.539-136.58-58.184-178.47-122.44-15.945-24.462-30.723-61.471-36.413-91.191-8.9404-46.696-6.2422-90.39 8.3388-135.04 13.39-41.003 34.756-75.42 66.479-107.09 74.506-74.377 183.71-99.89 284.22-66.397 62.352 20.777 117.67 65.579 150.79 122.12 38.716 66.101 46.59 147.55 21.43 221.66-9.9038 29.171-29.788 63.725-49.916 86.743l-7.0583 8.0717 3.0992 2.919c1.7046 1.6054 40.675 39.928 86.602 85.161 89.007 87.664 87.558 86.034 85.619 96.293-1.2888 6.8209-5.2313 12.041-11.321 14.989-6.7901 3.287-11.55 3.4093-17.952 0.46117zm-316.64-154.63c32.373-5.0481 61.075-15.115 86.553-30.358 47.942-28.683 83.505-72.09 100.89-123.14 35.043-102.91-6.4362-214.07-100.89-270.37-52.514-31.302-117.76-40.564-178.06-25.277-81.183 20.579-145.19 82.918-166.86 162.52-5.5757 20.478-7.445 35.423-7.445 59.52s1.8693 39.042 7.445 59.52c21.409 78.63 85.366 141.52 164.81 162.05 29.22 7.5511 66.493 9.756 93.564 5.5347z" stroke-width="1.28" /></g></svg>;
const clear_icon = <svg viewBox="0 0 478.94 479.03"><path d="M217.488 478.45c-30.264-3.146-55.348-10.265-82.714-23.477C62.54 420.1 14.214 353.763 1.824 272.463c-2.412-15.82-2.434-50.027-.043-66.058 16.004-107.32 97.008-188.28 204.71-204.6 14.33-2.172 49.054-2.447 63-.498C323.95 8.915 371.3 32.2 409.03 69.927c37.697 37.698 61.125 85.349 68.605 139.54 1.943 14.08 1.68 48.804-.478 63-6.616 43.533-24.01 83.859-50.468 117-37.556 47.046-92.812 78.608-153.26 87.54-12.553 1.855-44.144 2.671-55.936 1.445zm42.144-32.045c15.649-1.602 29.895-4.63 44.856-9.531 78.146-25.604 133.49-94.718 141.94-177.26 6.245-60.993-16.1-123.3-59.94-167.14-55.797-55.797-139.4-75.365-213.52-49.98-77.69 26.609-131.51 94.14-140.42 176.19-4.761 43.843 6.392 91.899 30.274 130.44 41.468 66.926 119.01 105.26 196.82 97.29zm-138.69-80.346c-4.096-1.784-8.225-6.874-9.022-11.123-1.676-8.935-3.495-6.761 52.877-63.221l52.17-52.25-52.17-52.25c-56.544-56.632-54.56-54.249-52.834-63.451.924-4.923 6.905-10.904 11.828-11.828 9.201-1.726 6.819-3.71 63.451 52.834l52.25 52.169 52.25-52.169c56.632-56.544 54.25-54.56 63.451-52.834 4.923.923 10.904 6.905 11.828 11.828 1.726 9.201 3.71 6.818-52.834 63.451l-52.169 52.25 52.17 52.25c56.543 56.632 54.56 54.249 52.833 63.451-.923 4.923-6.905 10.904-11.828 11.828-9.201 1.726-6.818 3.71-63.455-52.838l-52.255-52.173-51.745 51.696c-28.496 28.469-53.01 52.166-54.56 52.742-3.766 1.4-8.515 1.26-12.234-.36z" /></svg>;

function getSessionsStyleOption(type) {
    return (type || "recent") + "-sessions-style";
}

export function getSessionsStyle(type) {
    var v = handler.xcall("get_local_option",getSessionsStyleOption(type));
    if (!v) v = type == "ab" ? "list" : "tile";
    return v;
}

var searchPatterns = {};

export class SearchBar extends Element {

    this(props) {
        this.type = (props || {}).type || "";
    }

    render() {

        let value = searchPatterns[this.type] || "";
        setTimeout(() => { this.$("input").value = value; }, 1);
        return (<div class="search-id" >
            <span class="search-icon">{search_icon}</span>
            <input type="text" novalue={translate("Search ID")} />
            {value && <span class="clear-input">{clear_icon}</span>}
        </div>);
    }

    ["on click at span.clear-input"](_) {
        this.$("input").value = '';
        this.onChange('');
    }

    ["on change at input"](_, el) {
        this.onChange(el.value.trim());
    }

    onChange(v) {
        searchPatterns[this.type] = v;
        app.multipleSessions.update();
    }
}

export class SessionStyle extends Element {
    type = "";

    this(props) {
        this.type = (props || {}).type || "";
    }

    render() {
        let sessionsStyle = getSessionsStyle(this.type);
        return (<div class="sessions-tab" style="margin-left: 0.5em;">
            <span class={sessionsStyle == "tile" ? "active" : "inactive"}>{svg_tile}</span>
            <span class={sessionsStyle != "tile" ? "active" : "inactive"}>{svg_list}</span>
        </div>);
    }

    ["on click at span.inactive"](_) {
        let option = getSessionsStyleOption(this.type);
        let sessionsStyle = getSessionsStyle(this.type);
        handler.xcall("set_option", option, sessionsStyle == "tile" ? "list" : "tile");
        app.componentUpdate();
    }
}

export class SessionList extends Element {
    sessions = [];
    type = "";
    style;


    this(props) {
        this.sessions = props.sessions;
        this.type = props.type;
        this.style = getSessionsStyle(props.type);
    }

    getSessions() {
        let p = searchPatterns[this.type];
        if (!p) return this.sessions;
        let tmp = [];
        this.sessions.map( (s) => {
            let name = s[4] || s.alias || s[0] || s.id || "";
            if (name.indexOf(p) >= 0) tmp.push(s);
        });
        return tmp;
    }

    render() {
        let sessions = this.getSessions();
        if (sessions.length == 0) return <div style="margin: *; font-size: 1.6em;">{translate("Empty")}</div>;
        sessions = sessions.map((x) => this.getSession(x));
        return <div class="recent-sessions-content" key={sessions.length} >
            <popup>
                <menu class="context" id="remote-context">
                    <li id="connect">{translate('Connect')}</li>
                    <li id="transfer">{translate('Transfer File')}</li>
                    <li id="tunnel">{translate('TCP Tunneling')}</li>
                    <li id="rdp">RDP</li>
                    <div class="separator" />
                    <li id="rename">{translate('Rename')}</li>
                    {this.type != "fav" && <li id="remove">{translate('Remove')}</li>}
                    {is_win && <li di="shortcut">{translate('Create Desktop Shortcut')}</li>}
                    <li id="forget-password">{translate('Unremember Password')}</li>
                    {(!this.type || this.type == "fav") && <li id="add-fav">{translate('Add to Favorites')}</li>}
                    {(!this.type || this.type == "fav") && <li id="remove-fav">{translate('Remove from Favorites')}</li>}
                </menu>
            </popup>
            {sessions}
        </div >;
    }

    getSession(s) {
        let id = s[0] || s.id || "";
        let username = s[1] || s.username || "";
        let hostname = s[2] || s.hostname || "";
        let platform = s[3] || s.platform || "";
        let alias = s[4] || s.alias || "";
        if (this.style == "list") {
            return (<div class="remote-session-link remote-session-list" id={id} platform={platform} title={alias ? "ID: " + id : ""} >
                <div class="platform" style={"background:" + string2RGB(id + platform, 0.5)}>
                    {platform && platformSvg(platform, "white")}
                </div>
                <div class="name">
                    <div>
                        <div id="alias" class="ellipsis">{alias ? alias : formatId(id)}</div>
                        <div class="username ellipsis">{username}@{hostname}</div>
                    </div>
                </div>
                <div>
                    {svg_menu}
                </div>
            </div >);
        }
        return (<div class="remote-session-link remote-session" id={id} platform={platform} title={alias ? "ID: " + id : ""} style={"background:" + string2RGB(id + platform, 0.5)} >
            <div class="platform">
                {platform && platformSvg(platform, "white")}
                <div class="username ellipsis">{username}@{hostname}</div>
            </div>
            <div class="text">
                <div id="alias" class="ellipsis">{alias ? alias : formatId(id)}</div>
                {svg_menu}
            </div >
        </div >);
    }

    ["on doubleclick at div.remote-session-link"](evt, me) {
        createNewConnect(me.id, "connect");
    }

    ["on click at #menu"](_, me) {
        let id = me.parentElement.parentElement.id;
        let platform = me.parentElement.parentElement.getAttribute("platform");
        this.$("#rdp").style.setProperty(
            "display", (platform == "Windows" && is_win) ? "block" : "none",
        );
        this.$("#forget-password").style.setProperty(
            "display", handler.xcall("peer_has_password", id) ? "block" : "none",
        );
        if (!this.type || this.type == "fav") {
            let in_fav = handler.xcall("get_fav").indexOf(id) >= 0;
            let el = this.$("add-fav");
            if (el) el.style.setProperty(
                "display", in_fav ? "none" : "block",
            );
            el = this.$("remove-fav");
            if (el) el.style.setProperty(
                "display", in_fav ? "block" : "none",
            );
        }
        // https://sciter.com/forums/topic/replacecustomize-context-menu/
        let menu = this.$("menu#remote-context");
        menu.setAttribute("remote-id",id);
        me.popup(menu);
    }
    
    ["on click at menu#remote-context li"](evt, me) {
        let action = me.id;
        let id = me.parentElement.getAttribute("remote-id");
        if (action == "connect") {
            createNewConnect(id, "connect");
        } else if (action == "transfer") {
            createNewConnect(id, "file-transfer");
        } else if (action == "remove") {
            if (!this.type) {
                handler.xcall("remove_peer", id);
                app.componentUpdate(); 
            }
        } else if (action == "forget-password") {
            handler.forget_password(id);
        } else if (action == "shortcut") {
            handler.xcall("create_shortcut", id);
        } else if (action == "rdp") {
            createNewConnect(id, "rdp");
        } else if (action == "add-fav") {
            var favs = handler.get_fav();
            if (favs.indexOf(id) < 0) {
                favs = [id].concat(favs);
                handler.store_fav(favs);
            }
            app.multipleSessions.update();
            app.update();
        } else if (action == "remove-fav") {
            var favs = handler.get_fav();
            var i = favs.indexOf(id);
            favs.splice(i, 1);
            handler.store_fav(favs);
            app.multipleSessions.update();
        } else if (action == "tunnel") {
            createNewConnect(id, "port-forward");
        } else if (action == "rename") {
            let old_name = handler.xcall("get_peer_option", id, "alias");
            msgbox("custom-rename", "Rename", "<div class='form'> \
                <div><input name='name' class='outline-focus' style='width: *; height: 23px', value='" + old_name + "' /></div> \
                </div> \
                ",
                function (res = null) {
                    if (!res) return;
                    let name = (res.name || "").trim();
                    if (name != old_name) {
                        handler.xcall("set_peer_option", id, "alias", name);
                    }
                    app.update();
                });
        }
    }
}

function getSessionsType() {
    return handler.xcall("get_local_option", "show-sessions-type");
}

class Favorites extends Element {
    render() {
        var sessions = handler.xcall("get_fav").map(function(f) {
            return handler.xcall("get_peer", f);
        });
        return <SessionList sessions={sessions} type="fav" />;
    }
}

export class MultipleSessions extends Element {
    render() {
        var type = getSessionsType();
        return  <div style="size: *">
                <div class="sessions-bar">
                    <div style="width:*" class="sessions-tab" id="sessions-type">
                        <span class={!type ? 'active' : 'inactive'}>{translate('Recent Sessions')}</span>
                        <span id="fav" class={type == "fav" ? 'active' : 'inactive'}>{translate('Favorites')}</span>
                    </div>
                    {!this.hidden && <SearchBar type={type} />}
                    {!this.hidden && <SessionStyle type={type} />}
                </div>
                {!this.hidden && 
                ((type == "fav" && <Favorites />) ||
                <SessionList sessions={handler.xcall("get_recent_sessions")} />)}
            </div>;
    }

    ["on click at div#sessions-type span.inactive"] (_, el) {
        handler.xcall("set_option", 'show-sessions-type', el.id || "");
        this.componentUpdate();
    }

    onSize() {
        let w = this.$(".sessions-bar").state.box("width") - 220;
        this.$("#sessions-type span").style.setProperty(
            "max-width", (w / 2) + "px",
        );
    }
}

document.onsizechange = () => { if (app && app.multipleSessions) app.multipleSessions.onSize(); }
