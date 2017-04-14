
import _ from 'lodash';
import { fromJS, Map, Set, List } from 'immutable';
import uuid from 'uuid';
import update from 'immutability-helper';


/**
 * Initialize node data for each Node id
 * Schema :
 * {NodeId :{
 *             bindingId/primaryKey : ""
 *             index : 0
 *             keys : {},
 *             attribute :{}
 *          }
 * }
 * 
 */

export function keyColumns(ceNode) {
    let columns = ceNode.entity && ceNode.entity.logicalColumns ? ceNode.entity.logicalColumns : [];
    let keyCols = { primaryKey: "", keys: [] };
    columns.forEach((column) => {
        if (column.dbColumn.primaryKey)
            keyCols.primaryKey = column.dbColumn.code;
        else if (column.dbColumn.key)
            keyCols.keys.push(column.dbColumn.code);
    });
    return keyCols;
}

export function findNodeFromCETreeModel(nodeId, nodes) {
    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].node.configObjectId == nodeId) {
            return nodes[i].node;
        }
        else {
            let result = findNodeFromCETreeModel(nodeId, nodes[i].children);
            if (result) return result;
        }
    }
    return null;
}

export function initCENodeDataMap(apidata, keys, ceNodeTree) {
    let data = createRecordData(apidata.baseEntity, 0, keys, ceNodeTree);
    if(data == null) return fromJS({});
    let primaryKey = Object.keys(data)[0];
    let nodeData = { [apidata.baseEntity.nodeId]: data ? data : {} };
    let childEntities = apidata.baseEntity.childEntities && apidata.baseEntity.childEntities.length ? apidata.baseEntity.childEntities : [];
    childEntities.forEach((c, i) => childRecordData(nodeData, c, i, data[primaryKey].keys, ceNodeTree));
    let nodeDataMap = fromJS(nodeData);
    return nodeDataMap;
}


function childRecordData(parentNodeData, childEntityData, index, parentKeys, ceNodeTree) {
    let data = createRecordData(childEntityData, index, parentKeys, ceNodeTree);
    if (data == null) return;
    let primaryKey = Object.keys(data)[0];
    if (parentNodeData[childEntityData.nodeId] != null) {
        Object.assign(parentNodeData[childEntityData.nodeId], data);
    }
    else {
        Object.assign(parentNodeData, { [childEntityData.nodeId]: data });
    }
    let childEntities = childEntityData.childEntities && childEntityData.childEntities.length ? childEntityData.childEntities : [];
    childEntities.forEach((c, i) => childRecordData(parentNodeData, c, i, data[primaryKey].keys));
}

export function createEmptyNodeData(ceNode, seqData, index, parentKeysData) {
    let keyCols = keyColumns(ceNode);
    let pkValue = seqData[keyCols.primaryKey];
    if(pkValue == null) return fromJS({[ceNode.configObjectId] : {}});
    
    let keysData = { primaryKey: pkValue, [keyCols.primaryKey]: pkValue };
    keyCols.keys.forEach((key) => {
        if (seqData[key] != null)
            keysData[key] = seqData[key];
    })
    if(parentKeysData) {
        keysData = update(parentKeysData, { $merge: keysData });
    }
    let data = { [pkValue]: { index: index, error: {}, keys: keysData, attributes: seqData } };
    let nodeData =  {[ceNode.configObjectId] : data};
    let nodeDataMap = fromJS(nodeData);
    return nodeDataMap;
}


function createRecordData(entityData, index, parentKeysData, ceNodeTree) {
    let ceNode = findNodeFromCETreeModel(entityData.nodeId, [ceNodeTree]);
    if (ceNode == null) return null;
    let keyCols = keyColumns(ceNode);
    let pkValue = entityData.attributes[keyCols.primaryKey];
    if(pkValue == null) return null;
    let keysData = { primaryKey: pkValue, [keyCols.primaryKey]: pkValue };
    keyCols.keys.forEach((key) => {
        if (entityData.attributes[key] != null)
            keysData[key] = entityData.attributes[key];
    })
    keysData = update(parentKeysData, { $merge: keysData });
    let data = { [pkValue]: { index: index, error: {}, keys: keysData, attributes: entityData.attributes } };
    return data;
}



/**
 * Update API Data to existing Immutable Map from state 
 * 
 */
export function updateApiData(apidata, stateMapData) {
    let updateMap = initCENodeDataMap(apidata);
    // merge and created new immutable Map
    return stateMapData.merge(updateMap);

}

