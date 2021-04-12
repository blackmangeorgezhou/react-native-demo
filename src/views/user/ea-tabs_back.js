/**
`ea-tabs` makes it easy to explore and switch between different views or
functional aspects of an app, or to browse categorized data sets.

Use `selected` property to get or set the selected tab.

Example:

```html
<ea-tabs selected="0">
    <ea-tab>Tab 1</ea-tab>
    <ea-tab>Tab 2</ea-tab>
    <ea-tab>Tab 3</ea-tab>
</ea-tabs>
```

A common usage for `ea-tabs` is to use it along with `iron-pages` to switch
between different views.

```html
<ea-tabs selected="{{ selected }}">
    <ea-tab>Tab 1</ea-tab>
    <ea-tab>Tab 2</ea-tab>
    <ea-tab>Tab 3</ea-tab>
</ea-tabs>

<iron-pages selected="{{ selected }}">
    <div>Page 1</div>
    <div>Page 2</div>
    <div>Page 3</div>
</iron-pages>
```

To use links in tabs, put an `<a>` element in `<ea-tab>`.

Example:

```html
<ea-tabs selected="{{ selected }}">
    <ea-tab>
        <a href="#link1">Tab 1</a>
    </ea-tab>
    <ea-tab>
        <a href="#link2">Tab 2</a>
    </ea-tab>
    <ea-tab>
        <a href="#link3">Tab 3</a>
    </ea-tab>
</ea-tabs>
```
@demo demo/index.html
*/

import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { IronMenubarBehavior } from '@polymer/iron-menu-behavior/iron-menubar-behavior.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import { addListener } from '@polymer/polymer/lib/utils/gestures.js';
import '@polymer/iron-menu-behavior/iron-menubar-behavior.js';
import '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import '@polymer/iron-pages/iron-pages.js';

import { EaElement } from '../ea-element/ea-element.js';
import '../ea-icons/ea-icons.js';

const $documentContainer = document.createElement('template');

