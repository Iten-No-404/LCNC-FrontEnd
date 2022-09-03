const Allfontsfamily = new Set();
/**
 * This function is recursive function to loop over all widgets and its childrens 
 * and select each widget by the id then list its all style proparities
 * @method
 * @param {Array} board The Array of widgets stored in the board
 */
export const generateCSSids = (board) => {
    /** Base Case */
    if (!board) return ``;

    let codeText = ``;
    /** iterate over each widget */
    for (let i = 0; i < board.length; i++) {
        const fontFamily = board[i].CSS.font.family;
        Allfontsfamily.add(`family=${fontFamily.replace(" ", "+")}&`);
        const color = board[i].CSS.color;
        const fontSize = board[i].CSS.font.size;
        const id = board[i].id;
        const backgroundcolor = board[i].CSS.background.color;
        const width = board[i].CSS.width;
        const height = board[i].CSS.height;
        const padding = board[i].CSS.padding;
        const margin = board[i].CSS.margin;
        const boarderred = board[i].CSS.border.radius;
        const CSSselec = `
        #a${id}{
            font-family: "${fontFamily}";
            color: ${color};
            font-size: ${fontSize}px;
            background-color: ${backgroundcolor};
            width: ${width}%;
            height: ${height}%;
            padding: ${padding}px;
            margin: ${margin}px;
            border-radius:${boarderred}%;
        }`;
        /** recursive over each widget children */
        codeText = codeText.concat(CSSselec + generateCSSids(board[i].children));
    }
    return codeText;
};
/**
 * This function generate the CSS file for all the widgets in the board
 * @method
 * @param {Array} board The Array of widgets stored in the board
 */
export const generateCSS = (board) => {
    const Cssids = generateCSSids(board);
    let codeText = `@import url('https://fonts.googleapis.com/css2?`;
    /** loop over all the fonts family that has been used in the board to be import in the header of the CSS file */
    for (const fontFamily of Allfontsfamily) {
        codeText = codeText.concat(fontFamily);
    }
    codeText = codeText.concat(`display=swap');`);
    codeText = codeText.concat(Cssids);

    return codeText;
};