export function createAPIRequestData(stateMapData, userattrbs, ceNode, bindingId, action) {
    action = action ? action :"update" ;
    if (!isBindingIdExists(stateMapData, ceNode.configObjectId, bindingId)) {
        // throw exception
        return {};
    }

    let attributesMap = stateMapData.get(ceNode.configObjectId).get(bindingId).get("attributes");
    let attributes = attributesMap.toJS();
    let keysMap = stateMapData.get(ceNode.configObjectId).get(bindingId).get("keys")
        .filter((v, k) => k !== "primaryKey");
    let keys = keysMap.toJS();

    Object.assign(attributes, userattrbs);
    Object.assign(attributes, keys);
    let apiData = { action, baseEntity: { configId: ceNode.entityId, attributes: attributes, childEntities: [] } };
    return apiData;

}


/**
 * merge updated key values (dbcode:value) and create new immutable map
 */
export function updateAttributes(stateMapData, nodeId, bindingId, attrbKeyValue) {
    if (!isBindingIdExists(stateMapData, nodeId, bindingId)) return stateMapData; // TODO throw exception

    let updatePath = [nodeId, bindingId, "attributes"]
    let newStateMapData = stateMapData.mergeIn(updatePath, attrbKeyValue);
    return newStateMapData;
}


/**
 * merge updated key values (dbcode:value) and create new immutable map
 */
export function updateKeys(stateMapData, nodeId, keys, bindingId) {
    if (!isNodeDataExists(stateMapData, nodeId)) return stateMapData;// TODO throw exception

    if (!isBindingIdExists(stateMapData, nodeId, bindingId)) {
        bindingId = getBindingIdByNodeId(stateMapData, nodeId)
    }

    let updatePath = [nodeId, bindingId, "keys"]
    console.log("updatePath :", updatePath)
    let newStateMapData = stateMapData.mergeIn(updatePath, keys);
    return newStateMapData;
}

export function getKeysByNode(stateMapData, nodeId) {
    let defaultBindigId = getBindingIdByNodeId(stateMapData, nodeId);
    return getKeys(stateMapData, nodeId, defaultBindigId);
}

export function getKeys(stateMapData, nodeId, bindingId) {
    if (isBindingIdExists(stateMapData, nodeId, bindingId)) {
        return stateMapData.get(nodeId).get(bindingId).get("keys")
    }
    else
        return Map();
}

export function getError(stateMapData, nodeId, bindingId) {
    if (isBindingIdExists(stateMapData, nodeId, bindingId)) {
        return stateMapData.get(nodeId).get(bindingId).get("error")
    }
    else
        return Map();
}

export function updateError(stateMapData, nodeId, bindingId, error) {
    if (isBindingIdExists(stateMapData, nodeId, bindingId)) {
        let updatePath = [nodeId, bindingId, "error"]
        let newStateMapData = stateMapData.mergeIn(updatePath, error);
        return newStateMapData;
    }
    return stateMapData;
}

export function clearError(stateMapData, nodeId, bindingId) {
    if (isBindingIdExists(stateMapData, nodeId, bindingId)) {
        let updatePath = [nodeId, bindingId, "error"]
        let newStateMapData = stateMapData.setIn(updatePath, Map());
        return newStateMapData;
    }
    return stateMapData;
}

export function isBindingIdExists(mapData, nodeId, bindingId) {
    return isNodeDataExists(mapData, nodeId) && bindingId
        && mapData.get(nodeId).has(bindingId) && !mapData.get(nodeId).get(bindingId).isEmpty();
}

export function isNodeDataExists(mapData, nodeId) {
    return (mapData instanceof Map) && mapData.has(nodeId) && !mapData.get(nodeId).isEmpty();
}

export function getDataByBindingId(mapData, nodeId, bindingId) {
    if (!isBindingIdExists(mapData, nodeId, bindingId)) return {};
    return mapData.get(nodeId).get(bindingId);
}

export function getBindingIdByNodeId(mapData, nodeId, index) {
    if (!isNodeDataExists(mapData, nodeId)) return "";

    if (!index) { // If no index then first entry is bindingId
        return mapData.get(nodeId).keySeq().first();
    }
    else {
        let indexData = mapData.get(nodeId).findEntry((v) => v.get("index") == index)
        return (indexData != null) ? indexData[0] : "";
    }
}

export function getAllBindingIdsForNodeId(mapData, nodeId) {
    if (!isNodeDataExists(mapData, nodeId)) return [];
    return mapData.get(nodeId).keySeq().toJS();
}