/* eslint-disable max-len */
$documentContainer.innerHTML = `<dom-module id="ea-tabs">
    <template strip-whitespace="">
        <style include="ea-shared-styles-base-common"></style>
        <style>
            :host {
                background-color: #585858;
                border-radius: 3px;
                color: rgba(255, 255, 255, 0.5);
                display: flex;
                position: relative;
                user-select: none;
                width: 100%;

                --transition-duration: .4s;
                --tabs-mask-width: 24px;
            }

            @media only screen and (min-width: 768px) {
                :host {
                    --tabs-mask-width: 60px;
                }
            }

            :host::before {
                border-bottom: solid 2px;
                bottom: 0;
                content: "";
                left: 0;
                position: absolute;
                width: 100%;
                z-index: 11;
            }

            :host::before,
            #tabs ::slotted(ea-tab) {
                border-color: rgba(255, 255, 255, 0.1);
            }

            /* dark variant */
            :host([theme="dark"]) {
                background-color: #f1f1f1;
                color: var(--ea-dark-color);
            }

            /* dark variant */
            :host([theme="dark"])::before,
            :host([theme="dark"]) #tabs ::slotted(ea-tab) {
                border-color: rgba(0, 0, 0, 0.08);
            }

            /* custom variant */
            :host([theme="custom"]) {
                background-color: var(--ea-theme-tabs-background-color);
                color: var(--ea-theme-tabs-unselected-type);
            }

            :host([theme="custom"])::before,
            :host([theme="custom"]) #tabs ::slotted(ea-tab) {
                border-color: var(--ea-theme-tabs-accent-elements);
            }

            #stage {
                overflow: hidden;
                width: 100%;
            }

            @media (max-width: 767px) {
                :host([scrollable]) #stage {
                    margin: 0 auto;
                    max-width: calc((var(--ea-column-mobile-with-rail) * 6) + (var(--ea-gutter-mobile) * 5));
                    overflow: unset;
                }
            }

            .eapl-tabs__wrapper {
                box-sizing: content-box;
                height: 50px;
                overflow: hidden;
                width: 100%;
            }

            @media (min-width: 768px) {
                .eapl-tabs__wrapper {
                    display: flex;
                    height: 60px;
                }
            }

            .eapl-tabs__wrapper {
                display: flex;
                max-width: calc((var(--ea-column-mobile-with-rail) * 6) + (var(--ea-gutter-mobile) * 5));
                position: relative;
            }

            @media only screen and (max-width: 767px) {
                :host([scrollable]) .eapl-tabs__wrapper {
                    max-width: unset;
                }
            }

            @media only screen and (min-width: 768px) {
                .eapl-tabs__wrapper {
                    max-width: calc((var(--ea-column-tablet-portrait-with-rail) * 8) + (var(--ea-gutter-tablet-portrait) * 7) + 120px);
                }
                :host([alignment="center"]) .eapl-tabs__wrapper {
                    margin: auto;
                }
                :host([alignment="right"]) .eapl-tabs__wrapper {
                    left: 100%;
                    transform: translateX(-100%);
                }
            }

            @media only screen and (min-width: 1456px) {
                .eapl-tabs__wrapper {
                    max-width: calc((var(--ea-column-desktop-with-rail) * 12) + (var(--ea-gutter-desktop) * 11) + 120px);
                }
            }

            /**
             * Selected tab
             */
            #tabs ::slotted(ea-tab.iron-selected) {
                background: rgba(255, 255, 255, 0.08);
                color: rgba(255, 255, 255, 1);
            }

            #tabs ::slotted(ea-tab:focus) {
                background: rgba(255, 255, 255, 0.08);
                color: rgba(255, 255, 255, 1);
            }

            /* dark variant */
            :host([theme="dark"]) #tabs ::slotted(ea-tab.iron-selected) {
                background: rgba(0, 0, 0, 0.08);
                color: rgba(22, 22, 22, 0.8);
            }

            :host([theme="dark"]) #tabs ::slotted(ea-tab:focus) {
                background: rgba(0, 0, 0, 0.08);
                color: rgba(22, 22, 22, 0.8);
            }

            /* custom variant */
            :host([theme="custom"]) #tabs ::slotted(ea-tab.iron-selected) {
                background: var(--ea-theme-tabs-selected-state);
                color: var(--ea-theme-tabs-selected-type);
            }

            :host([theme="custom"]) #tabs ::slotted(ea-tab:focus) {
                background: var(--ea-theme-tabs-selected-state);
                color: var(--ea-theme-tabs-selected-type);
            }

            :host([indicate]) {
                border-radius: 0;
            }

            /* ea-tab hover state */
            #tabs ::slotted(ea-tab:hover) {
                background: rgba(255, 255, 255, 0.08);
                color: rgba(255, 255, 255, 1);
            }

            /* dark variant */
            :host([theme="dark"]) #tabs ::slotted(ea-tab:hover) {
                background: rgba(0, 0, 0, 0.08);
                color: rgba(22, 22, 22, 0.8);
            }

            /* custom variant */
            :host([theme="custom"]) #tabs ::slotted(ea-tab:hover) {
                background: var(--ea-theme-tabs-selected-state);
                color: var(--ea-theme-tabs-selected-type);
            }

            /* disabled tab */
            #tabs ::slotted(ea-tab[disabled]),
            #tabs ::slotted(ea-tab[disabled]:hover),
            :host([theme="custom"]) #tabs ::slotted(ea-tab[disabled]:hover) {
                background: inherit;
                color: rgba(var(--ea-dark-color-rgb), 0.4);
            }

            #tabs ::slotted(ea-tab)::after {
                border: 2px solid transparent;
                bottom: 0;
                content: "";
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
            }

            :host([theme="dark"]) #tabs ::slotted(ea-tab.ea-tab-focused)::after {
                border-color: rgb(var(--ea-dark-color-rgb));
            }

            :host([theme="light"]) #tabs ::slotted(ea-tab.ea-tab-focused)::after {
                border-color: rgb(var(--ea-light-color-rgb));
            }

            :host([theme="custom"]) #tabs ::slotted(ea-tab.ea-tab-focused)::after {
                border-color: var(--ea-theme-tabs-selected-type);
            }

            :host([theme="dark"]) #tabs ::slotted(ea-tab[disabled]),
            :host([theme="dark"]) #tabs ::slotted(ea-tab[disabled]:hover) {
                background: inherit;
                color: #c2c2c2;
            }

            :host([indicate]) #indicator {
                display: block;
            }

            :host([indicate]) #indicator[transitionable] {
                transition: all .3s ease;
            }

            #container {
                margin: 0 auto;
                position: relative;
            }

            #container {
                width: 100%;
            }

            #tabs {
                display: flex;
                flex-direction: column;
                position: relative;
                transition: transform var(--transition-duration) ease-in-out;
            }

            #tabs[no-animation] {
                transition: none;
            }

            :host([rtl]) #tabs {
                padding-left: 120px;
                padding-right: 0;
            }

            @media (min-width: 768px) {
                #tabs {
                    flex-direction: row;
                }
            }

            #tabs {
                display: flex;
                flex-direction: row;
                left: 0;
                min-width: 100%;
                position: absolute;
                top: 0;
            }

            :host([alignment="center"]) #tabs {
                justify-content: center;
            }
            :host([alignment="right"]) #tabs {
                justify-content: flex-end;
            }

            @media (max-width: 767px) {
                :host([alignment="center"]) #tabs {
                    justify-content: flex-start;
                }
                :host([alignment="right"]) #tabs {
                    justify-content: flex-start;
                }
            }

            :host([rtl]) #tabs {
                left: auto;
                right: 0;
            }

            #shadow {
                display: none;
            }

            :host([scrollable]) #shadow {
                display: block;
                height: 100%;
                left: 0;
                pointer-events: none;
                position: absolute;
                top: 0;
                width: 100%;
            }

            :host([rtl][scrollable]) #shadow {
                left: auto;
                right: 0;
            }

            .ea-tabs__arrow {
                display: none;
                pointer-events: all;
            }

            @media only screen and (min-width: 768px) {
                .ea-tabs__arrow {
                    pointer-events: all;
                }
            }

            .ea-tabs__arrow {
                background: transparent;
                border: 0;
                color: currentColor;
                cursor: pointer;
                height: 100%;
                outline: none;
                padding: 0;
                position: absolute;
                z-index: 10;
            }

            .ea-tabs__arrow iron-icon {
                display: inline-block;
                opacity: 1;
            }

            /* Left Arrow */
            .ea-tabs__arrow--left {
                left: 0;
                width: var(--tabs-mask-width);
            }

            :host([left-shadow][disabled-left-shadow]) .ea-tabs__arrow--left {
                color: rgba(255, 255, 255, 0.7);
                display: block;
            }

            /* dark variant */
            :host([theme="dark"][left-shadow][disabled-left-shadow]) .ea-tabs__arrow--left {
                color: rgba(22, 22, 22, 0.5);
            }

            /* custom variant */
            :host([theme="custom"][left-shadow][disabled-left-shadow]) .ea-tabs__arrow--left {
                color: var(--ea-theme-tabs-interface-color);
            }

            .ea-tabs__arrow--left iron-icon {
                transform: translateX(0) rotate(90deg);
            }

            @media only screen and (min-width: 768px) {
                .ea-tabs__arrow--left {
                    left: -1px;
                }

                :host([scrollable]) .ea-tabs__arrow--left iron-icon {
                    transform: translateX(-10px) rotate(90deg);
                }
            }

            :host([disabled-left-shadow]) #stage {
                -webkit-mask-image: linear-gradient(
                    90deg,
                    transparent calc(var(--tabs-mask-width) / 2),
                    #000 var(--tabs-mask-width)
                );
                mask-image: linear-gradient(
                    90deg,
                    transparent calc(var(--tabs-mask-width) / 2),
                    #000 var(--tabs-mask-width)
                );
            }

            :host([disabled-right-shadow]) #stage {
                -webkit-mask-image: linear-gradient(
                    90deg,
                    #000 calc(100% - var(--tabs-mask-width)),
                    transparent calc(100% - var(--tabs-mask-width) / 2)
                );
                mask-image: linear-gradient(
                    90deg,
                    #000 calc(100% - var(--tabs-mask-width)),
                    transparent calc(100% - var(--tabs-mask-width) / 2)
                );
            }

            :host([disabled-right-shadow][disabled-left-shadow]) #stage {
                -webkit-mask-image: linear-gradient(
                    90deg,
                    transparent calc(var(--tabs-mask-width) / 2),
                    #000 var(--tabs-mask-width),
                    #000 calc(100% - var(--tabs-mask-width)),
                    transparent calc(100% - var(--tabs-mask-width) / 2)
                );
                mask-image: linear-gradient(
                    90deg,
                    transparent calc(var(--tabs-mask-width) / 2),
                    #000 var(--tabs-mask-width),
                    #000 calc(100% - var(--tabs-mask-width)),
                    transparent calc(100% - var(--tabs-mask-width) / 2)
                );
            }

            /* Right Arrow */
            .ea-tabs__arrow--right {
                right: 0;
                width: var(--tabs-mask-width);
            }

            :host([right-shadow][disabled-right-shadow]) .ea-tabs__arrow--right {
                color: rgba(255, 255, 255, 0.7);
                display: block;
            }

            /* dark variant */
            :host([theme="dark"][right-shadow][disabled-right-shadow]) .ea-tabs__arrow--right {
                color: rgba(22, 22, 22, 0.5);
            }

            /* custom variant */
            :host([theme="custom"][right-shadow][disabled-right-shadow]) .ea-tabs__arrow--right {
                color: var(--ea-theme-tabs-interface-color);
            }

            .ea-tabs__arrow--right iron-icon {
                transform: translateX(0) rotate(-90deg);
            }

            @media only screen and (min-width: 768px) {
                .ea-tabs__arrow--right {
                    right: -1px;
                }

                .ea-tabs__arrow--right iron-icon {
                    transform: translateX(10px) rotate(-90deg);
                }
            }

        </style>

        <div class="eapl-tabs__wrapper">
            <div id="stage">
                <div id="container">
                    <div id="tabs">
                        <slot id="content"></slot>
                    </div>
                </div>
            </div>
            <div id="shadow">
                <button
                    on-click="_onPaddleTap"
                    direction="-1"
                    class="ea-tabs__arrow ea-tabs__arrow--left"
                    tabindex="-1"
                    aria-hidden="true"
                >
                    <iron-icon icon="ea-action-16:chevron"></iron-icon>
                </button>
                <button
                    on-click="_onPaddleTap"
                    direction="1"
                    class="ea-tabs__arrow ea-tabs__arrow--right"
                    tabindex="-1"
                    aria-hidden="true"
                >
                    <iron-icon icon="ea-action-16:chevron"></iron-icon>
                </button>
            </div>
        </div>
    </template>
</dom-module>`;
/* eslint-enable max-len */

