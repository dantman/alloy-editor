YUI.add("button-a",function(t){"use strict";var e=t.Lang,i=t.Node,n=37,s=39,o=13,a=27,l=9,h=t.Base.create("a",t.Plugin.Base,[t.ButtonBase],{initializer:function(){this._ckLink=new CKEDITOR.Link(this.get("host").get("editor"))},renderUI:function(){this._renderButtonUI(),this._renderLinkUI()},bindUI:function(){this.onHostEvent("visibleChange",this._onVisibleChange,this),this.onHostEvent("positionChange",this._switchView,this),this._linkInput.on("keydown",this._onLinkInputKeyDown,this),this._linkInput.on("valuechange",this._onValueChange,this),this._switchToTextButton.on("click",this._onSwitchButtonClick,this),this._closeLink.on("click",this._onCloseLinkClick,this),this._clearInput.on("click",this._onClearInputClick,this),this._linkContainer.delegate("keydown",this._onLinkContainerKeyDown,"button",this)},updateUI:function(){var t,e,i,n,s;e=this.get("host").get("editor"),i=e.elementPath(),s=this._style.checkActive(i,e),t=i.lastElement.data("type"),this._button.set("pressed",!!s&&!t),n=this._button.get("boundingBox").one("i")},_adjustHostPosition:function(t){var e,i,n,s,o;s=this.get("host"),s.get("visible")&&(e=s.get("boundingBox").get("offsetWidth"),n=Math.abs((t-e)/2),i=s.get("xy"),o=t>e?i[0]+n:i[0]-n,s.set("xy",[o,i[1]]))},_attachHideHandler:function(){this._hideHandle=this.onceHostEvent("visibleChange",function(t){t.newVal||this._updateLink()},this)},_attachToolbarActiveHook:function(){this._toolbarActiveHandler=t.Do.before(this._onToolbarActive,this.get("host"),"focus",this)},_cancelLinkChanges:function(){this._detachHideHandler(),this._defaultLink&&this._removeLink(this._defaultLink),this._linkInput.set("value","")},_detachFocusHandler:function(){this._toolbarActiveHandler&&(t.Do.detach(this._toolbarActiveHandler),this._toolbarActiveHandler=null)},_detachHideHandler:function(){this._hideHandle&&(this._hideHandle.detach(),this._hideHandle=null)},_handleLinkInputEnter:function(t){var e,i,n,s;t.stopPropagation(),i=this.get("host"),e=i.get("editor"),s=e.getSelection(),n=s.getRanges(),i.hide(),setTimeout(function(){var t;t=e.createRange(),t.moveToPosition(n[0].endContainer,CKEDITOR.POSITION_AFTER_END),s.selectRanges([t])},0)},_handleLinkInputEsc:function(t){this._cancelLinkChanges(),this.get("host").get("editor").fire("toolbarKey",t)},_handleLinkInputTab:function(){event.preventDefault(),this._linkContainer.focusManager.focus(this._closeLink.get("disabled")?1:0)},_onClearInputClick:function(){this._linkInput.set("value",""),this._linkInput.focus(),this._clearInput.hide(),this._closeLink.disable()},_onCloseLinkClick:function(){this.get("host").hide()},_onClick:function(t){var e,i,n,s,o,a=this;e=t.target,i=a.get("host").get("editor"),e.get("pressed")?(o=i.getSelection(),s=this.get("host").get("boundingBox").get("offsetWidth"),a._buttonsContainer.addClass("hide"),a._linkContainer.removeClass("hide"),this._adjustHostPosition(s),n=a._linkInput,n.focus(),this._ckLink.create("/",{"data-cke-default-link":!0}),this._defaultLink=a._link=this._ckLink.getFromSelection(),this._attachToolbarActiveHook(),this._attachHideHandler()):this._ckLink.remove()},_onLinkContainerKeyDown:function(t){t.charCode===l&&t.preventDefault(),this.get("host").get("editor").fire("toolbarKey",t)},_onLinkInputKeyDown:function(t){t.keyCode===a?this._handleLinkInputEsc(t):t.keyCode===o?this._handleLinkInputEnter(t):t.keyCode===l&&this._handleLinkInputTab(t)},_onSwitchButtonClick:function(){this._switchToTextView(),this.get("host").focus()},_onToolbarActive:function(){var e=!1;return this._linkContainer.hasClass("hide")||(this._linkInput.focus(),e=!0),new t.Do.Halt(null,e)},_onValueChange:function(t){t.newVal?(this._clearInput.show(),this._closeLink.enable()):(this._clearInput.hide(),this._closeLink.disable())},_onVisibleChange:function(t){t.newVal||(this._linkContainer.addClass("hide"),this.get("host").get("buttonsContainer").removeClass("hide"),this._clearInput.hide(),this._closeLink.disable(),this._defaultLink=null,this._detachFocusHandler())},_removeLink:function(t){var e,i,n;t=t||this._link,i=this.get("host").get("editor"),n=i.getSelection(),e=n.createBookmarks(),this._linkInput.set("value",""),this._ckLink.remove(t),n.selectBookmarks(e)},_renderLinkUI:function(){var o,a,l;l=this.get("strings"),a=i.create(e.sub(this.TPL_LINK_CONTAINER,{back:l.back,clear:l.clear,confirm:l.confirm,placeholder:l.placeholder})),o=this.get("host").get("contentBox"),o.appendChild(a),this._buttonsContainer=this.get("host").get("buttonsContainer"),this._linkContainer=a,this._linkInput=a.one("input"),this._clearInput=a.one(".input-clear i"),this._clearInput.hide(),this._closeLink=new t.Button({disabled:!0,render:a.one(".input-close-container"),srcNode:a.one(".close-link")}),this._switchToTextButton=new t.Button({render:a.one(".show-buttons-container"),srcNode:a.one(".switch-to-edit")}),a.plug(t.Plugin.NodeFocusManager,{activeDescendant:0,circular:!0,descendants:"button",focusClass:"focus",keys:{next:"down:"+s,previous:"down:"+n}})},_switchToTextView:function(){var t,e;this._detachFocusHandler(),this._detachHideHandler(),this._defaultLink&&(t=this._linkInput.get("value"),t?this._updateLink():this._removeLink(),this._defaultLink=null,this.fire("actionPerformed")),e=this.get("host").get("boundingBox").get("offsetWidth"),this._linkContainer.addClass("hide"),this._buttonsContainer.removeClass("hide"),this._adjustHostPosition(e)},_switchToLinkView:function(t){var e,i;e=this.get("host").get("editor"),t=t||this._ckLink.getFromSelection(),this._clearInput.show(),this._closeLink.disable(),this._buttonsContainer.addClass("hide"),this._linkContainer.removeClass("hide"),i=this._linkInput,i.set("value",t.$.href),this._link=t,this._attachToolbarActiveHook(),this._attachHideHandler()},_switchView:function(){var t,e;t=this.get("host").get("editor"),e=this._ckLink.getFromSelection(),e&&!e.data("type")?this._switchToLinkView(e):this._switchToTextView()},_updateLink:function(){var t,e;e=this._linkInput.get("value"),t=this.get("host").get("editor"),e?(this._ckLink.update(e,this._link),this._link.removeAttribute("data-cke-default-link")):this._ckLink.remove(this._link),this._linkInput.set("value",""),this._link=null},TPL_CONTENT:'<i class="alloy-editor-icon-link"></i>',TPL_LINK_CONTAINER:'<div class="link-wrapper hide"><div class="pull-left btn-group input-wrapper"><span class="input-container"><input class="input-large" type="text" placeholder="{placeholder}"></input><span aria-label="{clear}" class="input-clear"><i class="alloy-editor-icon-remove"></i></span></span></div><div class="pull-left btn-group input-close-container"><button aria-label="{confirm}" class="alloy-editor-button btn btn-default close-link"><i class="alloy-editor-icon-ok"></i></button></div><div class="pull-right btn-group show-buttons-container"><button aria-label="{back}" class="alloy-editor-button btn btn-default switch-to-edit"><i class="alloy-editor-icon-close"></i></button></div></div>'},{NAME:"a",NS:"a",ATTRS:{element:{validator:e.isString,value:"a"},strings:{value:{back:"Back",clear:"Clear",confirm:"Confirm",label:"Link",placeholder:"Type or paste link here"}}}});t.ButtonA=h},"",{requires:["button-base","event-valuechange","node-focusmanager"]});