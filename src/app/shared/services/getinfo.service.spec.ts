import { GetinfoService } from './getinfo.service';

describe('GetinfoService', () => {
  let service: GetinfoService;

  beforeEach(() => {
    service = new GetinfoService()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test emitValue and getValue from throwing a string', () => {
    const emittedValue = 'nick';
    // const obsValue$ = new Observable<string>();

    service.emitValue(emittedValue);
    const obsValue$ = service.getValue(); 
    obsValue$.subscribe((res:string) => {
      // expect(res).toBeDefined()
      expect(res).toBe(emittedValue)
    })

  });


});
