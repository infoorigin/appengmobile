
import _ from 'lodash';
import { fromJS, Map, List } from 'immutable';
import uuid from 'uuid';

/**
 * Initialize node data for each Node id
 * Schema :
 * {NodeId :{
 *             bindingId : ""
 *             index : 0
 *             keys : {},
 *             attribute :{}
 *          }
 * }
 * 
 */

export function initCENodeDataMap(apidata){
     let data = {[uuid.v1()] :{ index : 0, error:{}, keys:{}, attributes:apidata.baseEntity.attributes}};
     let nodeData = {[apidata.baseEntity.nodeId] : data};
    // let childData = initChildCENodeDataMap(apidata.baseEntity.childEntities);
     //Object.assign(nodeData, childData);
     // return immutable Map to be stored in state
     
     return fromJS(nodeData);
}

/**
 * childDataList : mutable childnode attributes from api
 */
function initChildCENodeDataMap(childDataList){
    // first groupby all recs of same node id
    let listByNodeId = _.groupBy(childDataList, function(x) {
                return x.nodeId;
                });

    let nodeData = listByNodeId.map(function(datalist) {
        // datalist is list of records for each nodeId (used in repetable forms if more than 1)
        let nodedata = datalist.reduce(function(acc, x, i) {
                        Object.assign(acc, {[uuid.v1()] :{ index : i,  error:{}, keys:{}, attributes:childData.attributes}});
                    },  {});
            
         return nodedata
    });

    childDataList.forEach(function(item){
        if(item.childEntities && item.childEntities.length) {
            let childData = initChildCENodeDataMap(item.childEntities);
            Object.assign(nodeData, childData);
        }
    });
    return nodeData;  
}


/**
 * Update API Data to existing Immutable Map from state 
 * 
 */
export function updateApiData(apidata, stateMapData){
    let updateMap = initCENodeDataMap(apidata);
    // merge and created new immutable Map
    return stateMapData.merge(updateMap);
    
}

export function createAPIRequestData(stateMapData, userattrbs, ceNode, bindingId){
     if(! isBindingIdExists(stateMapData, ceNode.configObjectId, bindingId)){
        // throw exception
        return {};
    }

    let attributesMap = stateMapData.get(ceNode.configObjectId).get(bindingId).get("attributes");
    let attributes = attributesMap.toJS();
    let keysMap = stateMapData.get(ceNode.configObjectId).get(bindingId).get("keys")
                             .filter((v,k) => k !== "primaryKey");
    let keys = keysMap.toJS();

    Object.assign(attributes, userattrbs);
    Object.assign(attributes, keys);
    let apiData = { baseEntity : { configId:ceNode.entityId, attributes:attributes, childEntities: [] }};
    return apiData;
    
}


/**
 * merge updated key values (dbcode:value) and create new immutable map
 */
export function updateAttributes(stateMapData, nodeId, bindingId, attrbKeyValue){
    if(!isBindingIdExists(stateMapData, nodeId, bindingId)) return stateMapData; // TODO throw exception

    let updatePath = [nodeId,bindingId, "attributes"]
    let newStateMapData = stateMapData.mergeIn(updatePath, attrbKeyValue);
    return newStateMapData;
}


/**
 * merge updated key values (dbcode:value) and create new immutable map
 */
export function updateKeys(stateMapData, nodeId, keys, bindingId){
    if(!isNodeDataExists(stateMapData, nodeId)) return stateMapData;// TODO throw exception
    
    if(! isBindingIdExists(stateMapData, nodeId, bindingId)){
        bindingId = getBindingIdByNodeId(stateMapData, nodeId)
    }
    
    let updatePath = [nodeId,bindingId, "keys"]
    console.log("updatePath :",updatePath)
    let newStateMapData = stateMapData.mergeIn(updatePath, keys);
    return newStateMapData;
}

export function getKeysByNode(stateMapData, nodeId){
    let defaultBindigId = getBindingIdByNodeId(stateMapData, nodeId);
    return  getKeys(stateMapData, nodeId,  defaultBindigId);
}

export function getKeys(stateMapData, nodeId,  bindingId){
    if( isBindingIdExists(stateMapData, nodeId, bindingId)){
        return stateMapData.get(nodeId).get(bindingId).get("keys")
    }
    else   
        return Map();
}

export function getError(stateMapData, nodeId,  bindingId){
    if( isBindingIdExists(stateMapData, nodeId, bindingId)){
        return stateMapData.get(nodeId).get(bindingId).get("error")
    }
    else   
        return Map();
}

export function updateError(stateMapData, nodeId,  bindingId, error){
    if(isBindingIdExists(stateMapData, nodeId, bindingId)){
        let updatePath = [nodeId,bindingId, "error"]
        let newStateMapData = stateMapData.mergeIn(updatePath, error);
        return newStateMapData;
    }
    return stateMapData;
}

export function clearError(stateMapData, nodeId,  bindingId) {
     if(isBindingIdExists(stateMapData, nodeId, bindingId)){
        let updatePath = [nodeId,bindingId, "error"]
        let newStateMapData = stateMapData.setIn(updatePath, Map());
        return newStateMapData;
    }
    return stateMapData;
}

export function isBindingIdExists(mapData, nodeId, bindingId){
    return isNodeDataExists(mapData, nodeId) && bindingId
            && mapData.get(nodeId).has(bindingId) && !mapData.get(nodeId).get(bindingId).isEmpty() ;
}

export function isNodeDataExists(mapData, nodeId){
    return mapData.has(nodeId) && !mapData.get(nodeId).isEmpty();
}

export function getDataByBindingId(mapData, nodeId, bindingId){
    if(! isBindingIdExists(mapData, nodeId, bindingId)) return {};
    return mapData.get(nodeId).get(bindingId) ;
}

export function getBindingIdByNodeId(mapData, nodeId, index){
    if(!isNodeDataExists(mapData, nodeId)) return "";
    
    if(! index){ // If no index then first entry is bindingId
     return mapData.get(nodeId).keySeq().first() ;
    }
    else {
        let indexData =  mapData.get(nodeId).findEntry((v) =>  v.get("index") == index)
        return (indexData!= null) ? indexData[0] :"";
    }
}

export function getAllBindingIdsForNodeId(mapData, nodeId){
    if(!isNodeDataExists(mapData, nodeId)) return [];
    return mapData.get(nodeId).keySeq().toJS() ;
}