document.head.appendChild($documentContainer.content);
class EaTabs extends mixinBehaviors([IronMenubarBehavior, IronResizableBehavior], EaElement) {
    /**
     * Is getter
     *
     * @returns {string} The component name
     */
    static get is() {
        return 'ea-tabs';
    }

    /**
     * Properties getter
     *
     * @returns {Object} The component's properties
     */
    static get properties() {
        return {
            alignment: {
                type: String,
                value: 'left',
                reflectToAttribute: true
            },

            /**
             * Whether or not to automatically select the first tab if there is no
             * initially selected one.
             */
            autoselect: {
                type: Boolean,
                value: false
            },

            /**
             * Whether or not to render the indicator.
             */
            indicate: {
                type: Boolean,
                value: false
            },

            /**
             * Whether or not to render a shadow on the left side of the tabs,
             * indicating that there's more tabs on that side.
             */
            leftShadow: {
                readOnly: true,
                reflectToAttribute: true,
                type: Boolean,
                value: false
            },

            /**
             * Disables the left chevron
             */
            disabledLeftShadow: {
                readOnly: true,
                reflectToAttribute: true,
                type: Boolean,
                value: false
            },

            /**
             * The number by which to increment the `scrollLeft` property
             */
            _step: {
                type: Number,
                value: 6
            },

            trackPositionX: {
                type: Number,
                value: 0
            },

            /**
             * How long to delay scrolling for the `on-down` event listener
             */
            _holdDelay: {
                type: Number,
                value: 1
            },

            /**
             * Top positioning value for element used by window scroll to bring content into view.
             */
            _offsetTop: {
                type: Number
            },

            /**
             * Whether or not the tabs are "ready". For context, when consumers
             * listen for this event, if `ready` is `true`, they are able to bind
             * events to the tab content elements to augment their behavior.
             *
             * For example, in BEAS, when the tabs are ready, modal link behaviors
             * need to be attached so that modals work for elements within the
             * tabs.
             */
            isReady: {
                notify: true,
                readOnly: true,
                reflectToAttribute: true,
                type: Boolean,
                value: false
            },

            /**
             * Whether or not to render a shadow on the right side of the tabs,
             * indicating that there's more tabs on that side.
             */
            rightShadow: {
                readOnly: true,
                reflectToAttribute: true,
                type: Boolean,
                value: false
            },

            /**
             * Disables the right chevron
             */
            disabledRightShadow: {
                readOnly: true,
                reflectToAttribute: true,
                type: Boolean,
                value: false
            },

            /**
             * Whether or not to allow horizontal scrolling when there is not
             * enough space.
             */
            scrollable: {
                readOnly: true,
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },

            /**
             * Only `<ea-tab>` elements are selectable.
             */
            selectable: {
                readOnly: true,
                type: String,
                value: 'ea-tab'
            },

            /**
             * Whether or not to scroll to bring content into view when user interacts with a tap.
             */
            autoScroll: {
                type: Boolean,
                value: false
            },

            /**
             * Offset value for scroll. Determines the top margin for auto-scrolling.
             */
            autoScrollTopOffset: {
                type: Number,
                value: 0
            },

            /**
             * A delay to debounce the scroll function.
             */
            _debounceDelay: {
                type: Number,
                value: 20
            }
        };
    }

