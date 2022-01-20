/**
 * @projectDescription	The SDX controller library for the PatientRecord data-type.
 * @namespace	i2b2.sdx.TypeControllers.PR
 * @inherits 	i2b2.sdx.TypeControllers
 * @author		Nick Benik, Griffin Weber MD PhD
 * @version 	1.3
 * @see 		i2b2.sdx
 * ----------------------------------------------------------------------------------------
 * updated 9-15-08: RC4 launch [Nick Benik]
 */
console.group('Load & Execute component file: CRC > SDX > Patient Record');
console.time('execute time');


i2b2.sdx.TypeControllers.PR = {};
i2b2.sdx.TypeControllers.PR.model = {};
// *********************************************************************************
//	ENCAPSULATE DATA
// *********************************************************************************
i2b2.sdx.TypeControllers.PR.getEncapsulateInfo = function() {
    // this function returns the encapsulation head information
    return {sdxType: 'PR', sdxKeyName: 'patient_id', sdxControlCell:'CRC', sdxDisplayNameKey: 'title'};
}

// *********************************************************************************
//	GENERATE RENDER DATA (DEFAULT HANDLER)
// *********************************************************************************
i2b2.sdx.TypeControllers.PR.RenderData = function(sdxData, options) {
    // function returns following data that is used for rendering (at a minimum)
    // === title
    // === iconImg (url)
    // === cssClassMain
    // === cssClassMinor
    // === moreDescriptMain
    // === moreDescriptMinor
    // === tvNodeState
    if (options === undefined) { options = {}; }
    // default PR icons
    if (!$.isArray(options.icon)) {
        if (typeof options.icon == 'string') {
            var t = options.icon;
            options.icon = {
                root: t,
                rootExp: t,
                branch: t,
                branchExp: t,
                leaf: t
            };
        } else {
            options.icon = {
                root: 'sdx_CRC_PR.jpg',
                rootExp: 'sdx_CRC_PR.jpg',
                branch: 'sdx_CRC_PR.jpg',
                branchExp: 'sdx_CRC_PR.jpg',
                leaf: 'sdx_CRC_PR.jpg'
            };
        }
    }

    var nodeInfo = {
        title: undefined,
        iconImg: undefined,
        iconImgExp: undefined,
        cssClassMain: "sdxStyleCRC-PR",
        cssClassMinor: undefined,
        moreDescriptMain: undefined,
        moreDescriptMinor: undefined,
        annotation: undefined,
        tvNodeState: {}
    };

    if (options.cssClass !== undefined) nodeInfo.cssClassMain = options.cssClass;
    if (options.title !== undefined) {
        nodeInfo.title = options.title;
    } else  {
        nodeInfo.title = sdxData.sdxInfo.sdxDisplayName;
    }


    var bCanExp = false;
    if (options.showchildren === true) bCanExp = true;
    if (!bCanExp) {
        // cannot expand node
        nodeInfo.tvNodeState.loaded = true;
        nodeInfo.tvNodeState.expanded = true;
    }

    var icon = 'leaf';
    switch(icon) {
        case "root":
            nodeInfo.cssClassMinor = "tvRoot";
            break;
        case "branch":
            nodeInfo.cssClassMinor = "tvBranch";
            break;
        case "leaf":
            nodeInfo.cssClassMinor = "tvLeaf";
            break;
    }
    if (options.icon[icon] !== undefined) {
        nodeInfo.iconImg = i2b2.hive.cfg.urlFramework + 'cells/CRC/assets/'+ options.icon[icon];
    }
    if (options.icon[icon+'Exp'] !== undefined) {
        nodeInfo.iconImgExp = i2b2.hive.cfg.urlFramework + 'cells/CRC/assets/'+ options.icon[icon+'Exp'];
    }
    // in cases of one set icon, copy valid icon to the missing icon
    if ((nodeInfo.iconImg === undefined) && (nodeInfo.iconImgExp !== undefined)) {	nodeInfo.iconImg = nodeInfo.iconImgExp; }
    if ((nodeInfo.iconImg !== undefined) && (nodeInfo.iconImgExp === undefined)) {	nodeInfo.iconImgExp = nodeInfo.iconImg; }

    // provide tooltip information if given
    if (typeof options.tooltip == 'string') nodeInfo.moreDescriptMinor = options.tooltip;

    return nodeInfo;
};




