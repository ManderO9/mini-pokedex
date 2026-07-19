import { TestBed } from '@angular/core/testing';

import { GraphQLService } from './graphql.service';

describe('GraphQLService', () => {
  let service: GraphQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
