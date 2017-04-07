
import navigateTo from '../actions/sideBarNav';
import { fork, call, put, select } from "redux-saga/effects";
import update from 'immutability-helper';
import { NavigationActions } from 'react-navigation';
import { getCompositeEntity, setActiveNode, getActiveCompositeEntityNode, getNodeById, queryNodeData, findParentNode } from './ce';
import { putBaseNodeKeys } from '../actions/ce';
import { fetchNodeActiveGridData, queryNodeGridData } from './grid';
import { submitNodeData,getConfig, getGridData, getlayoutData } from '../services/api';
import { HOMEROUTE } from '../AppNavigator';
import { setTabLayoutHome, putCardsData, resetLayoutHomeAction } from '../actions/layout';
import { putActiveNodeGridConfig } from '../actions/grid';
import { updateError, clearError, isNodeDataExists, initCENodeDataMap, getKeys, createAPIRequestData } from '../utils/uiData';
import { showSpinner, hideSpinner } from '../actions/aebase';
import { getCurrentUser } from './user';



export const getLayout = (state) => state.ae.layout.config

export const getCards = (state) => state.ae.cards

/**
 * Submit User Process action to DB and route to dashboard
 * @param {*} action 
 */
export function* submitLayoutAction(action) {
    console.log("Action receive to submitLayoutAction :",action);
    try {
        const {card, isSuccess} = yield call(submitCardNodeDataToDBByBindingId, action) ;
        console.log(" card, isSuccess ", isSuccess);
        
        if(isSuccess){
            yield put(NavigationActions.navigate({ routeName: 'DashBoard' }));
        }
        else {
            yield call(updateCardState, card);
        }
        
        // route to dashboard 
        //TODO preserver the on success routing target
    } catch (error) {
        console.log("submitCardNodeData failed", action, error);
    }
    
}

/**
 * Upate layout data to db and no routing.
 * @param {*} action 
 */
export function* submitCardNodeDataToDB(action) {
    try {
       const {card, isSuccess} =  submitCardNodeDataToDBByBindingId(action) 
       // just upate the card state and re-render the same layout
       yield call(updateCardState, card);
    } catch (error) {
        console.log("submitCardNodeData failed", action, error);
    }
}

/**
 * Submit Card data to DB 
 * @param {*} card 
 * @param {*} ceNode 
 * @param {*} user 
 * @param {*} bindingId 
 */
export function* submitCardNodeDataToDBByBindingId(action) {
    console.log(" submitNodeDataToDB calling api");
    // Get current logged in user
    let user = yield select(getCurrentUser);
    // Get the card 
    let card = yield call(findCardByIdFromState, action.cardConfigId);
    let ceNode = card.node;
    let keysMap = yield call(getKeys, card.ui.data, ceNode.configObjectId, action.bindingId);
    let keys = keysMap.toJS();
    console.log("** keys **",keys);
    // Get API Request Data 
    let apiRequest = yield call(createAPIRequestData, card.ui.data, user.attributes, ceNode, action.bindingId, action.apiAction);
    // call backend service
    let result = yield call(submitNodeData, ceNode.compositeEntityId, keys, apiRequest);
    if (result.data.status) {
        console.log('=========================success=======================');
        let nodeDataWithNoError = yield call(clearError, card.ui.data, ceNode.configObjectId, action.bindingId);
        card = update(card, { ui: { $merge: { data: nodeDataWithNoError } } });
        return {card, isSuccess:true} ;

    } else {
        console.log('=============================error===================');
        let nodeDataWithError = yield call(updateError, card.ui.data, ceNode.configObjectId, action.bindingId, result.data.message);
        card = update(card, { ui: { $merge: { data: nodeDataWithError } } });
        return {card, isSuccess:false} ;
    }
    
}


/**
 * Calls from Dashboard Grid to Render Layout for a composite entity
 * @param {*} action 
 */
export function* renderLayoutForCE(action) {
    try {
        console.log(" renderLayoutForCE :", action);
        yield fork(resetLayoutHome);
        console.log(" forking done :");
        let result = yield call(getlayoutData, action.targetConfig, action.keys.primaryKey);
        const ce = result.data.returnData.ce;
        const cenode = ce.rootNode;
        const layout = result.data.returnData.layout;
        const processactions = result.data.returnData.processActions;
        const buttons = result.data.returnData.buttons;
        const data = result.data.returnData.data;
        let tabCard = yield call(getTabCard, layout);
        if (tabCard && tabCard.uitabs && tabCard.uitabs.length) {
            const activeTab = tabCard.uitabs[0];
            const nodeData = initCENodeDataMap(data, action.keys, ce.treeModel);
            const card = { config: tabCard, activeTab: activeTab, node: cenode, ui: { data: nodeData, config: activeTab.uiItems } };
            const payload = { ce, cenode, layout, buttons, processactions, keys: action.keys, cards: [card] };
            yield put(setTabLayoutHome(payload));
        }
    }
    catch (error) {
        console.log("Error in renderLayoutForCE ", JSON.stringify(action), error);
    }

}

export function* findCardByIdFromState(cardConfigId) {
    let cards = yield select(getCards);
    return cards.find((c) => c.config.configObjectId === cardConfigId)
}

export function* updateCardState(newCard) {
    let cards = yield select(getCards);
    let index = cards.findIndex((c) => c.config.configObjectId === newCard.config.configObjectId);
    console.log(" found card index :", index);
    if (index !== -1) {
        newCards = update(cards, { $splice: [[index, 1, newCard]] })
        yield put(putCardsData(newCards));
    }
}