    /**
     * Moves the tab by paddle click.
     *
     * @param {Object} event The event Object.
     */
    _onPaddleTap(event) {
        if (window.innerWidth < 768) {
            return;
        }

        const direction = parseInt(event.currentTarget.getAttribute('direction'), 10);

        this.debounce(
            'tabScrollDebounceJob',
            () => {
                const tabScrollDistance = this.$.container.clientWidth * 0.5;

                this._setScrollLeft(tabScrollDistance * direction, false);
            },
            this._debounceDelay
        );
    }

    /**
     * Handles what happens when a tab is selected.
     *
     * @returns {Element} The current instance.
     */
    _onIronSelect() {
        if (this.autoScroll) {
            this._scrollIntoView();
        }

        return this;
    }

    /**
     * Checks whether or not smooth scrolling is supported natively by the browser.
     *
     * @returns {Boolean}
     */
    _isSmoothScrollSupported() {
        return 'scrollBehavior' in document.documentElement.style;
    }

    /**
     * Computes scroll value based on element's position inside the document.
     */
    _updateOffsetTop() {
        this._offsetTop
            = this.getBoundingClientRect().top
            + window.pageYOffset
            - document.documentElement.clientTop
            - this.autoScrollTopOffset;
    }

    /**
     * Scrolls tab content into view.
     */
    _scrollIntoView() {
        if (!this.IsReady) {
            return;
        }

        if (this._isSmoothScrollSupported()) {
            window.scroll({
                top: this._offsetTop,
                behavior: 'smooth'
            });
        } else {
            window.scroll(0, this._offsetTop);
        }
    }

