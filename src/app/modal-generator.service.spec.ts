/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModalGeneratorService } from './modal-generator.service';

describe('ModalGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalGeneratorService]
    });
  });

  it('should ...', inject([ModalGeneratorService], (service: ModalGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
