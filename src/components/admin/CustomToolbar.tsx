const CustomToolbar = () => {
    return (
        <>
            <span className="ql-formats">
                <select className="ql-header"></select>
                <select className="ql-font"></select>
            </span>
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
                <button className="ql-blockquote"></button>
            </span>
            <span className="ql-formats">
                <select className="ql-color"></select>
                <select className="ql-background"></select>
            </span>
            <span className="ql-formats">
                <button className="ql-list" value="ordered" aria-label="Ordered List"></button>
                <select className="ql-align"></select>
            </span>
            <span className="ql-formats">
                <button className="ql-link"></button>
                <button className="ql-clean"></button>
            </span>
        </>
    );
};

export default CustomToolbar;