// *********************************************************************************
//	GENERATE HTML (DEFAULT HANDLER)
// *********************************************************************************
i2b2.sdx.TypeControllers.PR.RenderHTML= function(sdxData, options, targetDiv) {
    console.warn("[i2b2.sdx.TypeControllers.PR.RenderHTML] is deprecated!");
    // OPTIONS:
    //	title: string
    //	showchildren: true | false
    //	cssClass: string
    //	icon: [data object]
    //		icon: 		(filename of img, appended to i2b2_root+cellDir + '/assets')
    //		iconExp: 	(filename of img, appended to i2b2_root+cellDir + '/assets')
    //	dragdrop: string (function name)
    //	context: string
    //	click: string
    //	dblclick: string

    if (Object.isUndefined(options)) { options = {}; }
    var render = {html: retHtml, htmlID: id};
    var id = "CRC_ID-" + i2b2.GUID();

    // process drag drop controllers
    if (!Object.isUndefined(options.dragdrop)) {
// NOTE TO SELF: should attachment of node dragdrop controller be handled by the SDX system as well? 
// This would ensure removal of the onmouseover call in a cross-browser way
        var sDD = '  onmouseover="' + options.dragdrop + '(\''+ targetDiv.id +'\',\'' + id + '\')" ';
    } else {
        var sDD = '';
    }

    if (Object.isUndefined(options.cssClass)) { options.cssClass = 'sdxDefaultPR';}

    // user can override
    bCanExp = true;
    if (Object.isBoolean(options.showchildren)) {
        bCanExp = options.showchildren;
    }
    render.canExpand = bCanExp;
    render.iconType = "PR";

    if (!Object.isUndefined(options.icon)) { render.icon = i2b2.hive.cfg.urlFramework + 'cells/CRC/assets/'+ options.icon }
    if (!Object.isUndefined(options.iconExp)) { render.iconExp = i2b2.hive.cfg.urlFramework + 'cells/CRC/assets/'+ options.iconExp }
    // in cases of one set icon, copy valid icon to the missing icon
    if (Object.isUndefined(render.icon) && !Object.isUndefined(render.iconExp)) {	render.icon = render.iconExp; }
    if (!Object.isUndefined(render.icon) && Object.isUndefined(render.iconExp)) {	render.iconExp = render.icon; }

    // handle the event controllers
    var sMainEvents = sDD;
    var sImgEvents = sDD;

    // **** Render the HTML ***
    var retHtml = '<DIV id="' + id + '" ' + sMainEvents + ' style="white-space:nowrap;cursor:pointer;">';
    retHtml += '<DIV ';
    if (Object.isString(options.cssClass)) {
        retHtml += ' class="'+options.cssClass+'" ';
    } else {
        retHtml += ' class= "sdxDefaultPR" ';
    }
    retHtml += sImgEvents;
    retHtml += '>';
    retHtml += '<IMG src="'+render.icon+'"/> ';
    if (!Object.isUndefined(options.title)) {
        retHtml += options.title;
    } else {
        console.warn('[SDX RenderHTML] no title was given in the creation options for an CRC > PR node!');
        retHtml += ' PR '+id;
    }
    retHtml += '</DIV></DIV>';
    render.html = retHtml;
    render.htmlID =  id;
    var retObj = {};
    $.extend(retObj, sdxData);
    retObj.renderData = render;
    return retObj;
}


