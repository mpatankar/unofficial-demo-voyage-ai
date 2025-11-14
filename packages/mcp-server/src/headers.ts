// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from 'voyage';

export const parseAuthHeaders = (req: IncomingMessage): Partial<ClientOptions> => {
  const apiKey =
    Array.isArray(req.headers['authorization: bearer']) ?
      req.headers['authorization: bearer'][0]
    : req.headers['authorization: bearer'];
  return { apiKey };
};
