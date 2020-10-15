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
export class AccountingPermittableGroupIds {
  public static readonly ACCOUNT_MANAGEMENT = 'accounting__v1__account';
  public static readonly JOURNAL_MANAGEMENT = 'accounting__v1__journal';
  public static readonly LEDGER_MANAGEMENT = 'accounting__v1__ledger';
  public static readonly TRANSACTION_TYPES = 'accounting__v1__tx_types';
  public static readonly THOTH_INCOME_STMT = 'accounting__v1__income_stmt';
  public static readonly THOTH_FIN_CONDITION = 'accounting__v1__fin_condition';
}
