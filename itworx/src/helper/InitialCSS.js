export const defaultCSS = {
    // background: bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit
    background: {
        // background-attachment: scroll|fixed|local|initial|inherit
        attachment: "scroll",
        // background-blend-mode: normal|multiply|screen|overlay|darken|lighten|color-dodge|saturation|color|luminosity
        blendMode: "normal",
        // background-clip: border-box|padding-box|content-box|initial|inherit
        clip: "border-box",
        // background-color: color|transparent|initial|inherit
        color: "transparent",
        // background-image: url in the format url('URL')|none|initial|inherit --> It usually can take more than 1 URL, but we'll focus on 1 for now. We'll also ignore gradients.
        image: "none",
        // background-origin: padding-box|border-box|content-box|initial|inherit
        origin: "padding-box",
        // background-position: value --> left top/left center/left bottom/right top/right center/right bottom/center top/center center or center/center bottom. We'll ignore numerical values.
        position: "center",
        // background-repeat: repeat|repeat-x|repeat-y|no-repeat|initial|inherit
        repeat: "repeat",
        // background-size: auto|length|cover|contain|initial|inherit
        size: "auto",
        // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
        // {
        //   value1: 0,
        //   unit1: "px",
        //   value2: 0,
        //   unit2: "px"
        // }
    },
    // border: border-width border-style border-color|initial|inherit --> For now, let's make all four sides of the border the same.
    border: {
        // border-collapse: separate|collapse|initial|inherit
        collapse: "separate",
        // border-color: color|transparent|initial|inherit. If null, takes the same color as the font.
        color: "",
        // border-style: none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|initial|inherit
        style: "none",
        // border-width: medium|thin|thick|length|initial|inherit;
        width: "medium",
        // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
        //   {
        //     value1: 0,
        //     unit1: "px",
        //     value2: 0,
        //     unit2: "px"
        //   },
        // border-radius: 1-4 length|% / 1-4 length|%|initial|inherit;
        radius: "initial",
        // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
        //   {
        //     value1: 0,
        //     unit1: "px",
        //     value2: 0,
        //     unit2: "px"
        //   },
    },
    // bottom: auto|length|initial|inherit
    bottom: "auto",
    // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
    // {
    //   value: 0,
    //   unit: "px"
    // }
    // color: color|initial|inherit
    color: "black",
    // direction: ltr|rtl|initial|inherit
    direction: "ltr",
    // display: inline|block|contents|flex|grid|inline-block|inline-flex|inline-grid|inline-table|list-item|run-in.
    display: "initial",
    // font: font-style font-variant font-weight font-size/line-height font-family|caption|icon|menu|message-box|small-caption|status-bar|initial|inherit
    font: {
        // font-family: family-name|generic-family|initial|inherit
        family: "Open Sans",
        // font-kerning: auto|normal|none
        kerning: "normal",
        // font-size:medium|xx-small|x-small|small|large|x-large|xx-large|smaller|larger|initial|inherit|length in px/mm/em/rem/%
        size: "medium",
        // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
        // {
        //   value: 0,
        // Will be used concatenated to the value to form font-size. For now, let's use only these: px/mm/em/rem/%
        //   unit: "px"
        // }
        // font-style: normal|italic|oblique|initial|inherit
        style: "normal",
        // font-weight: normal[400]|bold[700]|bolder|lighter|number(100 - 900)|initial|inherit
        weight: "normal",
        // font-stretch: ultra-condensed|extra-condensed|condensed|semi-condensed|normal|semi-expanded|expanded|extra-expanded|ultra-expanded|initial|inherit
        stretch: "normal",
        // font-variant: normal|small-caps|initial|inherit
        variant: "normal",
    },
    // height: auto|length|initial|inherit
    height: "auto",
    // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
    // {
    //   value: 0,
    //   unit: "px"
    // }
    // left: auto|length|initial|inherit
    left: "auto",
    // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
    // {
    //   value: 0,
    //   unit: "px"
    // }
    // letter-spacing: normal|length|initial|inherit
    letterSpacing: "normal",
    // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
    // {
    //   value: 0,
    //   unit: "px"
    // }
    // line-height: normal|number|length|initial|inherit
    lineHeight: "normal",
    // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
    // {
    //   value: 0,
    //   unit: "px"
    // }
    // margin: length|auto|initial|inherit --> 4 values, 1 for each direction.
    margin: "initial",
    // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
    // {
    //   valueTop: 0,
    //   unitTop: "px",
    //   valueRight: 0,
    //   unitRight: "px",
    //   valueBottom: 0,
    //   unitBottom: "px",
    //   valueLeft: 0,
    //   unitLeft: "px"
    // },
    // padding: length|initial|inherit --> 4 values, 1 for each direction.
    padding: "initial",
    // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
    // {
    //   valueTop: 0,
    //   unitTop: "px",
    //   valueRight: 0,
    //   unitRight: "px",
    //   valueBottom: 0,
    //   unitBottom: "px",
    //   valueLeft: 0,
    //   unitLeft: "px"
    // },
    // position: static|absolute|fixed|relative|sticky|initial|inherit
    position: "static",
    // right: auto|length|initial|inherit
    right: "auto",
    // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
    // {
    //   value: 0,
    //   unit: "px"
    // }
    text: {
        // It's not a CSS property, it's the value of the text. Not sure if it's best put here.
        content: "",
        // text-align: left|right|center|justify|initial|inherit
        align: "left",
        // text-align-last: auto|left|right|center|justify|start|end|initial|inherit
        alignLast: "auto",
        // text-decoration: text-decoration-line text-decoration-color text-decoration-style text-decoration-thickness|initial|inherit;
        decoration: {
            // text-decoration-color: color|initial|inherit
            color: "black",
            // text-decoration-line: none|underline|overline|line-through|initial|inherit
            line: "none",
            // text-decoration-style: solid|double|dotted|dashed|wavy|initial|inherit
            style: "solid",
            // text-decoration-thickness: auto|from-font|length(px/%)|initial|inherit
            thickness: "auto",
            // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
            // {
            //   value: 0,
            // Will be used concatenated to the value to form text-decoration-thickness. For now, let's use only these: px/mm/em/rem/%
            //   unit: "px"
            // }
        },
        // text-emphasis: none|filled|open|dot|circle|double-circle|triangle|sesame|char(a,b,...,!,@,...) + color
        emphasis: {
            // Concatenate shape & color to get text-emphasis
            shape: "none",
            color: "black",
        },
        // text-indent: length in px/mm/em/rem/% |initial|inherit
        indent: "initial",
        // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
        // {
        //   length: 0,
        //   unit: "px"
        // },
        // text-justify: auto|inter-word|inter-character|none|initial|inherit
        justify: "none",
        // text-overflow: clip|ellipsis|string|initial|inherit
        overflow: "clip",
        // text-shadow: h-shadow v-shadow blur-radius color|none|initial|inherit
        shadow: "none",
        // The following is its structure if a shadow exists. Check using typeof === "object", then decide what to do.
        // {
        //   // The position of the horizontal shadow. Negative values are allowed. Also, in px/mm/em/rem/%
        //   hShadow: {
        //     value: 0,
        //     unit: "px"
        //   },
        //   // The position of the vertical shadow. Negative values are allowed. Also, in px/mm/em/rem/%
        //   vShadow: {
        //     value: 0,
        //     unit: "px"
        //   },
        //   // Optional. The blur radius. Also, in px/mm/em/rem/%
        //   blurRadius: {
        //     value: 0,
        //     unit: "px"
        //   },
        //   // Optional. If null, takes the same color as the font.
        //   color: ''
        // }
        // text-transform: none|capitalize|uppercase|lowercase|initial|inherit
        transform: "none",
    },
    // top: auto|length|initial|inherit
    top: "auto",
    // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
    // {
    //   value: 0,
    //   unit: "px"
    // }
    // width: auto|value|initial|inherit
    width: "auto",
    // The following is its structure if a custom value exists. Check using typeof === "object", then decide what to do.
    // {
    //   value: 0,
    //   unit: "px"
    // }
    // z-index: auto|number(+ or -)|initial|inherit
    zIndex: "auto",
};