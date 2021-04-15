/*
`ea-tab` is styled to look like a tab. It should be used in conjunction with
`ea-tabs`.

Example:

```html
<ea-tabs selected="0">
  <ea-tab>Tab 1</ea-tab>
  <ea-tab>Tab 2</ea-tab>
  <ea-tab>Tab 3</ea-tab>
</ea-tabs>
```
*/

import { EaElement } from '../ea-element/ea-element.js';
import '../ea-mixin-with/ea-mixin-with.js';
import '../ea-behaviors/ea-google-analytics.js';

const $documentContainer = document.createElement('template');

$documentContainer.innerHTML = `<dom-module id="ea-tab">
    <template strip-whitespace="">
        <style include="ea-shared-styles-typography-paragraphs"></style>
        <style include="ea-shared-styles-base-common"></style>
        <style>
            :host {
                color: inherit;
                cursor: pointer;
                height: 50px;
                position: relative;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                text-transform: var(--ea-theme-tabs-tab-text-transform);
            }

            @media (min-width: 768px) {
                :host {
                    height: 60px;
                }
            }

            :host(:focus) {
                outline: none;
            }

            :host([disabled]) {
                color: #eaeaea;
                cursor: not-allowed;
            }

            .tab_checkmark {
                display: none;
            }

            /* stylelint-disable order/properties-alphabetical-order */
            /* border-color needs to come after border-left, border-right */
            .content {
                align-items: center;
                border-left: 1px solid;
                border-right: 1px solid;
                border-color: inherit;
                display: flex;
                justify-content: center;
                margin: 10px 0;
                padding: 0 15px;
                position: relative;
                white-space: nowrap;
            }
            /* stylelint-enable */

            :host(:first-of-type) .content {
                border-left: none;
            }

            :host(:last-of-type) .content {
                border-right: none;
            }

            :host([rtl]:first-of-type) .content {
                border-left: 1px solid;
                border-right: none;
            }

            :host([rtl]:last-of-type) .content {
                border-left: none;
                border-right: 1px solid;
            }
            
            :host([rtl]:first-of-type) .content,
            :host([rtl]:last-of-type) .content {
                border-color: inherit;
            }

            @media (min-width: 768px) {
                .content {
                    margin: 15px 0;
                }
            }

            @media (min-width: 768px) {
                .content::after {
                    content: "";
                }
            }

            .tab_checkmark {
                display: none;
            }

            @media only screen and (max-width: 767px) {
                :host([behavior-in-s-and-xs="collapse"]) .content {
                    align-items: center;
                    border: unset;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0;
                    margin-top: 0;
                    max-width: 100px;
                    min-height: 48px;
                    padding: 8px 0;
                    text-decoration: none;
                    transition: transform var(--ea-interface-expansion) ease-in-out;
                    white-space: unset;
                }

                :host([behavior-in-s-and-xs="collapse"]) .tab_checkmark {
                    display: inline-block;
                    fill: var(--ea-dark-color);
                    height: 13px;
                    margin-left: 16px;
                    max-width: 16px;
                    min-width: 16px;
                    opacity: 0;
                }

                :host([behavior-in-s-and-xs="collapse"][theme="light"]) .tab_checkmark {
                    fill: rgba(255, 255, 255, 1);
                }

                :host([behavior-in-s-and-xs="collapse"][theme="custom"]) .tab_checkmark {
                    fill: var(--ea-theme-tabs-selected-type);
                }

                :host([behavior-in-s-and-xs="collapse"][aria-selected="true"]) .tab_checkmark {
                    opacity: 1;
                }

                :host([behavior-in-s-and-xs="collapse"]) .indicator {
                    display: none;
                }

                :host(:hover[behavior-in-s-and-xs="collapse"]) .content {
                    transform: translateX(8px);
                }

                :host([behavior-in-s-and-xs="collapse"])::before {
                    border-bottom: solid 2px #eaeaea;
                    content: "";
                    display: block;
                    position: relative;
                }

                :host([behavior-in-s-and-xs="collapse"][theme="light"])::before {
                    border-bottom: solid 2px rgba(255, 255, 255, 0.1);
                }

                /* remove divider from the first dropdown item */
                :host([behavior-in-s-and-xs="collapse"]:first-child)::before {
                    display: none;
                }
            }

            .content ::slotted(a) {
                border: inherit;
                color: inherit;
                cursor: inherit;
                font: inherit;
                outline: inherit;
                text-decoration: inherit;
            }

            .indicator {
                background-color: #fff;
                display: block;
                height: 2px;
                margin: 0 auto;
                transition: width .1s ease-out;
                width: 0;
            }

            /* dark variant */
            :host([theme="dark"]) .indicator {
                background-color: var(--ea-theme-color);
            }

            /* custom variant */
            :host([theme="custom"]) .indicator {
                background-color: var(--ea-theme-tabs-indicator-color);
            }

            :host(.iron-selected) .indicator {
                width: 80%;
            }
        </style>
        <div class="content b2">
            <slot></slot>
            <iron-icon icon="ea-state-16:checked" class="tab_checkmark"></iron-icon>
        </div>
        <div class="indicator"></div>
    </template>


</dom-module>`;

