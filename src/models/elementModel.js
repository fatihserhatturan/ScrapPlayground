module.exports = class ElementModel {
    constructor(tagName, textContent, attributes, styles, events) {
      this.tagName = tagName;
      this.textContent = textContent;
      this.attributes = attributes;
      this.styles = styles;
      this.events = events;
    }

    static createElementModel(el) {
      const possibleEvents = ['onclick', 'onchange', 'onmouseover', 'onmouseout', 'onkeydown', 'onkeyup'];
      const eventListeners = [];

      possibleEvents.forEach(event => {
        if (el[event]) {
          eventListeners.push({
            event: event,
            functionName: el[event].name || 'Anonymous',
            functionBody: el[event].toString()
          });
        }
      });

      return new ElementModel(
        el.tagName,
        el.textContent,
        el.attributes,
        el.styles,
        eventListeners
      );
    }
  };