    /**
     * `iron-resize` callback.
     */
    _onIronResize() {
        this._reflowContent(null);
        this._updateOffsetTop();
    }

    /**
     * Handles what happens when `track` event is fired on the tabs container.
     * The `track` event is fired when the user drags his or her mouse or
     * finger across an element. The `detail` of the track event will contain a
     * `ddx` property. This property is the change in pixels on the x-axis
     * since the last track event.
     *
     * @see {@link https://goo.gl/H7wI0y}
     *
     * @param {Event} event The `track` event object.
     *
     * @returns {Element} The current instance.
     */
    _onTrack(event) {
        const { detail = {} } = event;

        if (this.scrollable && detail.state === 'track') {
            this._setScrollLeft(-1 * detail.ddx);
        }

        return this;
    }

    /**
     * Update the scroll position of the tabs container based on the currently
     * selected item. This method only does work if the currently selected item
     * is clipped by the container.
     *
     * @param {number} tabWidth The width of the selected tab.
     * @param {number} tabLeft The offset of the tab relative to `this`.
     *
     * @returns {Element} The current instance.
     */
    _scrollToSelected(tabWidth, tabLeft) {
        const left = tabLeft - this.scrollLeft;

        if (left < 0) {
            this._setScrollLeft(left);

            return this;
        }

        const right = left + tabWidth - this.offsetWidth;

        if (right > 0) {
            this._setScrollLeft(right);
        }

        return this;
    }

