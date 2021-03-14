jest.mock('../utils/getDate');

/* eslint-disable import/first */
import React from 'react'
import {getDate} from "../utils/getDate";
import {shallow, configure} from 'enzyme';
import Order from "./Order";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Order.js', () => {
    beforeEach(() => {
        getDate.mockReturnValue(`11 марта, чт, 2021 год`);
    });

    afterEach(() => {
        jest.resetModules()
    })

    it('render', () => {
        const order = {shop: 'shop', date: 2131212, items: ["some data"]}
        const wrapper = shallow(<Order
            order={order}
        />);
        expect(wrapper).toMatchSnapshot();
    });

    it('render without order', () => {
        const emptyWrapper = shallow(<Order/>);
        expect(emptyWrapper.isEmptyRender()).toBeTruthy();
    });

    it('render with null order', () => {
        const order = {shop: null, date: null, items: null}
        const nullWrapper = shallow(<Order
            order={order}
        />);
        expect(nullWrapper.isEmptyRender()).toBeTruthy();
    });

    it('render with null items', () => {
        const order = {shop: 'shop', date: 21312, items: null}
        const wrapper = shallow(<Order
            order={order}
        />);
        expect(wrapper).toMatchSnapshot();
    });
})

