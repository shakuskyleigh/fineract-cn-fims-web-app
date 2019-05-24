/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as roleActions from '../role.actions';
import {IdentityService} from '../../../services/identity/identity.service';
import {emptySearchResult} from '../../../common/store/search.reducer';
import {Role} from '../../../services/identity/domain/role.model';
import {catchError, map, takeUntil, debounceTime, switchMap, skip} from 'rxjs/operators';

const SYSTEM_ROLES: string[] = ['pharaoh', 'scheduler'];

@Injectable()
export class RoleSearchApiEffects {

  @Effect()
  search$: Observable<Action> = this.actions$
    .pipe(ofType(roleActions.SEARCH),
    debounceTime(300),
    switchMap(() => {
      const nextSearch$ = this.actions$.pipe(ofType(roleActions.SEARCH),(skip(1)));

      return this.identityService.listRoles().pipe(
        takeUntil(nextSearch$),
        map(this.excludeSystemRoles),
        map(roles => new roleActions.SearchCompleteAction({
          elements: roles,
          totalPages: 1,
          totalElements: roles.length
        })),
        catchError(() => of(new roleActions.SearchCompleteAction(emptySearchResult()))),);
    }),);

  private excludeSystemRoles(roles: Role[]): Role[] {
    return roles.filter(role => SYSTEM_ROLES.indexOf(role.identifier) === -1);
  }

  constructor(private actions$: Actions, private identityService: IdentityService) { }
}
