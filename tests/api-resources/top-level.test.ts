// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Voyage from 'unofficial-demo-voyage-ai';

const client = new Voyage({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('top level methods', () => {
  // Prism tests are disabled
  test.skip('embed: only required params', async () => {
    const responsePromise = client.embed({ input: 'string', model: 'model' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('embed: required and optional params', async () => {
    const response = await client.embed({
      input: 'string',
      model: 'model',
      encoding_format: 'base64',
      input_type: 'query',
      output_dimension: 0,
      output_dtype: 'float',
      truncation: true,
    });
  });

  // Prism tests are disabled
  test.skip('embedMultimodal: only required params', async () => {
    const responsePromise = client.embedMultimodal({ inputs: [{}], model: 'model' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('embedMultimodal: required and optional params', async () => {
    const response = await client.embedMultimodal({
      inputs: [{}],
      model: 'model',
      input_type: 'query',
      output_encoding: 'base64',
      truncation: true,
    });
  });

  // Prism tests are disabled
  test.skip('rerank: only required params', async () => {
    const responsePromise = client.rerank({ documents: ['string'], model: 'model', query: 'query' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('rerank: required and optional params', async () => {
    const response = await client.rerank({
      documents: ['string'],
      model: 'model',
      query: 'query',
      return_documents: true,
      top_k: 0,
      truncation: true,
    });
  });
});
