// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'voyage-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'voyage-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Voyage from 'unofficial-demo-voyage-ai';

export const metadata: Metadata = {
  resource: '$client',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/embeddings',
  operationId: 'embeddings-api',
};

export const tool: Tool = {
  name: 'embed_client',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nVoyage text embedding endpoint receives as input a string (or a list of strings) and other arguments such as the preferred model name, and returns a response containing a list of embeddings.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/embed_response',\n  $defs: {\n    embed_response: {\n      type: 'object',\n      properties: {\n        data: {\n          type: 'array',\n          description: 'An array of embedding objects.',\n          items: {\n            type: 'object',\n            properties: {\n              embedding: {\n                type: 'array',\n                description: 'Each embedding is a vector represented as an array of float numbers when `output_dtype` is set to `float` and as an array of integers for all other values of `output_dtype` (`int8`, `uint8`, `binary`, and `ubinary`). The length of this vector varies depending on the specific model, `output_dimension`, and `output_dtype`.\\n',\n                items: {\n                  type: 'number'\n                }\n              },\n              index: {\n                type: 'integer',\n                description: 'An integer representing the index of the embedding within the list of embeddings.\\n'\n              },\n              object: {\n                type: 'string',\n                description: 'The object type, which is always \"embedding\".'\n              }\n            }\n          }\n        },\n        model: {\n          type: 'string',\n          description: 'Name of the model.'\n        },\n        object: {\n          type: 'string',\n          description: 'The object type, which is always \"list\".'\n        },\n        usage: {\n          type: 'object',\n          properties: {\n            total_tokens: {\n              type: 'integer',\n              description: 'The total number of tokens used for computing the embeddings.'\n            }\n          }\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      input: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        ],
        description:
          'A single text string, or a list of texts as a list of strings, such as `["I like cats", "I also like dogs"]`. Currently, we have two constraints on the list: <ul>  <li> The maximum length of the list is 128. </li>  <li> The total number of tokens in the list is at most 1M for `voyage-3-lite`; 320K for `voyage-3` and `voyage-2`; and 120K for `voyage-3-large`, `voyage-code-3`, `voyage-large-2-instruct`, `voyage-finance-2`, `voyage-multilingual-2`, `voyage-law-2`, and `voyage-large-2`. </li> <ul>\n',
      },
      model: {
        type: 'string',
        description:
          'Name of the model. Recommended options: `voyage-3-large`, `voyage-3`, `voyage-3-lite`, `voyage-code-3`, `voyage-finance-2`, `voyage-law-2`.\n',
      },
      encoding_format: {
        type: 'string',
        description:
          'Format in which the embeddings are encoded. Defaults to `null`. Other options: `base64`. <ul> <li> If `null`, each embedding is an array of float numbers when `output_dtype` is set to `float` and as an array of integers for all other values of `output_dtype` (`int8`, `uint8`, `binary`, and `ubinary`). <li> If `base64`, the embeddings are represented as a <a href="https://docs.python.org/3/library/base64.html" target="_blank">Base64-encoded</a> NumPy array of: </li>\n  <ul>\n    <li> Floating-point numbers (<a href="https://numpy.org/doc/2.1/user/basics.types.html#numerical-data-types" target="_blank">numpy.float32</a>) for <code>output_dtype</code> set to <code>float</code>. </li>\n    <li> Signed integers (<a href="https://numpy.org/doc/2.1/user/basics.types.html#numerical-data-types" target="_blank">numpy.int8</a>) for <code>output_dtype</code> set to <code>int8</code> or <code>binary</code>. </li>\n    <li> Unsigned integers (<a href="https://numpy.org/doc/2.1/user/basics.types.html#numerical-data-types" target="_blank">numpy.uint8</a>) for <code>output_dtype</code> set to <code>uint8</code> or <code>ubinary</code>. </li>\n  </ul> \n</ul>',
        enum: ['base64'],
      },
      input_type: {
        type: 'string',
        description:
          'Type of the input text. Defaults to `null`. Other options: `query`, `document`. <ul> <li> When `input_type` is `null`, the embedding model directly converts the inputs (`texts`) into numerical vectors. For retrieval/search purposes, where a "query" is used to search for relevant information among a collection of data referred to as "documents," we recommend specifying whether your inputs (`texts`) are intended as queries or documents by setting `input_type` to `query` or `document`, respectively. In these cases, Voyage automatically prepends a prompt to your `inputs` before vectorizing them, creating vectors more tailored for retrieval/search tasks. Embeddings generated with and without the `input_type` argument are compatible. </li> <li> For transparency, the following prompts are prepended to your input. </li>\n  <ul>\n    <li> For <code>query</code>, the prompt is <i>"Represent the query for retrieving supporting documents: ".</i> </li>\n    <li> For <code>document</code>, the prompt is <i>"Represent the document for retrieval: ".</i> </li>\n  </ul> \n<ul> <ul>',
        enum: ['query', 'document'],
      },
      output_dimension: {
        type: 'integer',
        description:
          'The number of dimensions for resulting output embeddings. Defaults to `null`. <ul> <li> Most models only support a single default dimension, used when `output_dimension` is set to `null` (see output embedding dimensions <a href="https://docs.voyageai.com/docs/embeddings" target="_blank">here</a>). </li> <li> `voyage-3-large` and `voyage-code-3` support the following `output_dimension` values: 2048, 1024 (default), 512, and 256. </li> </ul>\n',
      },
      output_dtype: {
        type: 'string',
        description:
          'The data type for the embeddings to be returned. Defaults to `float`. Other options: `int8`, `uint8`, `binary`, `ubinary`. `float` is supported for all models. `int8`, `uint8`, `binary`, and `ubinary` are supported by `voyage-3-large` and `voyage-code-3`. Please see our <a href="https://docs.voyageai.com/docs/flexible-dimensions-and-quantization#quantization" target="_blank">guide</a> for more details about output data types. <ul> <li> `float`: Each returned embedding is a list of 32-bit (4-byte) <a href="https://en.wikipedia.org/wiki/Single-precision_floating-point_format" target="_blank">single-precision floating-point</a> numbers. This is the default and provides the highest precision / retrieval accuracy. </li> <li> `int8` and `uint8`: Each returned embedding is a list of 8-bit (1-byte) integers ranging from -128 to 127 and 0 to 255, respectively. </li> <li> `binary` and `ubinary`: Each returned embedding is a list of 8-bit integers that represent bit-packed, quantized single-bit embedding values: `int8` for `binary` and `uint8` for `ubinary`. The length of the returned list of integers is 1/8 of `output_dimension` (which is the actual dimension of the embedding). The `binary` type uses the offset binary method. Please refer to our guide for details on <a href="https://docs.voyageai.com/docs/flexible-dimensions-and-quantization#offset-binary" target="_blank">offset binary</a> and <a href="https://docs.voyageai.com/docs/flexible-dimensions-and-quantization#quantization" target="_blank">binary embeddings</a>.  </ul>',
        enum: ['float', 'int8', 'uint8', 'binary', 'ubinary'],
      },
      truncation: {
        type: 'boolean',
        description:
          'Whether to truncate the input texts to fit within the context length. Defaults to `true`. <ul>  <li> If `true`, an over-length input texts will be truncated to fit within the context length, before vectorized by the embedding model. </li>  <li> If `false`, an error will be raised if any given text exceeds the context length. </li>  </ul>\n',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['input', 'model'],
  },
  annotations: {},
};

export const handler = async (client: Voyage, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.embed(body)));
  } catch (error) {
    if (error instanceof Voyage.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
