jest.mock('../utils/getDate');

/* eslint-disable import/first */
import React from 'react'
import {getDate} from "../utils/getDate";
import {shallow, configure} from 'enzyme';
import Order from "./Order";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Order.js', () => {
    getDate.mockReturnValue(`11 марта, чт, 2021 год`);

    it('render', () => {
        const order = {shop: 'shop', date: 2131212, items: ["some data"]}
        const wrapper = shallow(<Order
            order={order}
        />);
        expect(wrapper).toMatchSnapshot();
        expect(getDate).toHaveBeenCalledTimes(1);
    });

    it('render with empty order', () => {
        const emptyWrapper = shallow(<Order/>);
        expect(emptyWrapper).toMatchSnapshot();
    });

    it('render with null order', () => {
        const order = {shop: null, date: null}
        const nullWraper = shallow(<Order
            order={order}
        />);
        expect(nullWraper).toMatchSnapshot();
    });
})

