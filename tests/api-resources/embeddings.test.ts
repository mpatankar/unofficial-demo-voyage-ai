// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Voyage from 'voyage';

const client = new Voyage({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource embeddings', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.embeddings.create({ input: 'string', model: 'model' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.embeddings.create({
      input: 'string',
      model: 'model',
      encoding_format: 'base64',
      input_type: 'query',
      output_dimension: 0,
      output_dtype: 'float',
      truncation: true,
    });
  });
});
