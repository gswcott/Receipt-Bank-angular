import { TestBed } from '@angular/core/testing';

import { ReceiptListService } from './receipt-list.service';

describe('ReceiptListService', () => {
  let service: ReceiptListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
