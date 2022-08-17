import { configureStore } from '@reduxjs/toolkit';
import widgetCSSReducer from './WidgetCSSSlice/WidgetCSSSlice'

const store = configureStore({
    reducer: {
        widgetCSS: widgetCSSReducer
    },
});

export default store;