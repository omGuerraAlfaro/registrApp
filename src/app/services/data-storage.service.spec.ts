import { TestBed } from '@angular/core/testing';
import { DataStorageService } from './data-storage.service';
import {IonicStorageModule} from '@ionic/storage';

describe('DataStorageService', () => {
  let service: DataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()]
    });
    service = TestBed.inject(DataStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