document.head.appendChild($documentContainer.content);
const { EaMixin, EaGoogleAnalyticsMixin } = window.nds;

class EaTab extends EaMixin(EaElement).with(EaGoogleAnalyticsMixin) {
    /**
     * Is getter
     *
     * @returns {string} The component name
     */
    static get is() {
        return 'ea-tab';
    }

    /**
     * Properties getter
     *
     * @returns {Object} The component's properties
     */
    static get properties() {
        return {
            /**
             * Whether or not the tab is disabled.
             */
            disabled: {
                type: Boolean,
                reflectToAttribute: true,
                value: false
            },

            /**
             * The url or hash for the tab.
             */
            url: String
        };
    }

    /**
     * Clicks the content anchor if it exists when the user taps the tab. This
     * is done because the anchor is not necessarily as wide or as tall as the
     * tab itself.
     *
     * @see {@link https://git.io/vPJS1}
     *
     * @param {Event} event The tap event.
     */
    _onClick(event) {
        const { _anchor, disabled } = this;

        if (disabled) {
            event.preventDefault();
            return;
        }

        if (_anchor && event.target !== _anchor) {
            _anchor.click();
        }

        this.gaEventName = '/ga/navigation/tab';
        this.gaEventPayload = {
            title: this.url
        };
        this.gaEvent(this.gaEventName, this.gaEventPayload);
        this._changeLocation(this.url);
    }

    /**
     * Handles onclick location update
     *
     * @param {String} url The tap event.
     */
    _changeLocation(url) {
        if (!url || url.length === 0) {
            return;
        }

        if (url.startsWith('#')) {
            window.location.hash = url;

            this.dispatchEvent(
                new CustomEvent('tab-change', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        tabId: url.split('#')[1]
                    }
                })
            );
        } else {
            window.location = url;
        }
    }

    /**
     * Handles the keyDown event on the ea-tab element
     *
     * @param   {Event} event The event object
     */
    _onKeyDown(event) {
        const keys = ['Enter', ' '];

        if (keys.includes(event.key)) {
            event.preventDefault();
            this._changeLocation(this.url);
        }
    }

    /**
     * Ensures that, if there is an `<a>` in the local DOM, it has `-1` as
     * its `tabindex`.
     */
    connectedCallback() {
        super.connectedCallback();

        this.setAttribute('role', 'tab');
        this.addEventListener('click', this._onClick);
        this.addEventListener('keydown', this._onKeyDown);

        setTimeout(() => {
            this._anchor = this.querySelector('a');

            if (this._anchor) {
                this._anchor.setAttribute('tabindex', -1);
            }
        });
    }
}

customElements.define(EaTab.is, EaTab);
