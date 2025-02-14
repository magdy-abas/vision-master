import { TestBed } from '@angular/core/testing';

import { ProdctsServiceService } from './prodcts-service.service';

describe('ProdctsServiceService', () => {
  let service: ProdctsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdctsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
