
// ======================================================================================
i2b2.ai.ctrlr.main = {};


// ======================================================================================
i2b2.AI.ctrlr.main.getQuestion = function(questionKey) {
    console.warn("i2b2.AI.ctrlr.main.question");

    // create callback display routine
    let scopedCallback = new i2b2_scopedCallback();
    scopedCallback.scope = targetTvNode;
    scopedCallback.callback = function(results) {
        i2b2.AI.view.main.queryResponse = results.msgResponse;
        i2b2.AI.view.main.queryRequest = results.msgRequest;
        if (results.error) {
            alert("An error occurred while trying to ask question!");
        } else {
            // get ID
            /*
            let childId = Array.from(targetTvNode.refTreeview.nodes.values()).filter((x)=>{ return x.key === childKey}).map(y => y.nodeId);
            targetTvNode.refTreeview.deleteNodes(childId, false);
            i2b2.WORK.view.main.treeview.treeview('redraw', []);

            // get a list of all children in the parent node
            let parentChildren = targetTvNode.refTreeview.findNodes(targetTvNode.nodeId, '', 'parentId').map((node)=>{return node.nodeId});
            // delete the nodes and reset the dynamic loading settings
            targetTvNode.refTreeview.deleteNodes(parentChildren, false);
            targetTvNode.state.loaded = false;
            targetTvNode.state.requested = false;

            // trigger that the treeview node is opened (and reloaded) if it is already open
            if (targetTvNode.state.expanded) {
                targetTvNode.state.expanded = false;
                targetTvNode.refTreeview.expandNode(targetTvNode.nodeId);
            }
            */
        }
    }

    console.log(questionKey);
    let varData = {
        result_wait_time: 280,
        question: questionKey
    };
    i2b2.AI.ajax.moveChild("AI:ai", varData, scopedCallback);
};

