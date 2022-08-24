const generatechildrencode = (block) => {
    let codeText = ``;
    if (block.children) {
        console.log(block.children);
        for (let i = 0; i < block.children.length; i++) {
            codeText = codeText.concat(block.children[i].code1 + ((block.CSS.text.content) ? block.CSS.text.content : block.text) + generatechildrencode(block.children[i]) + block.children[i].code2);
        }
        return codeText;
    } else {
        return block.CSS.text.content ? block.CSS.text.content : block.text;
    }
};
export const generateCode = (board) => {
    let codeText = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Bootstrap demo</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    </head>
    <body>`;

    for (let i = 0; i < board.length; i++) {
        codeText = codeText.concat(board[i].code1 +  ((board[i].CSS.text.content) ? board[i].CSS.text.content : board[i].text) + generatechildrencode(board[i]) + board[i].code2);
    }

    codeText = codeText.concat(`
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
   </body>
  </html>
  `);
    return codeText;
};
