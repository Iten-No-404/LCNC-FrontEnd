import { configureStore } from '@reduxjs/toolkit';
import widgetCSSReducer from './widget-css-slice/widget-css-slice';
import widgetListReducer from './widget-list-slice/widget-list-slice';
import boardReducer from './board-slice/board-slice'
import blocksListReducer from './blocks-list-slice/blocks-list-slice';
import defaultCSSReducer from './default-css-slice/default-css-slice';

const store = configureStore({
    reducer: {
        widgetCSS: widgetCSSReducer,
        widgetList: widgetListReducer,
        board:boardReducer,
        defaultCSS:defaultCSSReducer,
        blocksList:blocksListReducer
    },
});

export default store;