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
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import * as groupActions from '../group.actions';
import { GroupService } from '../../../services/group/group.service';
import { emptySearchResult } from '../../../common/store/search.reducer';

@Injectable()
export class GroupSearchApiEffects {

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(groupActions.SEARCH)
    .debounceTime(300)
    .map((action: groupActions.SearchAction) => action.payload)
    .switchMap(fetchRequest => {
      const nextSearch$ = this.actions$.ofType(groupActions.SEARCH).skip(1);

      return this.groupService.fetchGroups(fetchRequest)
        .takeUntil(nextSearch$)
        .map(groupPage => new groupActions.SearchCompleteAction({
          elements: groupPage.groups,
          totalElements: groupPage.totalElements,
          totalPages: groupPage.totalPages
        }))
        .catch(() => of(new groupActions.SearchCompleteAction(emptySearchResult())));
    });

  constructor(private actions$: Actions, private groupService: GroupService) { }

}
