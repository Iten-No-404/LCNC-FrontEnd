/**
 * Generate random Id for each widget
 * @method
 */
const GenerateId = () => {
    const id = Math.floor(Math.random() * 10000000000000);
    // support up to 1000 widget
    return id > 1000 ? id : GenerateId();
};

export default GenerateId;
