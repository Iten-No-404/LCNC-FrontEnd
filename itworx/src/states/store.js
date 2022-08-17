import { configureStore } from '@reduxjs/toolkit';
import widgetCSSReducer from './WidgetCSSSlice/WidgetCSSSlice';
import widgetListReducer from './WidgetListSlice/WidgetListSlice';

const store = configureStore({
    reducer: {
        widgetCSS: widgetCSSReducer,
        widgetList: widgetListReducer
    },
});

export default store;