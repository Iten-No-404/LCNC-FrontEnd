export const defaultFont = {
    family: "Open Sans",
    size: "medium",
    sizeUnit: "px",
    style: "normal",
    weight: "normal"
  };

export const defaultCSS = {
  color: "black",
  font: {
    // font-family: family-name|generic-family|initial|inherit
    family: "Open Sans",
    // font-kerning: auto|normal|none
    kerning: "normal",
    // font-size:medium|xx-small|x-small|small|large|x-large|xx-large|smaller|larger|initial|inherit|length in px/mm/em/rem/%
    size: "medium",
    // Will be used concatenated to the size to form font-size. For now, let's use only these: px/mm/em/rem/%
    sizeUnit: "px",
    // font-style: normal|italic|oblique|initial|inherit
    style: "normal",
    // font-weight: normal[400]|bold[700]|bolder|lighter|number(100 - 900)|initial|inherit
    weight: "normal",
    // font-stretch: ultra-condensed|extra-condensed|condensed|semi-condensed|normal|semi-expanded|expanded|extra-expanded|ultra-expanded|initial|inherit
    stretch: "normal",
    // font-variant: normal|small-caps|initial|inherit
    variant: "normal"
  },
  text: {
    // It's not a CSS property, it's the value of the text. Not sure if it's best put here.
    content: " "
  }
};