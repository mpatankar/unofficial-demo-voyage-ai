// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Voyage } from '../client';

export abstract class APIResource {
  protected _client: Voyage;

  constructor(client: Voyage) {
    this._client = client;
  }
}
