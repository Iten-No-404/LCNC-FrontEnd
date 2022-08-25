const Allfontsfamily = new Set();
export const generateCSSids = (board) => {
    if (!board) return ``;

    let codeText = ``;
    for (let i = 0; i < board.length; i++) {
        const fontFamily = board[i].CSS.font.family;
        Allfontsfamily.add(`family=${fontFamily.replace(" ", "+")}&`);
        const color = board[i].CSS.color;
        const id = board[i].id;
        const CSSselec = `
        #a${id}{
            font-family: "${fontFamily}";
            color: ${color};
        }`;
        codeText = codeText.concat(CSSselec + generateCSSids(board[i].children));
    }
    return codeText;
};

export const generateCSS = (board) => {
    const Cssids = generateCSSids(board);
    console.log(Cssids);
    let codeText = `@import url('https://fonts.googleapis.com/css2?`;
    for (const fontFamily of Allfontsfamily) {
        codeText = codeText.concat(fontFamily);
    }
    codeText = codeText.concat(`display=swap');`);
    codeText = codeText.concat(Cssids);

    return codeText;
};