    /**
     * Updates the `scrollLeft` property on the tabs element based on the
     * provided delta.
     *
     * @param {number} dx The change in scroll position.
     * @param {Boolean} [noAnimation=true] If `true`, jumps to the new position.
     */
    _setScrollLeft(dx, noAnimation = true) {// eslint-disable-line complexity
        const rtlNegate = this.rtl ? 1 : -1;
        const trackWidth = this.$.tabs.offsetWidth;
        const stageWidth = this.$.stage.offsetWidth;

        if (trackWidth < stageWidth) {
            return;
        }

        const maxLeft = (trackWidth - stageWidth) * rtlNegate;
        const newTrackPosition = this._checkPosition(this.trackPositionX - dx, maxLeft);
        const canScrollLeft = newTrackPosition < 0 || (this.rtl && newTrackPosition < maxLeft);
        const canScrollRight = newTrackPosition > maxLeft || (this.rtl && newTrackPosition > 0);

        this._setDisabledRightShadow(canScrollRight);
        this._setDisabledLeftShadow(canScrollLeft);
        this._updateTrackPosition(canScrollLeft, canScrollRight, newTrackPosition, noAnimation);
    }

    /**
     * Checks the position of the tab.
     *
     * @param {Number} trackPositionX Track position.
     * @param {number} maxLeft Max left.
     *
     * @returns {Number} New track position.
     */
    _checkPosition(trackPositionX, maxLeft) {
        let newTrackPosition = trackPositionX;
        let maxTrackClientX = 0;
        let minTrackClientX = maxLeft;

        if (this.rtl) {
            maxTrackClientX = maxLeft;
            minTrackClientX = 0;
        }

        if (newTrackPosition < minTrackClientX) {
            newTrackPosition = minTrackClientX;
        } else if (newTrackPosition > maxTrackClientX) {
            newTrackPosition = maxTrackClientX;
        }

        return newTrackPosition;
    }

    /**
     * Update the track position as within the left and right bounds.
     *
     * @param {Boolean} canScrollLeft Can scroll left
     * @param {Boolean} canScrollRight Can scroll right
     * @param {number} newTrackPosition The new track position we are trying to update to.
     * @param {Boolean} [noAnimation=false] If `true`, jumps to the new position.
     */
    _updateTrackPosition(canScrollLeft, canScrollRight, newTrackPosition, noAnimation) {
        if (canScrollLeft || canScrollRight) {
            this.trackPositionX = newTrackPosition;
            this.toggleAttribute('no-animation', noAnimation, this.$.tabs);
            this.transform(`translateX(${this.trackPositionX}px)`, this.$.tabs);
        }
    }

    /**
     * Toggle the scrollable.
     *
     * @param {Boolean} scrollable Whether or not the tabs are scrollable.
     */
    _toggleScrolls(scrollable) {
        this._setRightShadow(scrollable);
        this._setLeftShadow(scrollable);
        this._setScrollable(scrollable);
    }

