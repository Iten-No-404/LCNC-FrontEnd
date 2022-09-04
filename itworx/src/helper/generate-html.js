/**
 * This function is recursive function to loop over all widgets and its childrens 
 * and get the open tag code and end tag code and write thr text of widget between this two tags
 * and add id attribute in the open tage to give the access to style the widget 
 * @method
 * @param {Array} board The Array of widgets stored in the board
 */
const generatechildrencode = (board) => {
    if (!board) return ``;
    let codeText = ``;
    for (let i = 0; i < board.length; i++) {
        const splitforid = board[i].widgetCodeSnippet.code1.split("id");
        const opentag = `${splitforid[0]} id="a${board[i].id}" ${splitforid[1]}`;
        codeText = codeText.concat(
      `${opentag}
          ${board[i].CSS.text.content ? board[i].CSS.text.content : board[i].text}
          ${generatechildrencode(board[i].children)} 
      ${board[i].widgetCodeSnippet.code2}
      `
        );
    }
    return codeText;
};
/**
 * This function generate the HTML file for all the widgets in the board
 * @method
 * @param {Array} board The Array of widgets stored in the board
 * @param {string} title Title for the page
 */
export const generateCode = (board, title) => {
    let codeText = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <link href="style.css" rel="stylesheet" />
  </head>
  <body>`;

    codeText = codeText.concat(generatechildrencode(board));

    codeText = codeText.concat(`
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
 </body>
</html>
`);
    return codeText;
};
