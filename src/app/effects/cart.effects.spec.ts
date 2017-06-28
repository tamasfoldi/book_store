import { TestBed, fakeAsync, inject } from '@angular/core/testing';
import { CartEffects } from './cart.effects';
import { Database } from '@ngrx/db';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { SCHEMA_NAME, CART_DB_NAME } from '../services/tokens';
import * as cart from '../actions/cart.actions';
import * as testData from '../../test-datas';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

describe('CartEffects', () => {
  let runner: EffectsRunner;
  let cartEffects: CartEffects;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
    ],
    providers: [
      CartEffects,
      {
        provide: Database,
        useValue: jasmine.createSpyObj('database', ['open', 'query', 'insert', 'executeWrite'])
      },

      { provide: SCHEMA_NAME, useValue: 'test_schema' },
      { provide: CART_DB_NAME, useValue: 'test_cart_db' }
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    cartEffects = TestBed.get(CartEffects);
  });

  describe('onLoad$', () => {
    it('should return a new LoadSuccessAction', fakeAsync(
      inject([Database], (db: Database) => {
        const expectedResult = new cart.LoadSuccessAction([testData.TEST_BOOK]);
        db.query = jasmine.createSpy('query').and.returnValue(of(testData.TEST_BOOK));
        runner.queue(new cart.LoadAction());

        let result = null;
        cartEffects.onLoad$
          .take(1)
          .subscribe(_result => result = _result);

        expect(result).toEqual(expectedResult);
      })));

    it('should return a new LoadFailAction', fakeAsync(
      inject([Database], (db: Database) => {
        const expectedResult = new cart.LoadFailAction('error');
        db.query = jasmine.createSpy('query').and.returnValue(_throw('error'));
        runner.queue(new cart.LoadAction());

        let result = null;
        cartEffects.onLoad$
          .take(1)
          .subscribe(_result => result = _result);

        expect(result).toEqual(expectedResult);
      })));
  });

  describe('onAdd$', () => {
    it('should return a new AddSuccessAction', fakeAsync(
      inject([Database], (db: Database) => {
        const expectedResult = new cart.AddSuccessAction(testData.TEST_BOOK);
        db.insert = jasmine.createSpy('insert').and.returnValue(of(testData.TEST_BOOK));
        runner.queue(new cart.AddAction(testData.TEST_BOOK));

        let result = null;
        cartEffects.onAdd$
          .take(1)
          .subscribe(_result => result = _result);

        expect(result).toEqual(expectedResult);
      })));

    it('should return a new AddFailAction', fakeAsync(
      inject([Database], (db: Database) => {
        const expectedResult = new cart.AddFailAction(testData.TEST_BOOK);
        db.insert = jasmine.createSpy('insert').and.returnValue(_throw('error'));
        runner.queue(new cart.AddAction(testData.TEST_BOOK));

        let result = null;
        cartEffects.onAdd$
          .take(1)
          .subscribe(_result => result = _result);

        expect(result).toEqual(expectedResult);
      })));
  });
});
