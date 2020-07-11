import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
    toggle = false;
    chunks;
    acctData = [
        {
            acctNum: 'AAA - 1234',
            user: 'Alice'
        },
        {
            acctNum: 'AAA - 5231',
            user: 'Bob'
        },
        {
            acctNum: 'AAA - 9921',
            user: 'Alice'
        },
        {
            acctNum: 'AAA - 8191',
            user: 'Alice'
        }
    ];

    balance = {
        'AAA - 1234': 4593.22,
        'AAA - 9921': 0,
        'AAA - 5231': 232142.5,
        'AAA - 8191': 4344
    };

    constructor() {
        this.acctData.forEach((e) => {
            e['balance'] = this.balance[e.acctNum];
        });
    }

    ngOnInit() {
        this.chunks = this.acctData.splice(0, 3);
        this.sortByBalance();
    }

    loadChunks(size) {
        const chunk = this.acctData.splice(0, size);
        if (!chunk.length) {
            alert('No more date left');
        }
        this.chunks.push(...chunk);
    }

    getAccountNumbers(user = '', sortArgs = '', sortDirectionArgs = '') {
        let accounts = [];
        if (user) {
            accounts = this.acctData.filter((acc, i) => acc.user === user);
            return accounts;
        }
        // return sortArgs ? this._getNumbers(this._sortBy, sortArgs) : this._getNumbers(this._sortDirection, sortDirectionArgs);
    }

    sortByBalance() {
        this.toggle = !this.toggle;
        this.chunks.sort((a, b) => {
            a = this.balance[a.acctNum];
            b = this.balance[b.acctNum];
            return this.toggle ? a - b : b - a;
        });
    }

    // _getNumbers(fn, args) {
    //     return fn(args).map((e) => {
    //         e.balance = this.balance[e.acctNum];
    //         return e;
    //     });
    // }

    // _sortBy(accountNumber = '', byBalance = '') {
    //     let sortedArray;
    //     // accountNumber = acctData.filter(e => e.acctNum === accountNumber);

    //     if (accountNumber === 'acctNum') {
    //         sortedArray = this.acctData.sort((a, b) => a.acctNum.split('-')[1] > b.acctNum.split('-')[1]);
    //     }

    //     if (byBalance === 'balance') {
    //         sortedArray = this.acctData.sort((a, b) => this.balance[a.acctNum] > this.balance[b.acctNum]);
    //     }

    //     return sortedArray || [];
    // }

    // _sortDirection(direction) {
    //     return this.acctData.sort((a, b) =>
    //         direction === 'desc' ? this.balance[a.acctNum] < this.balance[b.acctNum] : this.balance[a.acctNum] > this.balance[b.acctNum]
    //     );
    // }
}