export function* updateCardUIData(action) {
    let card = yield call(findCardByIdFromState, action.cardConfigId);
    let newCard = update(card, { ui: { $merge: { data: action.data } } });
    yield call(updateCardState, newCard);
}

export function* renderLayout(action) {
    try {
        // yield put(showSpinner());
        let ce = yield select(getCompositeEntity);
        if (ce.uiLayoutIds.mobile) { // If Mobile layout is set render layout
            yield call(openLayout, action);
        }
        else {
            console.log("Error : No Mobile Layout configured");
        }
        //yield put(hideSpinner());
    }
    catch (error) {
        console.log("Error in API Call for action", JSON.stringify(action), error);
    }

}

function* resetLayoutHome(payload) {
    yield [put(NavigationActions.navigate({ routeName: 'TabLayout' })), put(resetLayoutHomeAction())];
}

function* setLayoutHome(payload) {
    yield [put(NavigationActions.navigate({ routeName: 'TabLayout' })), put(setTabLayoutHome(payload))];
}

export function* openLayout(action) {
    // Get Layout 
    const ce = yield select(getCompositeEntity);
    const result = yield call(getConfig, ce.uiLayoutIds.mobile);
    const layout = result.data.returnData.data;


    switch (layout.uiLayoutType) {
        case "MOBILETABLAYOUT": //MOBILETABLAYOUT
            yield fork(setLayoutHome, layout, action);
            yield call(buildTabLayout, layout, action);
            break;
        default:
            yield put(NavigationActions.navigate({ routeName: 'DataGrid' }));
    }
}

function* getTabCard(layout) {
    let tabCard = layout.uicard.find(function (card, i) {
        return card.viewType === "Tabs";
    });
    return tabCard;
}

function* buildTabLayout(layout, action) {
    console.log("Layout done now building layout");
    let tabCard = yield call(getTabCard, layout);
    if (tabCard && tabCard.uitabs && tabCard.uitabs.length) {
        let activeTab = tabCard.uitabs[0];
        let cardState = yield call(createCardState, tabCard, activeTab, action);
        console.log("setting card state");
        yield put(putCardsData([cardState]));
    }
}

function* createCardState(tabCard, activeTab, action) {
    let cardState = { config: tabCard, activeTab: activeTab };
    if (activeTab.compositeEntityNode) {
        let activeNode = yield call(getNodeById, activeTab.compositeEntityNode.configObjectId);
        Object.assign(cardState, { node: activeNode });
    }
    let nodeData = yield call(tabNodeData, cardState, activeTab, action.keys);

    Object.assign(cardState, { ui: { data: nodeData, config: activeTab.uiItems } });
    return cardState;
}

export function* refreshTabData(cardState, keys) {
    const activeTab = cardState.activeTab;
    switch (activeTab.viewType) {
        case "Form":
        case "FormSection":
            if (cardState.node) { // Node setup is mandatory for Form or Formsection
                //check if nodeId is linked to parent display
                let node = cardState.node;
                if (cardState.node.addToParentDisplay) {
                    node = yield call(findParentNode, cardState.node.configObjectId);
                }
                console.log(" queryNodeData node :", node.configObjectId);
                return yield call(queryNodeData, node, keys);
            }
            return {}

        case "DataGrid":
            if (cardState.node) { // setup grid if based on NodeId
                return yield call(queryNodeGridData, cardState.node.configObjectId, keys);
            }
            else {
                return {};
            }

        default:
            console.log("Invalid or unsupported uiconfig type");
            return {};
    }

}

function* tabNodeData(cardState, activeTab, keys) {
    switch (activeTab.viewType) {
        case "Form":
        case "FormSection":
            if (cardState.node) { // Node setup is mandatory for Form or Formsection
                if (cardState.ui && cardState.ui.data
                    && isNodeDataExists(cardState.ui.data, cardState.node.configObjectId)) {
                    // If Data already present in card check if node data is also present    
                    return cardState.ui.data;
                }
                else {
                    //check if nodeId is linked to parent display
                    let node = cardState.node;
                    if (cardState.node.addToParentDisplay) {
                        node = yield call(findParentNode, cardState.node.configObjectId);
                    }
                    console.log(" queryNodeData node :", node.configObjectId);
                    return yield call(queryNodeData, node, keys);
                }
            }
            return {}

        case "DataGrid":
            if (cardState.node) { // setup grid if based on NodeId
                return yield call(queryNodeGridData, cardState.node.configObjectId, keys);
            }
            else {
                return {};
            }

        default:
            console.log("Invalid or unsupported uiconfig type");
            return {};
    }

}


function* findTabById(cardConfig, tabConfigId) {
    return cardConfig.uitabs.find((t) => t.configObjectId === tabConfigId)
}

export function* renderActiveTab(action) {
    try {
        yield put(showSpinner());
        let card = yield call(findCardByIdFromState, action.cardConfigId);
        let activeTab = yield call(findTabById, card.config, action.tabConfigId);
        let activeNode = yield call(getNodeById, activeTab.compositeEntityNode.configObjectId);
        card = update(card, { $merge: { node: activeNode } });

        let nodeData = yield call(tabNodeData, card, activeTab, action.keys);
        card = update(card, { $merge: { activeTab: activeTab, ui: { data: nodeData, config: activeTab.uiItems } } });
        yield put(putCardsData([card]));
        yield put(hideSpinner());
    }
    catch (error) {
        console.log("Error in renderActiveTab", JSON.stringify(action), error);
    }
}

