
import navigateTo from '../actions/sideBarNav';
import { call, put, select } from "redux-saga/effects";
import update from 'immutability-helper';
import { getCompositeEntity, setActiveNode, getActiveCompositeEntityNode, getNodeById, queryNodeData } from './ce';
import { putBaseNodeKeys } from '../actions/ce';
import { fetchNodeActiveGridData, queryNodeGridData } from './grid';
import { getConfig, getGridData } from '../services/api';
import { HOMEROUTE } from '../AppNavigator';
import { saveLayoutConfig, putCardsData } from '../actions/layout';
import { putActiveNodeGridConfig } from '../actions/grid';


export const getLayout = (state) => state.ae.layout.config

export const getCards = (state) => state.ae.cards

export function* findCardByIdFromState(cardConfigId){
    let cards = yield select(getCards);
    return cards.find((c) => c.config.configObjectId === cardConfigId)
}

export function* updateCardState(newCard){
    let cards = yield select(getCards);
    let index =  cards.findIndex((c) => c.config.configObjectId === newCard.config.configObjectId);
    console.log(" found card index :",index);
    if(index !== -1){
        newCards = update(cards, {$splice:[[index, 1, newCard]]})
        yield put(putCardsData(newCards));
    }
}

export function* updateCardUIData(action){
    let card = yield call(findCardByIdFromState, action.cardConfigId);
    let newCard = update(card, {ui : {$merge :{ data : action.data} }});
    yield call(updateCardState, newCard);
}

export function* renderLayout(action) {
    try {
        yield put(putBaseNodeKeys(action.keys));
        let ce = yield select(getCompositeEntity);
        if (ce.uiLayoutIds.mobile) { // If Mobile layout is set render layout
            yield call(openLayout, action);
       }
        else {
            console.log("Error : No Mobile Layout configured");
        }
    }
    catch (error) {
        console.log("Error in API Call for action", JSON.stringify(action), error);
   }

}

export function* openLayout(action) {
    // Get Layout 
    const ce = yield select(getCompositeEntity);
    const result = yield call(getConfig, ce.uiLayoutIds.mobile);
    const layout = result.data.returnData.data;
    yield put(saveLayoutConfig(layout));

    switch (layout.uiLayoutType) {
        case "MOBILETABLAYOUT": //MOBILETABLAYOUT
            yield call(buildTabLayout, layout, action);
            yield put(navigateTo('tablayout', HOMEROUTE));
            break;
        default:
            yield put(navigateTo('gridlayout', HOMEROUTE));
    }
}

function* getTabCard(layout) {
    let tabCard = layout.uicard.find(function (card, i) {
        return card.viewType === "Tabs";
    });
    return tabCard;
}

function* buildTabLayout(layout, action) {
    let tabCard = yield call(getTabCard, layout);
    if (tabCard && tabCard.uitabs && tabCard.uitabs.length) {
        let activeTab = tabCard.uitabs[0];
        let cardState = yield call(createCardState,tabCard, activeTab, action);
        yield put(putCardsData([cardState]));
    }
}

function* createCardState(tabCard, activeTab, action) {
    let cardState = { config: tabCard, activeTab: activeTab };
    if (activeTab.compositeEntityNode) {
        let activeNode = yield call(getNodeById,activeTab.compositeEntityNode.configObjectId);
        Object.assign(cardState, { node: activeNode });
    }

    let nodeData = {};
    switch (activeTab.viewType) {
        case "Form":
        case "FormSection":
            if (cardState.node) { // Node setup is mandatory for Form or Formsection
                nodeData = yield call(queryNodeData, cardState.node, action.keys);
            }
            break;

        case "DataGrid":
            if (cardState.node) { // setup grid if based on NodeId
                nodeData = yield call(queryNodeGridData, cardState.node.configObjectId, action.keys);
            }
            else {
                //TODO for Grid withouyt nodeID
            }
            break;
        default:
            console.log("Invalid or unsupported uiconfig type");
    }
    Object.assign(cardState, { ui: { data: nodeData, config: activeTab.uiItems } });
    return cardState;
}


function* findTabById(tabCard, tabConfigId) {
    return tabCard.uitabs.find((t) => t.configObjectId === tabConfigId)
}

export function* renderActiveTab(action) {
    try {
        let layout = yield select(getLayout);
        let tabCard = yield call(getTabCard, layout);
        let activeTab = yield call(findTabById, tabCard, action.tabConfigId);
        let cardState = yield call(createCardState,tabCard, activeTab, action);
        yield put(putCardsData([cardState]));
    }
    catch (error) {
        console.log("Error in renderActiveTab", JSON.stringify(action), error);
    }
}

