import React from 'react'
import {sortByDate, sortByItemCount, sortOrders} from './sortOrders';

describe('sortByItemCount function', () => {
    it('orders are null', () => {
        const result = sortByItemCount(null, null);
        expect(result).toEqual(0);
    });

    it('same items count', () => {
        const order1 = {
            items: ['item1', 'item2'],
        };

        const order2 = {
            items: ['1', '2'],
        };

        const result = sortByItemCount(order1, order2);

        expect(result).toBe(0);
    });

    test.each([
        [['1', '2', '3'], ['1', '2'], 1],
        [['1', '2'], ['1', '2', '3'], -1]
    ])('different items count', (item1, item2, result) => {
        const order1 = {items: item1};
        const order2 = {items: item2};
        expect(sortByItemCount(order1, order2)).toBe(result)
    })

    test('one order is null', () => {
        const order1 = {items: null};
        const order2 = {items: [1, 2]}

        expect(sortByItemCount(order1, order2)).toBe(0)
    });

    test('orders items are empty', () => {
        const order1 = {items: []}
        const order2 = {items: []}

        expect(sortByItemCount(order1, order2)).toBe(0);
    });

    test('orders are not objects', () => {
        const order1 = 4
        const order2 = 4

        expect(sortByItemCount(order1, order2)).toBe(0);
    });

    test.each([
        [[1], [], 1],
        [[], [2], -1]
    ])('one of orders items is empty', (items1, items2, result) => {
        const order1 = {items: items1};
        const order2 = {items: items2};
        expect(sortByItemCount(order1, order2)).toBe(result);
    })


});

describe('sortByDate function', () => {
    test('orders are null', () => {
        expect(sortByDate(null, null)).toBe(0)
    })

    test('dates are null', () => {
        const order1 = {date: null}
        const order2 = {date: null}
        expect(sortByDate(order1, order2)).toBe(0)
    })

    test('orders are not objects', () => {
        const order1 = 4
        const order2 = 4

        expect(sortByDate(order1, order2)).toBe(0);
    });

    test.each([
        [null, null, 0],
        [new Date('1995-12-17T03:24:00'), null, 0],
        [null, new Date('1995-12-17T03:24:00'), 0]
    ])('one or both of dates are null', (date1, date2, result) => {
        const order1 = {date: date1}
        const order2 = {date: date2}
        expect(sortByDate(order1, order2)).toBe(result)
    })

    test('equal dates', () => {
        const order1 = {date: new Date('1995-12-17T03:24:00')}
        const order2 = {date: new Date('1995-12-17T03:24:00')}
        expect(sortByDate(order1, order2)).toBe(0)
    })

    test.each([
        [new Date('1995-12-17T03:24:00'), new Date('1994-12-17T03:24:00'), -1],
        [new Date('1994-12-17T03:24:00'), new Date('1995-12-17T03:24:00'), 1],
    ])('different dates', (date1, date2, result) => {
        const order1 = {date: date1}
        const order2 = {date: date2}
        expect(sortByDate(order1, order2)).toBe(result)
    })
})
