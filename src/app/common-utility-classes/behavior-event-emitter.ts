import { EventEmitter } from '@angular/core';

import { ObjectUnsubscribedError } from 'rxjs';

//This event emitter stores latest emitted value so it can be used to modify the next emitting value
//Named so because it's relates to EventEmitter pretty much the way Subject relates to BehaviorSubject
export class BehaviorEventEmitter<T> extends EventEmitter<T> {

    private _value: T;

    constructor() {
        super();
    }

    get value(): T {
        return this.getValue();
    }

    getValue(): T {
        if (this.hasError) {
            throw this.thrownError;
        } else if (this.closed) {
            throw new ObjectUnsubscribedError();
        } else {
            return this._value;
        }
    }

    emit(value?: T) {
        super.emit(this._value = value);
    }
}