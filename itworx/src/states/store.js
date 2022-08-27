import { configureStore } from '@reduxjs/toolkit';
import widgetCSSReducer from './widget-css-slice/widget-css-slice';
import widgetListReducer from './widget-list-slice/widget-list-slice';
import boardReducer from './board-slice/board-slice'
import blocksListReducer from './blocks-list-slice/blocks-list-slice';
import defaultCSSReducer from './default-css-slice/default-css-slice';
import userReducer from './user-slice/user-slice';
import projectReducer from './project-slice/project-slice';


const store = configureStore({
    reducer: {
        project: projectReducer,
        user: userReducer,
        widgetCSS: widgetCSSReducer,
        widgetList: widgetListReducer,
        board:boardReducer,
        defaultCSS:defaultCSSReducer,
        blocksList:blocksListReducer
    },
});

export default store;