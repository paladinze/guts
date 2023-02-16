import { BehaviorSubject, Subject } from 'rxjs';
import { map, distinctUntilKeyChanged, scan } from 'rxjs/operators';

export class ObservableStore {
  private _store: BehaviorSubject<any>;
  private _stateUpdate = new Subject();

  constructor(initialState: any) {
    this._store = new BehaviorSubject(initialState);
    this._stateUpdate.pipe(
      scan((current, updated: any) => {
        return { ...current, ...updated }
      }, initialState)
    ).subscribe(this._store);
  }

  /*
   * Select a slice of state based on key.
   */
  selectState(key: string) {
    return this._store.pipe(
      distinctUntilKeyChanged(key),
      map(state => state[key])
    );
  }

  /*
   * Update state with new object to merge.
   */
  updateState(newState: object) {
    this._stateUpdate.next(newState);
  }

  /*
   * Subscribe to any store state changes.
   */
  stateChanges() {
    return this._store.asObservable();
  }
}
