const Loading = () => {

    // Refactor bits of code into separate components when it makes sense
    // We need the loading component because it will be used on other pages.
    return(
        <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
                <span className="invisible">Loading...</span>
            </div>
        </div>
    );
}

export default Loading;