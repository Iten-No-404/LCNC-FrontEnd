import blocksType from "./blocksType";
const BlocksList = [
    {
        id: 1,
        type: blocksType.header,
        text: "Header",
        selected: false,
        code1: `
        <header>
         <div class='p-5 text-center bg-light'>
           <h1 class='mb-3'>`,
        code2:`
           </h1>
         </div>
        </header>`  
    },
    {
        id: 2,
        type: blocksType.section,
        text: "Section",
        selected: false,
        code1: `
        <section>
          <div className='p-5 text-center bg-light'>`,
        code2:`
          </div>
        </section>`  
    }
];
export default  BlocksList