// *********************************************************************************
//	ATTACH DRAG TO DATA (DEFAULT HANDLER)
// *********************************************************************************
i2b2.sdx.TypeControllers.PR.AttachDrag2Data = function(divParentID, divDataID){
    if (Object.isUndefined($(divDataID))) {	return false; }

    // get the i2b2 data from the yuiTree node
    var tvTree = YAHOO.widget.TreeView.getTree(divParentID);
    var tvNode = tvTree.getNodeByProperty('nodeid', divDataID);
    if (!Object.isUndefined(tvNode.DDProxy)) { return true; }

    // attach DD
    var t = new i2b2.sdx.TypeControllers.PR.DragDrop(divDataID)
    t.yuiTree = tvTree;
    t.yuiTreeNode = tvNode;
    tvNode.DDProxy = t;

    // clear the mouseover attachment function
    var tdn = $(divDataID);
    if (!Object.isUndefined(tdn.onmouseover)) {
        try {
            delete tdn.onmouseover;
        } catch(e) {
            tdn.onmouseover;
        }
    }
    if (!Object.isUndefined(tdn.attributes)) {
        for (var i=0;i<tdn.attributes.length; i++) {
            if (tdn.attributes[i].name=="onmouseover") {
                try {
                    delete tdn.onmouseover;
                } catch(e) {
                    tdn.onmouseover;
                }
            }
        }
    }
}




// *********************************************************************************
//	DRAG DROP PROXY CONTROLLER
// *********************************************************************************
i2b2.sdx.TypeControllers.PR.DragDrop = function(id, config) {
    if (id) {
        this.init(id, 'PR',{isTarget:false});
        this.initFrame();
    }
    var s = this.getDragEl().style;
    s.borderColor = "transparent";
    s.opacity = 0.75;
    s.filter = "alpha(opacity=75)";
    s.whiteSpace = "nowrap";
    s.overflow = "hidden";
    s.textOverflow = "ellipsis";
};

/* TODO: Reimplement drag and drop */


// *********************************************************************************
//	<BLANK> DROP HANDLER 
//	!!!! DO NOT EDIT - ATTACH YOUR OWN CUSTOM ROUTINE USING
//	!!!! THE i2b2.sdx.Master.setHandlerCustom FUNCTION
// *********************************************************************************
i2b2.sdx.TypeControllers.PR.DropHandler = function(sdxData) {
    alert('[PatientRecord DROPPED] You need to create your own custom drop event handler.');
}
// ==========================================================================
i2b2.sdx.TypeControllers.PR.dragStartHandler = function(i2b2Data) {
    delete i2b2Data.origData.xmlOrig;
    delete i2b2Data.origData.parent;
    delete i2b2Data.renderData.idDOM;
    return i2b2Data;
};

// *********************************************************************************
//	DEPRECATED FUNCTIONS
// *********************************************************************************
i2b2.sdx.TypeControllers.PR.AppendTreeNode = function() { console.error("[i2b2.sdx.TypeControllers.PR.AppendTreeNode] is deprecated!"); }
i2b2.sdx.TypeControllers.PR.SaveToDataModel = function() { console.error("[i2b2.sdx.TypeControllers.PR.SaveToDataModel] is deprecated!"); }
i2b2.sdx.TypeControllers.PR.LoadFromDataModel = function() { console.error("[i2b2.sdx.TypeControllers.PR.LoadFromDataModel] is deprecated!"); }
i2b2.sdx.TypeControllers.PR.ClearAllFromDataModel= function() { console.error("[i2b2.sdx.TypeControllers.PR.ClearAllFromDataModel] is deprecated!"); }
i2b2.sdx.TypeControllers.PR.onHoverOver = function() { console.error("[i2b2.sdx.TypeControllers.PR.onHoverOver] is deprecated!"); }
i2b2.sdx.TypeControllers.PR.onHoverOut = function() { console.error("[i2b2.sdx.TypeControllers.PR.onHoverOut] is deprecated!"); }
i2b2.sdx.TypeControllers.PR.AttachDrag2Data = function() { console.error("[i2b2.sdx.TypeControllers.PR.AttachDrag2Data] is deprecated!"); }

console.timeEnd('execute time');
console.groupEnd();