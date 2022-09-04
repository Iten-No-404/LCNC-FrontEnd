function Home() {
    const containerStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#a3d9ff"
    }

    const cardStyles = {
        padding: "2rem 5rem",
        backgroundColor: "#00000050",
        textAlign: "center"
    }

    const text1Styles = {
        fontSize: "2.5rem",
        color: "white"
    }

    const text2Styles = {
        fontSize: "1.5rem",
        color: "white"
    }
    return (
        <div style={containerStyles}>
            <div style={cardStyles}>
                <p style={text1Styles}>You must log in first!</p>
                <p style={text2Styles}>Go to the <a href={`${process.env.REACT_APP_LANDING_URL}`}>landing page</a></p>
            </div>
        </div>
    );
}
export default Home;