    /**
     * Set the currently selected tab by location hash or special case when hash is empty
     *
     * @todo Use `iron-location` if the NDS ever includes it.
     *
     * @see {@link https://git.io/vP1kG}
     *
     * @returns {Element} The current instance.
     */
    _setSelectedByHash() {// eslint-disable-line complexity
        const defaultLocale = '/en-us';
        const urlWithLocale = this.items[0].url.startsWith(defaultLocale);
        let location;

        /** en-us will be removed in window.location by default */
        if (urlWithLocale) {
            location = window.decodeURIComponent(window.location.origin + defaultLocale + window.location.pathname);
        } else {
            location = window.decodeURIComponent(window.location.origin + window.location.pathname);
        }

        const selfHash = this.items.filter(item => item.url.startsWith('#')).length;
        const hash = window.decodeURIComponent(window.location.hash.slice(1));
        let selected = this.items
            .filter(tab => !tab.hasAttribute('disabled'))
            .filter(tab => !tab.classList.contains('iron-selected'));

        if (hash === '' || !selfHash) {
            selected = selected.filter(tab => location.split(tab.getAttribute('url'))[1] === '').pop();

            if (selected) {
                this.selected = this.indexOf(selected);
            }
        } else if (selfHash) {
            selected = selected.filter(tab => tab.getAttribute('url') === `#${hash}`).pop();

            if (hash && selected) {
                this.selected = this.indexOf(selected);
            }
        }

        return this;
    }

    /**
     * Find the first tab that isn't disabled and set it as the selected item.
     */
    _autoSelectItem() {
        if (!this.items.length) {
            return;
        }

        this.selected = this.items.findIndex(tab => !tab.hasAttribute('disabled'));

        this._updateSelected();
    }

    /**
     * Handles the onKeyUp event on the ea-tab element
     *
     * @param   {Event} event The event object
     */
    _onKeyUp(event) {
        const navigationKeys = ['ArrowRight', 'ArrowLeft', 'Tab'];

        if (navigationKeys.includes(event.key)) {
            event.target.classList.add('ea-tab-focused');
        }
    }

    /**
     * Handles the blur event on the ea-tab element
     */
    _handleBlur() {
        const lastFocusedTab = this.querySelector('ea-tab.ea-tab-focused');

        if (lastFocusedTab) {
            lastFocusedTab.classList.remove('ea-tab-focused');
        }
    }

    /**
     * Set up tab
     */
    _setUp() {// eslint-disable-line complexity
        if (this._hasInit || document.visibilityState !== 'visible') {
            return;
        }

        this._setSelectedByHash();

        if (this.autoselect && !this.selectedItem) {
            this._autoSelectItem();
        }

        this._reflowContent(null, true);

        addListener(this.$.tabs, 'track', this._onTrack.bind(this));

        this.items.forEach(tab => {
            tab.addEventListener('keyup', this._onKeyUp.bind(this));
            tab.addEventListener('blur', this._handleBlur.bind(this));
        });

        this._setIsReady(true);
        this._hasInit = true;
    }

    /**
     * Updates the layout of tab when the window resizes.
     *
     * @param {object} event The event object
     * @param {boolean} force Force to first render
     */
    _reflowContent(event, force = false) {
        if (this._viewportWidth === window.innerWidth && !force) {
            return;
        }

        const trackWidth = this.$.tabs.offsetWidth;
        const stageWidth = this.$.stage.offsetWidth;

        this._viewportWidth = window.innerWidth;

        this._toggleScrolls(trackWidth > stageWidth);
        this._setScrollLeft(0);
    }

    /**
     * Lifecycle callback - constructor
     */
    constructor() {
        super();

        this._setSelectedByHash = this._setSelectedByHash.bind(this);
        this._setUp = this._setUp.bind(this);
    }

    /**
     * Makes sure the currently selected tab matches the hash of the current
     * location.
     */
    connectedCallback() {
        super.connectedCallback();

        this.setAttribute('role', 'tablist');

        window.addEventListener('hashchange', this._setSelectedByHash);

        this.addEventListener('iron-select', this._onIronSelect);
        this.addEventListener('iron-resize', this._onIronResize);

        setTimeout(() => {
            this._setUp();
        });

        document.addEventListener('visibilitychange', this._setUp);
    }

    /**
     * Cleans up event listeners.
     */
    disconnectedCallback() {
        super.disconnectedCallback();

        window.removeEventListener('hashchange', this._setSelectedByHash);
        document.removeEventListener('visibilitychange', this._setUp);

        if (this._unbindMedia) {
            this._unbindMedia();
        }

        this._setIsReady(false);
    }
}

customElements.define(EaTabs.is, EaTabs);
