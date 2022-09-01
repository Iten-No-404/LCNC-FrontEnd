const Allfontsfamily = new Set();
export const generateCSSids = (board) => {
    if (!board) return ``;

    let codeText = ``;
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
        codeText = codeText.concat(CSSselec + generateCSSids(board[i].children));
    }
    return codeText;
};

export const generateCSS = (board) => {
    const Cssids = generateCSSids(board);
    let codeText = `@import url('https://fonts.googleapis.com/css2?`;
    for (const fontFamily of Allfontsfamily) {
        codeText = codeText.concat(fontFamily);
    }
    codeText = codeText.concat(`display=swap');`);
    codeText = codeText.concat(Cssids);

    return codeText;
};
